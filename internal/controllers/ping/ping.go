package ping

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetPing 处理 ping 请求
func GetPing(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong!",
	})
}
