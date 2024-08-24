package routes

import (
	"fmt"
	"focalhub/internal/config"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Run() {
	r := gin.Default()

	// server
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, world!",
		})
	})

	port := config.Conf.App.Port
	err := r.Run(fmt.Sprintf(":%d", port))
	if err != nil {
		panic(fmt.Errorf("fatal error when starting server: %s", err))
	}
}
