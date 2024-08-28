package main

import (
	"embed"
	"fmt"
	"focalhub/internal/controllers/ping"
	"focalhub/internal/controllers/v1/article"
	"focalhub/internal/controllers/v1/github"
	aliyunoss "focalhub/internal/controllers/v1/oss"
	"focalhub/internal/utils"
	"log"
	"mime"
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

	// 读取环境变量
	envVars, err := utils.LoadEnvVars()
	if err != nil {
		log.Fatal(err)
	}

	// 初始化 OSS 客户端
	if err := utils.InitializeOSSClient(envVars["ACCESS_KEY_ID"], envVars["ACCESS_KEY_SECRET"], envVars["ENDPOINT"], envVars["BUCKET_NAME"]); err != nil {
		log.Fatalf("Failed to initialize OSS client: %v", err)
	}

	// 初始化 GitHub 客户端
	githubClient, err := utils.InitializeGitHubClient(envVars["OAUTH_GITHUB_TOKEN"])
	if err != nil {
		log.Fatalf("Failed to initialize GitHub client: %v", err)
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
	v1.GET("/articles", article.GetArticles)
	v1.GET("/article/:slug", article.GetArticle)
	v1.GET("/oss/tree", aliyunoss.GetFileTree)
	v1.GET("/oss/filelist", aliyunoss.GetFileList)
	v1.GET("/repo/:owner/:repo/last-updated", github.GetLastUpdated(githubClient))

	// 处理静态文件服务
	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path
		s := strings.Split(path, ".")
		prefix := "client/dist"
		if data, err := FS.ReadFile(prefix + path); err != nil {
			if data, err = FS.ReadFile(prefix + "/index.html"); err != nil {
				c.JSON(404, gin.H{"err": err})
			} else {
				c.Data(200, mime.TypeByExtension(".html"), data)
			}
		} else {
			c.Data(200, mime.TypeByExtension(fmt.Sprintf(".%s", s[len(s)-1])), data)
		}
	})

	// 默认端口
	if envVars["APP_PORT"] == "" {
		envVars["APP_PORT"] = "8080"
	}

	err = r.Run(fmt.Sprintf(":%s", envVars["APP_PORT"]))
	if err != nil {
		panic(fmt.Errorf("start server failed: %s", err))
	}
}
