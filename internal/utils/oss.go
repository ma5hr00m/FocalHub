package utils

import (
	"fmt"
	"strings"

	"github.com/aliyun/aliyun-oss-go-sdk/oss"
)

var (
	client *oss.Client
	bucket *oss.Bucket
)

// InitializeOSSClient 初始化 OSS 客户端，使用提供的凭证和桶信息。
func InitializeOSSClient(accessKeyId, accessKeySecret, endpoint, bucketName string) error {
	var err error
	client, err = oss.New(endpoint, accessKeyId, accessKeySecret)
	if err != nil {
		return fmt.Errorf("创建 OSS 客户端失败: %v", err)
	}

	bucket, err = client.Bucket(bucketName)
	if err != nil {
		return fmt.Errorf("获取桶失败: %v", err)
	}

	return nil
}

// GetFileTree 从指定前缀获取文件树结构。
// 根据提供的格式参数，可以返回平面或嵌套的文件列表。
func GetFileTree(prefix string, format string) (interface{}, error) {
	// 获取文件列表
	lsRes, err := bucket.ListObjects(oss.Prefix(prefix))
	if err != nil {
		return nil, fmt.Errorf("列出对象失败: %v", err)
	}

	if format == "nested" {
		return buildNestedFileTree(lsRes.Objects, prefix), nil
	}

	// 默认返回文件列表
	return buildFileList(lsRes.Objects), nil
}

// buildFileList 从提供的 OSS 对象属性构建文件信息列表。
// 包括名称、大小、最后修改时间、签名 URL、公共 URL 和类型等详细信息。
func buildFileList(objects []oss.ObjectProperties) []map[string]interface{} {
	fileList := make([]map[string]interface{}, 0)
	for _, object := range objects {
		signedURL, err := bucket.SignURL(object.Key, oss.HTTPGet, 3600)
		if err != nil {
			continue // 处理签名 URL 失败的情况
		}

		publicURL := fmt.Sprintf("https://%s.%s/%s", bucket.BucketName, bucket.Client.Config.Endpoint, object.Key)

		fileType := "file"
		if strings.HasSuffix(object.Key, "/") {
			fileType = "directory"
		}

		fileInfo := map[string]interface{}{
			"name":         object.Key,
			"size":         object.Size,
			"lastModified": object.LastModified,
			"signedURL":    signedURL,
			"publicURL":    publicURL,
			"type":         fileType, // 添加文件类型
		}
		fileList = append(fileList, fileInfo)
	}
	return fileList
}

// buildNestedFileTree 从提供的 OSS 对象属性构建嵌套的文件树结构。
// 根据文件路径将文件和目录进行层次化组织。
func buildNestedFileTree(objects []oss.ObjectProperties, prefix string) map[string]interface{} {
	nestedTree := make(map[string]interface{})

	for _, object := range objects {
		// 计算相对路径
		relativePath := strings.TrimPrefix(object.Key, prefix)
		parts := strings.Split(strings.Trim(relativePath, "/"), "/")

		current := nestedTree
		for i, part := range parts {
			if i == len(parts)-1 {
				// 最后一个部分是文件
				signedURL, err := bucket.SignURL(object.Key, oss.HTTPGet, 3600)
				if err != nil {
					continue
				}

				publicURL := fmt.Sprintf("https://%s.%s/%s", bucket.BucketName, bucket.Client.Config.Endpoint, object.Key)

				fileType := "file"
				if strings.HasSuffix(object.Key, "/") {
					fileType = "directory"
				}

				current[part] = map[string]interface{}{
					"size":         object.Size,
					"lastModified": object.LastModified,
					"signedURL":    signedURL,
					"publicURL":    publicURL,
					"type":         fileType,
				}
			} else {
				// 中间部分是目录
				if _, exists := current[part]; !exists {
					current[part] = make(map[string]interface{})
				}
				current = current[part].(map[string]interface{})
			}
		}
	}

	return nestedTree
}

// GetFileList 从指定前缀获取文件和目录列表。
// 仅包括直接位于指定前缀下的项目，不包括嵌套项目。
func GetFileList(prefix string) ([]map[string]interface{}, error) {
	// 获取文件和目录列表，使用 Delimiter 来确保只获取当前目录下的内容
	lsRes, err := bucket.ListObjects(oss.Prefix(prefix), oss.Delimiter("/"))
	if err != nil {
		return nil, fmt.Errorf("列出对象失败: %v", err)
	}

	// 只获取当前目录下的文件和目录
	fileList := make([]map[string]interface{}, 0)

	// 处理文件
	for _, object := range lsRes.Objects {
		if strings.HasPrefix(object.Key, prefix) && object.Key != prefix {
			signedURL, err := bucket.SignURL(object.Key, oss.HTTPGet, 3600)
			if err != nil {
				continue
			}

			publicURL := fmt.Sprintf("https://%s.%s/%s", bucket.BucketName, bucket.Client.Config.Endpoint, object.Key)

			fileInfo := map[string]interface{}{
				"name":         object.Key,
				"size":         object.Size,
				"lastModified": object.LastModified,
				"signedURL":    signedURL,
				"publicURL":    publicURL,
				"type":         "file", // 文件类型
			}
			fileList = append(fileList, fileInfo)
		}
	}

	// 处理目录
	for _, prefixObject := range lsRes.CommonPrefixes {
		dirInfo := map[string]interface{}{
			"name":         prefixObject,
			"size":         0,
			"lastModified": "",
			"signedURL":    "",
			"publicURL":    "",
			"type":         "directory",
		}
		fileList = append(fileList, dirInfo)
	}

	return fileList, nil
}
