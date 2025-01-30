package main

import (
	"bytes"
	"testing"

	"github.com/spf13/cobra"
)

func TestLoginCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createAuthCommand(rettiwt)

	// Test login command with valid arguments
	output := executeCommand(cmd, "login", "test@example.com", "testuser", "password")
	expected := "API Key: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
	}

	// Test login command with missing arguments
	output = executeCommand(cmd, "login", "test@example.com", "testuser")
	expected = "Error: accepts 3 arg(s), received 2"
	if output != expected {
		t.Errorf("Expected output %q, but got %q", expected, output)
	}
}

func TestGuestCommand(t *testing.T) {
	rettiwt := &Rettiwt{}
	cmd := createAuthCommand(rettiwt)

	// Test guest command
	output := executeCommand(cmd, "guest")
	expected := "Guest Key: "
	if output[:len(expected)] != expected {
		t.Errorf("Expected output to start with %q, but got %q", expected, output)
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
