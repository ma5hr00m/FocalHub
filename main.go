package main

import (
	"embed"
	"fmt"
	"focalhub/internal/config"
	"mime"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

//go:embed client/dist
var FS embed.FS

func main() {
	r := gin.Default()

	// Handle static file serving
	// When API does not exist, return static files
	r.NoRoute(func(c *gin.Context) {
		// Get request path
		path := c.Request.URL.Path
		// Split path to get file extension
		s := strings.Split(path, ".")
		prefix := "client/dist"
		// Prefix path
		// Read file content
		if data, err := FS.ReadFile(prefix + path); err != nil {
			// If file does not exist, return homepage index.html
			if data, err = FS.ReadFile(prefix + "/index.html"); err != nil {
				c.JSON(404, gin.H{
					"err": err,
				})
			} else {
				c.Data(200, mime.TypeByExtension(".html"), data)
			}
		} else {
			// If file exists, set the correct mime type based on the file extension and return file content
			c.Data(200, mime.TypeByExtension(fmt.Sprintf(".%s", s[len(s)-1])), data)
		}
	})

	// Server endpoint
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, world!",
		})
	})

	// Start the server
	port := config.Conf.App.Port
	err := r.Run(fmt.Sprintf(":%d", port))
	if err != nil {
		panic(fmt.Errorf("fatal error when starting server: %s", err))
	}
}
