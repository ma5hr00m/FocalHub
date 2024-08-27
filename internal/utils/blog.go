package utils

import (
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"time"

	"gopkg.in/yaml.v2"
)

type BlogPost struct {
	Title   string `yaml:"title"`
	Date    string `yaml:"date"`
	Content string `yaml:"content"`
}

type BlogPostSummary struct {
	Path  string `json:"path"`
	Title string `json:"title"`
	Date  string `json:"date"`
}

// ReadMarkdownFile 读取 Markdown 文件并提取 front matter 和内容
func ReadMarkdownFile(filename string) (BlogPost, error) {
	data, err := os.ReadFile(filename) // 使用 os.ReadFile 替代 ioutil.ReadFile
	if err != nil {
		return BlogPost{}, err
	}

	re := regexp.MustCompile(`(?s)---(.*?)---(.*)`)
	matches := re.FindStringSubmatch(string(data))
	if len(matches) < 3 {
		return BlogPost{}, nil
	}

	var post BlogPost
	err = yaml.Unmarshal([]byte(matches[1]), &post)
	if err != nil {
		return BlogPost{}, err
	}
	post.Content = matches[2]

	return post, nil
}

// ListBlogPosts 列出指定目录下的所有博客文章并按日期排序
func ListBlogPosts(docsDir string) ([]BlogPostSummary, error) {
	files, err := os.ReadDir(docsDir) // 使用 os.ReadDir 替代 ioutil.ReadDir
	if err != nil {
		return nil, err
	}

	var summaries []BlogPostSummary
	for _, file := range files {
		if filepath.Ext(file.Name()) == ".md" {
			post, err := ReadMarkdownFile(filepath.Join(docsDir, file.Name()))
			if err == nil {
				summaries = append(summaries, BlogPostSummary{
					Path:  "/blog/" + file.Name()[:len(file.Name())-3], // 去掉 .md 后缀
					Title: post.Title,
					Date:  post.Date,
				})
			}
		}
	}

	// 按照日期排序
	sort.Slice(summaries, func(i, j int) bool {
		dateI, _ := time.Parse("2006-01-02", summaries[i].Date) // 解析日期字符串
		dateJ, _ := time.Parse("2006-01-02", summaries[j].Date) // 解析日期字符串
		return dateI.Before(dateJ)                              // 比较日期
	})

	return summaries, nil
}
