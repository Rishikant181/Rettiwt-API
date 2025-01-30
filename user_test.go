package main

import (
	"bytes"
	"testing"

	"github.com/spf13/cobra"
)

func TestUserBookmarksCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user bookmarks command with valid arguments
	output := executeCommand(cmd, "bookmarks", "10", "cursor")
	expected := "Bookmarks: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user bookmarks command with missing arguments
	output = executeCommand(cmd, "bookmarks")
	expected = "Bookmarks: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserDetailsCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user details command with valid arguments
	output := executeCommand(cmd, "details", "12345")
	expected := "Details: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user details command with missing arguments
	output = executeCommand(cmd, "details")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestUserFollowCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user follow command with valid arguments
	output := executeCommand(cmd, "follow", "12345")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user follow command with missing arguments
	output = executeCommand(cmd, "follow")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestUserFollowedCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user followed command with valid arguments
	output := executeCommand(cmd, "followed", "cursor")
	expected := "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user followed command with missing arguments
	output = executeCommand(cmd, "followed")
	expected = "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserFollowersCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user followers command with valid arguments
	output := executeCommand(cmd, "followers", "12345", "10", "cursor")
	expected := "Users: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user followers command with missing arguments
	output = executeCommand(cmd, "followers", "12345")
	expected = "Users: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserFollowingCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user following command with valid arguments
	output := executeCommand(cmd, "following", "12345", "10", "cursor")
	expected := "Users: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user following command with missing arguments
	output = executeCommand(cmd, "following", "12345")
	expected = "Users: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserHighlightsCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user highlights command with valid arguments
	output := executeCommand(cmd, "highlights", "12345", "10", "cursor")
	expected := "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user highlights command with missing arguments
	output = executeCommand(cmd, "highlights", "12345")
	expected = "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserLikesCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user likes command with valid arguments
	output := executeCommand(cmd, "likes", "10", "cursor")
	expected := "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user likes command with missing arguments
	output = executeCommand(cmd, "likes")
	expected = "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserMediaCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user media command with valid arguments
	output := executeCommand(cmd, "media", "12345", "10", "cursor")
	expected := "Media: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user media command with missing arguments
	output = executeCommand(cmd, "media", "12345")
	expected = "Media: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserRecommendedCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user recommended command with valid arguments
	output := executeCommand(cmd, "recommended", "cursor")
	expected := "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user recommended command with missing arguments
	output = executeCommand(cmd, "recommended")
	expected = "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserRepliesCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user replies command with valid arguments
	output := executeCommand(cmd, "replies", "12345", "10", "cursor")
	expected := "Replies: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user replies command with missing arguments
	output = executeCommand(cmd, "replies", "12345")
	expected = "Replies: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserSubscriptionsCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user subscriptions command with valid arguments
	output := executeCommand(cmd, "subscriptions", "12345", "10", "cursor")
	expected := "Users: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user subscriptions command with missing arguments
	output = executeCommand(cmd, "subscriptions", "12345")
	expected = "Users: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserTimelineCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user timeline command with valid arguments
	output := executeCommand(cmd, "timeline", "12345", "10", "cursor")
	expected := "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user timeline command with missing arguments
	output = executeCommand(cmd, "timeline", "12345")
	expected = "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestUserUnfollowCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createUserCommand(rettiwt)

	// Test user unfollow command with valid arguments
	output := executeCommand(cmd, "unfollow", "12345")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test user unfollow command with missing arguments
	output = executeCommand(cmd, "unfollow")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func executeCommand(cmd *cobra.Command, args ...string) string {
	buf := new(bytes.Buffer)
	cmd.SetOut(buf)
	cmd.SetErr(buf)
	cmd.SetArgs(args)
	cmd.Execute()
	return buf.String()
}
