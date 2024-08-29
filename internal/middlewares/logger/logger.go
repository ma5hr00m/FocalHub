package logger

import (
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

var (
	// 记录器
	logger *log.Logger
	once   sync.Once
)

// initLogger 初始化日志记录器
func initLogger() {
	// 确保日志目录存在
	if err := os.MkdirAll("logs", os.ModePerm); err != nil {
		log.Fatalf("Failed to create logs directory: %v", err)
	}

	// 获取当前时间戳
	timestamp := time.Now().Unix()
	logFileName := fmt.Sprintf("logs/focalhub-%d.log", timestamp)

	// 创建日志文件
	logFile, err := os.OpenFile(logFileName, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("Failed to open log file: %v", err)
	}

	logger = log.New(logFile, "", 0)
}

// LoggerMiddleware 是一个日志记录中间件
func LoggerMiddleware(svcName string) gin.HandlerFunc {
	once.Do(initLogger) // 确保只初始化一次

	return func(c *gin.Context) {
		start := time.Now()

		// 处理请求
		c.Next()

		// 记录日志
		duration := time.Since(start)
		status := c.Writer.Status()
		method := c.Request.Method
		path := c.Request.URL.Path
		pid := os.Getpid()
		// traceID := c.Request.Header.Get("X-Trace-ID") // 假设从请求头中获取
		// spanID := c.Request.Header.Get("X-Span-ID")   // 假设从请求头中获取
		// userID := c.Request.Header.Get("X-User-ID")   // 假设从请求头中获取
		// bizID := c.Request.Header.Get("X-Biz-ID")     // 假设从请求头中获取
		threadName := fmt.Sprintf("%d", pid) // 使用 PID 作为线程名称
		className := "main.LoggerMiddleware" // 日志记录器名称

		// 日志级别
		// 暂时记为 INFO，后续再调整
		logLevel := "INFO"

		// 格式化日志消息
		logMessage := fmt.Sprintf("%s|%d|%s|[%s]|%s|%s : %s",
			time.Now().Format("2006-01-02 15:04:05.000"),
			pid,
			logLevel,
			svcName,
			// traceID,
			// spanID,
			// userID,
			// bizID,
			threadName,
			className,
			fmt.Sprintf("%s %s %d %s", method, path, status, duration),
		)

		// 写入日志
		logger.Println(logMessage)
	}
}
