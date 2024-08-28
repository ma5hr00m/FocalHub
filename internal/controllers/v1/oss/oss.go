package aliyunoss

import (
	"focalhub/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetFileTree 获取文件树
// 根据请求中的前缀和格式参数，返回指定前缀下的文件树结构。
// 如果前缀为空或格式不正确，将返回相应的错误信息。
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

// GetFileList 获取文件列表
// 根据请求中的前缀参数，返回指定前缀下的文件列表。
// 如果前缀为空，将返回相应的错误信息。
func GetFileList(c *gin.Context) {
	prefix := c.Query("prefix")
	if prefix == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix is required"})
		return
	}

	fileList, err := utils.GetFileList(prefix)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, fileList)
}
