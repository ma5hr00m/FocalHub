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

func InitializeOSSClient(accessKeyId, accessKeySecret, endpoint, bucketName string) error {
	var err error
	client, err = oss.New(endpoint, accessKeyId, accessKeySecret)
	if err != nil {
		return fmt.Errorf("failed to create OSS client: %v", err)
	}

	bucket, err = client.Bucket(bucketName)
	if err != nil {
		return fmt.Errorf("failed to get bucket: %v", err)
	}

	return nil
}

func GetFileTree(prefix string, format string) (interface{}, error) {
	// 获取文件列表
	lsRes, err := bucket.ListObjects(oss.Prefix(prefix))
	if err != nil {
		return nil, fmt.Errorf("failed to list objects: %v", err)
	}

	if format == "nested" {
		return buildNestedFileTree(lsRes.Objects, prefix), nil
	}

	// 默认返回文件列表
	return buildFileList(lsRes.Objects), nil
}

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
					continue // 处理签名 URL 失败的情况
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
