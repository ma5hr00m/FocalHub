package main

import (
	"embed"
	"fmt"
	"focalhub/internal/config"
	"focalhub/internal/controllers/blog"
	"mime"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

//go:embed client/dist
var FS embed.FS

func main() {
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

	// 处理静态文件服务
	// 当 API 不存在时，返回静态文件
	r.NoRoute(func(c *gin.Context) {
		// 获取请求路径
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
			// 如果文件存在，根据文件扩展名设置正确的 MIME 类型并返回文件内容
			c.Data(200, mime.TypeByExtension(fmt.Sprintf(".%s", s[len(s)-1])), data)
		}
	})

	// 服务器端点
	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong!",
		})
	})

	r.GET("/api/blog/:slug", func(c *gin.Context) {
		slug := c.Param("slug")
		filename := filepath.Join("docs", slug+".md")

		post, err := blog.ReadMarkdownFile(filename)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, post)
	})

	// 启动服务器
	port := config.Conf.App.Port
	err := r.Run(fmt.Sprintf(":%d", port))
	if err != nil {
		panic(fmt.Errorf("start server failed: %s", err))
	}
}
