package utils

import (
	"context"

	"github.com/google/go-github/v39/github"
	"golang.org/x/oauth2"
)

func InitializeGitHubClient(oauthToken string) (*github.Client, error) {
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: oauthToken},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	return client, nil
}
