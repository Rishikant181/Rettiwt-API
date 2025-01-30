package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

func createListCommand(rettiwt *Rettiwt) *cobra.Command {
	listCmd := &cobra.Command{
		Use:   "list",
		Short: "Access resources related to lists",
	}

	membersCmd := &cobra.Command{
		Use:   "members [id] [count] [cursor]",
		Short: "Fetch the list of members of the given tweet list",
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			var count int
			var cursor string
			if len(args) > 1 {
				count = args[1]
			}
			if len(args) > 2 {
				cursor = args[2]
			}
			members, err := rettiwt.List.Members(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Members:", members)
		},
	}

	tweetsCmd := &cobra.Command{
		Use:   "tweets [id] [count] [cursor]",
		Short: "Fetch the list of tweets in the tweet list with the given id",
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			var count int
			var cursor string
			if len(args) > 1 {
				count = args[1]
			}
			if len(args) > 2 {
				cursor = args[2]
			}
			tweets, err := rettiwt.List.Tweets(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Tweets:", tweets)
		},
	}

	listCmd.AddCommand(membersCmd)
	listCmd.AddCommand(tweetsCmd)

	return listCmd
}
