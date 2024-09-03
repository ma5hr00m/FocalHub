---
title: "Example Article Post"
date: "2023-10-01"
---

This is the content of the article post.

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

var counter int

func main() {
    r := gin.Default()

    r.GET("/counter", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"counter": counter}) // 返回当前计数器值
    })

    r.POST("/counter/increment", func(c *gin.Context) {
        counter++ // 增加计数器值
        c.JSON(http.StatusOK, gin.H{"counter": counter}) // 返回更新后的计数器值
    })

    r.POST("/counter/reset", func(c *gin.Context) {
        counter = 0 // 重置计数器值
        c.JSON(http.StatusOK, gin.H{"counter": counter}) // 返回重置后的计数器值
    })

    r.Run(":8080") // 启动服务器，监听8080端口
}
```