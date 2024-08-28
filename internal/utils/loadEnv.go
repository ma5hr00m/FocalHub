package utils

import (
	"fmt"
	"os"
	"strings"
)

// requiredVars 必需的环境变量列表
var requiredVars = []string{
	"ACCESS_KEY_ID",
	"ACCESS_KEY_SECRET",
	"ENDPOINT",
	"BUCKET_NAME",
	"OAUTH_GITHUB_TOKEN",
	"APP_PORT",
}

// LoadEnvVars 加载环境变量并以 map 的形式返回。
// 它还检查缺失的变量，并返回包含详细信息的错误。
func LoadEnvVars() (map[string]string, error) {
	envVars := make(map[string]string)
	var missingVars []string

	for _, v := range requiredVars {
		value := os.Getenv(v)
		if value == "" {
			missingVars = append(missingVars, v)
		}
		envVars[v] = value
	}

	if len(missingVars) > 0 {
		return nil, fmt.Errorf("缺少环境变量: %s", strings.Join(missingVars, ", "))
	}

	return envVars, nil
}
