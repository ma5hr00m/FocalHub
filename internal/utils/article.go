package utils

import (
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"time"

	"gopkg.in/yaml.v2"
)

type ArticlePost struct {
	Title             string `json:"title"`
	Date              string `json:"date"`
	Content           string `json:"content"`
	WordCount         int    `json:"word_count"`
	EstimatedReadTime int    `json:"estimated_read_time"` // 以分钟为单位
}

type ArticlePostSummary struct {
	Path  string `json:"path"`
	Title string `json:"title"`
	Date  string `json:"date"`
}

type YearlyArticlePosts struct {
	Year  string               `json:"year"`
	Posts []ArticlePostSummary `json:"posts"`
}

// ListArticlePosts 列出指定目录下的所有博客文章并按日期排序
func ListArticlePosts(docsDir string) (map[string][]ArticlePostSummary, error) {
	files, err := os.ReadDir(docsDir)
	if err != nil {
		return nil, err
	}

	var summaries []ArticlePostSummary
	for _, file := range files {
		if filepath.Ext(file.Name()) == ".md" {
			post, err := ReadMarkdownFile(filepath.Join(docsDir, file.Name()))
			if err == nil {
				summaries = append(summaries, ArticlePostSummary{
					Path:  "/article/" + file.Name()[:len(file.Name())-3],
					Title: post.Title,
					Date:  post.Date,
				})
			}
		}
	}

	// 按照日期排序
	sort.Slice(summaries, func(i, j int) bool {
		dateI, _ := time.Parse("2006-01-02", summaries[i].Date)
		dateJ, _ := time.Parse("2006-01-02", summaries[j].Date)
		return dateI.After(dateJ)
	})

	// 根据年份分组
	groupedByYear := make(map[string][]ArticlePostSummary)
	for _, summary := range summaries {
		year := summary.Date[:4] // 获取年份
		groupedByYear[year] = append(groupedByYear[year], summary)
	}

	// 对每个年份的列表进行排序
	for year, posts := range groupedByYear {
		sort.Slice(posts, func(i, j int) bool {
			dateI, _ := time.Parse("2006-01-02", posts[i].Date)
			dateJ, _ := time.Parse("2006-01-02", posts[j].Date)
			return dateI.After(dateJ)
		})
		groupedByYear[year] = posts
	}

	return groupedByYear, nil
}

// ListRecentArticles 列出最近的博客文章
func ListRecentArticles(docsDir string, limit int) ([]ArticlePostSummary, error) {
	files, err := os.ReadDir(docsDir)
	if err != nil {
		return nil, err
	}

	var summaries []ArticlePostSummary
	for _, file := range files {
		if filepath.Ext(file.Name()) == ".md" {
			post, err := ReadMarkdownFile(filepath.Join(docsDir, file.Name()))
			if err == nil {
				summaries = append(summaries, ArticlePostSummary{
					Path:  "/article/" + file.Name()[:len(file.Name())-3],
					Title: post.Title,
					Date:  post.Date,
				})
			}
		}
	}

	// 按照日期排序
	sort.Slice(summaries, func(i, j int) bool {
		dateI, _ := time.Parse("2006-01-02", summaries[i].Date)
		dateJ, _ := time.Parse("2006-01-02", summaries[j].Date)
		return dateI.After(dateJ)
	})

	// 限制返回的文章数量
	if limit > len(summaries) {
		limit = len(summaries)
	}
	return summaries[:limit], nil
}

// ReadMarkdownFile 读取 Markdown 文件并提取 front matter 和内容
func ReadMarkdownFile(filename string) (ArticlePost, error) {
	data, err := os.ReadFile(filename) // 使用 os.ReadFile 替代 ioutil.ReadFile
	if err != nil {
		return ArticlePost{}, err
	}

	re := regexp.MustCompile(`(?s)---(.*?)---(.*)`)
	matches := re.FindStringSubmatch(string(data))
	if len(matches) < 3 {
		return ArticlePost{}, nil
	}

	var post ArticlePost
	err = yaml.Unmarshal([]byte(matches[1]), &post)
	if err != nil {
		return ArticlePost{}, err
	}
	post.Content = matches[2]

	// 清理内容，去除换行符
	cleanedContent := strings.ReplaceAll(post.Content, "\n", " ")
	cleanedContent = strings.ReplaceAll(cleanedContent, "\r", "")
	cleanedContent = strings.TrimSpace(cleanedContent)

	// 使用正则表达式计算中文和英文的字数
	chineseWordCount := len(regexp.MustCompile(`[\p{Han}]`).FindAllString(cleanedContent, -1))
	englishWordCount := len(regexp.MustCompile(`\b\w+\b`).FindAllString(cleanedContent, -1))

	// 总字数为中文和英文字数之和
	post.WordCount = chineseWordCount + englishWordCount

	// 计算预计阅读时间（以分钟为单位）
	estimatedReadTime := post.WordCount / 80 // 每分钟可阅读 80 字
	if post.WordCount%80 != 0 {
		estimatedReadTime++ // 如果有剩余字数，增加 1 分钟
	}
	post.EstimatedReadTime = estimatedReadTime

	return post, nil
}
