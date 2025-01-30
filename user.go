package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

func createUserCommand(rettiwt *Rettiwt) *cobra.Command {
	userCmd := &cobra.Command{
		Use:   "user",
		Short: "Access resources related to users",
	}

	bookmarksCmd := &cobra.Command{
		Use:   "bookmarks [count] [cursor]",
		Short: "Fetch your list of bookmarks",
		Args:  cobra.MinimumNArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			var count int
			var cursor string
			if len(args) > 0 {
				count = args[0]
			}
			if len(args) > 1 {
				cursor = args[1]
			}
			bookmarks, err := rettiwt.User.Bookmarks(count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Bookmarks:", bookmarks)
		},
	}

	detailsCmd := &cobra.Command{
		Use:   "details [id]",
		Short: "Fetch the details of the user with the given id/username",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			details, err := rettiwt.User.Details(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Details:", details)
		},
	}

	followCmd := &cobra.Command{
		Use:   "follow [id]",
		Short: "Follow a user",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			result, err := rettiwt.User.Follow(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}

	followedCmd := &cobra.Command{
		Use:   "followed [cursor]",
		Short: "Fetch your followed feed",
		Args:  cobra.MinimumNArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			var cursor string
			if len(args) > 0 {
				cursor = args[0]
			}
			tweets, err := rettiwt.User.Followed(cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Tweets:", tweets)
		},
	}

	followersCmd := &cobra.Command{
		Use:   "followers [id] [count] [cursor]",
		Short: "Fetch the list of users who follow the given user",
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
			users, err := rettiwt.User.Followers(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Users:", users)
		},
	}

	followingCmd := &cobra.Command{
		Use:   "following [id] [count] [cursor]",
		Short: "Fetch the list of users who are followed by the given user",
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
			users, err := rettiwt.User.Following(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Users:", users)
		},
	}

	highlightsCmd := &cobra.Command{
		Use:   "highlights [id] [count] [cursor]",
		Short: "Fetch the list of highlighted tweets of the given user",
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
			tweets, err := rettiwt.User.Highlights(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Tweets:", tweets)
		},
	}

	likesCmd := &cobra.Command{
		Use:   "likes [count] [cursor]",
		Short: "Fetch your list of liked tweet",
		Args:  cobra.MinimumNArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			var count int
			var cursor string
			if len(args) > 0 {
				count = args[0]
			}
			if len(args) > 1 {
				cursor = args[1]
			}
			tweets, err := rettiwt.User.Likes(count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Tweets:", tweets)
		},
	}

	mediaCmd := &cobra.Command{
		Use:   "media [id] [count] [cursor]",
		Short: "Fetch the media timeline the given user",
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
			media, err := rettiwt.User.Media(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Media:", media)
		},
	}

	recommendedCmd := &cobra.Command{
		Use:   "recommended [cursor]",
		Short: "Fetch your recommended feed",
		Args:  cobra.MinimumNArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			var cursor string
			if len(args) > 0 {
				cursor = args[0]
			}
			tweets, err := rettiwt.User.Recommended(cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Tweets:", tweets)
		},
	}

	repliesCmd := &cobra.Command{
		Use:   "replies [id] [count] [cursor]",
		Short: "Fetch the replies timeline the given user",
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
			replies, err := rettiwt.User.Replies(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Replies:", replies)
		},
	}

	subscriptionsCmd := &cobra.Command{
		Use:   "subscriptions [id] [count] [cursor]",
		Short: "Fetch the list of users who are subscribed by the given user",
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
			users, err := rettiwt.User.Subscriptions(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Users:", users)
		},
	}

	timelineCmd := &cobra.Command{
		Use:   "timeline [id] [count] [cursor]",
		Short: "Fetch the tweets timeline the given user",
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
			tweets, err := rettiwt.User.Timeline(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Tweets:", tweets)
		},
	}

	unfollowCmd := &cobra.Command{
		Use:   "unfollow [id]",
		Short: "Unfollow a user",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			result, err := rettiwt.User.Unfollow(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}

	userCmd.AddCommand(bookmarksCmd)
	userCmd.AddCommand(detailsCmd)
	userCmd.AddCommand(followCmd)
	userCmd.AddCommand(followedCmd)
	userCmd.AddCommand(followersCmd)
	userCmd.AddCommand(followingCmd)
	userCmd.AddCommand(highlightsCmd)
	userCmd.AddCommand(likesCmd)
	userCmd.AddCommand(mediaCmd)
	userCmd.AddCommand(recommendedCmd)
	userCmd.AddCommand(repliesCmd)
	userCmd.AddCommand(subscriptionsCmd)
	userCmd.AddCommand(timelineCmd)
	userCmd.AddCommand(unfollowCmd)

	return userCmd
}
