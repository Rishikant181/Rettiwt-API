package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

func createAuthCommand(rettiwt *Rettiwt) *cobra.Command {
	authCmd := &cobra.Command{
		Use:   "auth",
		Short: "Manage authentication",
	}

	loginCmd := &cobra.Command{
		Use:   "login [email] [username] [password]",
		Short: "Generate a new API key using Twitter account login credentials",
		Args:  cobra.ExactArgs(3),
		Run: func(cmd *cobra.Command, args []string) {
			email := args[0]
			username := args[1]
			password := args[2]
			apiKey, err := rettiwt.Auth.Login(email, username, password)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("API Key:", apiKey)
		},
	}

	guestCmd := &cobra.Command{
		Use:   "guest",
		Short: "Generate a new guest key",
		Run: func(cmd *cobra.Command, args []string) {
			guestKey, err := rettiwt.Auth.Guest()
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Guest Key:", guestKey)
		},
	}

	authCmd.AddCommand(loginCmd)
	authCmd.AddCommand(guestCmd)

	return authCmd
}
