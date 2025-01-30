package main

import (
	"bytes"
	"testing"

	"github.com/spf13/cobra"
)

func TestTweetDetailsCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet details command with valid arguments
	output := executeCommand(cmd, "details", "12345")
	expected := "Details: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet details command with missing arguments
	output = executeCommand(cmd, "details")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestTweetLikeCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet like command with valid arguments
	output := executeCommand(cmd, "like", "12345")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet like command with missing arguments
	output = executeCommand(cmd, "like")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestTweetListCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet list command with valid arguments
	output := executeCommand(cmd, "list", "12345", "10", "cursor")
	expected := "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet list command with missing arguments
	output = executeCommand(cmd, "list", "12345")
	expected = "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestTweetPostCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet post command with valid arguments
	output := executeCommand(cmd, "post", "Hello World!")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet post command with missing arguments
	output = executeCommand(cmd, "post")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestTweetRetweetCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet retweet command with valid arguments
	output := executeCommand(cmd, "retweet", "12345")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet retweet command with missing arguments
	output = executeCommand(cmd, "retweet")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestTweetRetweetersCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet retweeters command with valid arguments
	output := executeCommand(cmd, "retweeters", "12345", "10", "cursor")
	expected := "Retweeters: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet retweeters command with missing arguments
	output = executeCommand(cmd, "retweeters", "12345")
	expected = "Retweeters: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestTweetScheduleCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet schedule command with valid arguments
	output := executeCommand(cmd, "schedule", "Hello World!", "2024-08-19 23:59:00")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet schedule command with missing arguments
	output = executeCommand(cmd, "schedule", "Hello World!")
	expected = "Error: accepts 2 arg(s), received 1"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestTweetSearchCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet search command with valid arguments
	output := executeCommand(cmd, "search", "10", "cursor")
	expected := "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet search command with missing arguments
	output = executeCommand(cmd, "search")
	expected = "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestTweetUnlikeCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet unlike command with valid arguments
	output := executeCommand(cmd, "unlike", "12345")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet unlike command with missing arguments
	output = executeCommand(cmd, "unlike")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestTweetUnpostCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet unpost command with valid arguments
	output := executeCommand(cmd, "unpost", "12345")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet unpost command with missing arguments
	output = executeCommand(cmd, "unpost")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestTweetUnretweetCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet unretweet command with valid arguments
	output := executeCommand(cmd, "unretweet", "12345")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet unretweet command with missing arguments
	output = executeCommand(cmd, "unretweet")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestTweetUnscheduleCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet unschedule command with valid arguments
	output := executeCommand(cmd, "unschedule", "12345")
	expected := "Result: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet unschedule command with missing arguments
	output = executeCommand(cmd, "unschedule")
	expected = "Error: accepts 1 arg(s), received 0"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestTweetUploadCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createTweetCommand(rettiwt)

	// Test tweet upload command with valid arguments
	output := executeCommand(cmd, "upload", "path/to/media")
	expected := "ID: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test tweet upload command with missing arguments
	output = executeCommand(cmd, "upload")
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
