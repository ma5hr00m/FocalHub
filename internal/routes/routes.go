package routes

import (
	"fmt"
	"focalhub/client"
	"focalhub/internal/config"
	"io/fs"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Run() {
	r := gin.Default()

	//client
	fe, err := fs.Sub(client.FS, "dist")
	if err != nil {
		log.Fatalf("Failed to sub path `dist`: %v", err)
	}
	r.StaticFS("/c", http.FS(fe))

	// server
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, world!",
		})
	})

	port := config.Conf.App.Port
	err = r.Run(fmt.Sprintf(":%d", port))
	if err != nil {
		panic(fmt.Errorf("fatal error when starting server: %s", err))
	}
}
