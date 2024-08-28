package aliyunoss

import (
	"focalhub/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetFileTree(c *gin.Context) {
	prefix := c.Query("prefix")
	if prefix == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix is required"})
		return
	}

	format := c.Query("format")
	if format != "list" && format != "nested" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "format must be 'list' or 'nested'"})
		return
	}

	fileTree, err := utils.GetFileTree(prefix, format)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, fileTree)
}
