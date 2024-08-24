package config

import (
	"fmt"
	"os"

	"github.com/pelletier/go-toml/v2"
)

type Config struct {
	App struct {
		Port int `toml:"port"`
	}

	Secret struct {
		SessionSecret string `toml:"session_secret"`
	}

	Mysql struct {
		Host     string `toml:"host"`
		Port     int    `toml:"port"`
		Username string `toml:"username"`
		Password string `toml:"password"`
		Database string `toml:"database"`
	}

	OSS struct {
		AccessKey       string `toml:"access_key"`
		AccessKeySecret string `toml:"access_key_secret"`
		Area            string `toml:"area"`
		Bucket          string `toml:"bucket"`
	}
}

var configFile = "config.toml"
var Conf Config

func init() {
	data, err := os.ReadFile(configFile)
	if err != nil {
		panic(fmt.Errorf("failed to open config file: %w", err))
	}

	if err := toml.Unmarshal(data, &Conf); err != nil {
		panic(fmt.Errorf("failed to parse config file: %w", err))
	}
}
