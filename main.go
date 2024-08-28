package main

import (
	"embed"
	"fmt"
	"focalhub/internal/config"
	"focalhub/internal/controllers/ping"
	"focalhub/internal/controllers/v1/blog"
	aliyunoss "focalhub/internal/controllers/v1/oss"
	"focalhub/internal/utils"
	"log"
	"mime"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

//go:embed client/dist
var FS embed.FS

func main() {
	// 加载 .env 文件
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using default environment variables")
	}

	// 从环境变量中读取 OSS 配置信息
	accessKeyId := os.Getenv("ACCESS_KEY_ID")
	accessKeySecret := os.Getenv("ACCESS_KEY_SECRET")
	endpoint := os.Getenv("ENDPOINT")
	bucketName := os.Getenv("BUCKET_NAME")

	// 检查环境变量是否设置
	if accessKeyId == "" || accessKeySecret == "" || endpoint == "" || bucketName == "" {
		log.Fatal("One or more environment variables are not set")
	}

	if err := utils.InitializeOSSClient(accessKeyId, accessKeySecret, endpoint, bucketName); err != nil {
		log.Fatalf("Failed to initialize OSS client: %v", err)
	}

	r := gin.Default()

	// CORS 中间件
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * 3600,
	}))

	// 服务器端点
	api := r.Group("/api")
	api.GET("/ping", ping.GetPing)

	v1 := api.Group("/v1")
	v1.GET("/blogs", blog.GetBlogs)
	v1.GET("/blog/:slug", blog.GetBlog)
	v1.GET("/oss/tree", aliyunoss.GetFileTree)

	// 处理静态文件服务
	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path
		s := strings.Split(path, ".")
		prefix := "client/dist"
		if data, err := FS.ReadFile(prefix + path); err != nil {
			if data, err = FS.ReadFile(prefix + "/index.html"); err != nil {
				c.JSON(404, gin.H{
					"err": err,
				})
			} else {
				c.Data(200, mime.TypeByExtension(".html"), data)
			}
		} else {
			c.Data(200, mime.TypeByExtension(fmt.Sprintf(".%s", s[len(s)-1])), data)
		}
	})

	// 启动服务器
	port := config.Conf.App.Port
	err := r.Run(fmt.Sprintf(":%d", port))
	if err != nil {
		panic(fmt.Errorf("start server failed: %s", err))
	}
}
