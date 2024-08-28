package article

import (
	"net/http"
	"path/filepath"

	"focalhub/internal/utils"

	"github.com/gin-gonic/gin"
)

// GetArticles 处理获取博客列表请求
func GetArticles(c *gin.Context) {
	summaries, err := utils.ListArticlePosts("docs")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, summaries)
}

// GetArticle 处理获取单个博客文章请求
func GetArticle(c *gin.Context) {
	slug := c.Param("slug")
	filename := filepath.Join("docs", slug+".md")

	post, err := utils.ReadMarkdownFile(filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, post)
}
