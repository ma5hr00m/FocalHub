package routes

import (
	"fmt"
	"focalhub/internal/client"
	"focalhub/internal/config"
	"io/fs"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Run() {
	r := gin.Default()

	// client fs embed
	fe, err := fs.Sub(client.FS, "dist")
	if err != nil {
		log.Fatal("Failed to sub path `dist`: %v", err)
	}
	r.StaticFS("/m", http.FS(fe))

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
