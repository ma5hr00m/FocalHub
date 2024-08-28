package github

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/go-github/v39/github"
)

func GetLastUpdated(client *github.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		owner := c.Param("owner")
		repo := c.Param("repo")

		// 获取仓库信息
		ctx := context.Background()
		repository, _, err := client.Repositories.Get(ctx, owner, repo)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Repository not found"})
			return
		}

		// 获取最后更新时间并转换为中国标准时间
		lastUpdatedUTC := repository.UpdatedAt
		cst, err := time.LoadLocation("Asia/Shanghai")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load timezone"})
			return
		}
		lastUpdatedCST := lastUpdatedUTC.In(cst)

		// 返回最后更新时间
		c.JSON(http.StatusOK, gin.H{"last_updated": lastUpdatedCST.Format("2006-01-02 15:04:05")})
	}
}
