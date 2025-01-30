package main

import (
	"bytes"
	"testing"

	"github.com/spf13/cobra"
)

func TestListMembersCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createListCommand(rettiwt)

	// Test list members command with valid arguments
	output := executeCommand(cmd, "members", "12345", "10", "cursor")
	expected := "Members: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test list members command with missing arguments
	output = executeCommand(cmd, "members", "12345")
	expected = "Members: "
	if output != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func TestListTweetsCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createListCommand(rettiwt)

	// Test list tweets command with valid arguments
	output := executeCommand(cmd, "tweets", "12345", "10", "cursor")
	expected := "Tweets: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test list tweets command with missing arguments
	output = executeCommand(cmd, "tweets", "12345")
	expected = "Tweets: "
	if output != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}
}

func executeCommand(cmd *cobra.Command, args ...string) string {
	buf := new(bytes.Buffer)
	cmd.SetOut(buf)
	cmd.SetErr(buf)
	cmd.SetArgs(args)
	err := cmd.Execute()
	if err != nil {
		return err.Error()
	}
	return buf.String()
}
