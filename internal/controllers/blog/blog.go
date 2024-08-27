package blog

import (
	"io/ioutil"
	"regexp"

	"gopkg.in/yaml.v2"
)

type BlogPost struct {
	Title   string `yaml:"title"`
	Date    string `yaml:"date"`
	Content string `yaml:"content"`
}

func ReadMarkdownFile(filename string) (BlogPost, error) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return BlogPost{}, err
	}

	// 使用正则表达式提取 front-matter
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
