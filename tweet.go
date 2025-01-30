package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

func createTweetCommand(rettiwt *Rettiwt) *cobra.Command {
	tweetCmd := &cobra.Command{
		Use:   "tweet",
		Short: "Access resources related to tweets",
	}

	detailsCmd := &cobra.Command{
		Use:   "details [id]",
		Short: "Fetch the details of tweet with the given id",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			details, err := rettiwt.Tweet.Details(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Details:", details)
		},
	}

	likeCmd := &cobra.Command{
		Use:   "like [id]",
		Short: "Like a tweet",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			result, err := rettiwt.Tweet.Like(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}

	listCmd := &cobra.Command{
		Use:   "list [id] [count] [cursor]",
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
			tweets, err := rettiwt.Tweet.List(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Tweets:", tweets)
		},
	}

	postCmd := &cobra.Command{
		Use:   "post [text]",
		Short: "Post a tweet (text only)",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			text := args[0]
			media, _ := cmd.Flags().GetString("media")
			quote, _ := cmd.Flags().GetString("quote")
			reply, _ := cmd.Flags().GetString("reply")
			result, err := rettiwt.Tweet.Post(TweetArgs{
				Text:      text,
				Media:     media,
				Quote:     quote,
				ReplyTo:   reply,
			})
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}
	postCmd.Flags().String("media", "", "Comma-separated list of ids of the media item(s) to be posted")
	postCmd.Flags().String("quote", "", "The id of the tweet to quote in the tweet to be posted")
	postCmd.Flags().String("reply", "", "The id of the tweet to which the reply is to be made, if the tweet is to be a reply")

	retweetCmd := &cobra.Command{
		Use:   "retweet [id]",
		Short: "Retweet a tweet",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			result, err := rettiwt.Tweet.Retweet(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}

	retweetersCmd := &cobra.Command{
		Use:   "retweeters [id] [count] [cursor]",
		Short: "Fetch the list of users who retweeted the given tweets",
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
			retweeters, err := rettiwt.Tweet.Retweeters(id, count, cursor)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Retweeters:", retweeters)
		},
	}

	scheduleCmd := &cobra.Command{
		Use:   "schedule [text] [time]",
		Short: "Schedule a tweet to be posted at a given date/time",
		Args:  cobra.ExactArgs(2),
		Run: func(cmd *cobra.Command, args []string) {
			text := args[0]
			time := args[1]
			media, _ := cmd.Flags().GetString("media")
			quote, _ := cmd.Flags().GetString("quote")
			reply, _ := cmd.Flags().GetString("reply")
			result, err := rettiwt.Tweet.Schedule(TweetArgs{
				Text:        text,
				Media:       media,
				Quote:       quote,
				ReplyTo:     reply,
				ScheduleFor: time,
			})
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}
	scheduleCmd.Flags().String("media", "", "Comma-separated list of ids of the media item(s) to be posted")
	scheduleCmd.Flags().String("quote", "", "The id of the tweet to quote in the tweet to be posted")
	scheduleCmd.Flags().String("reply", "", "The id of the tweet to which the reply is to be made, if the tweet is to be a reply")

	searchCmd := &cobra.Command{
		Use:   "search [count] [cursor]",
		Short: "Fetch the list of tweets that match the given filter options",
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
			options := TweetSearchOptions{
				From:           cmd.Flag("from").Value.String(),
				To:             cmd.Flag("to").Value.String(),
				Words:          cmd.Flag("words").Value.String(),
				Phrase:         cmd.Flag("phrase").Value.String(),
				OptionalWords:  cmd.Flag("optional-words").Value.String(),
				ExcludeWords:   cmd.Flag("exclude-words").Value.String(),
				Hashtags:       cmd.Flag("hashtags").Value.String(),
				List:           cmd.Flag("list").Value.String(),
				Mentions:       cmd.Flag("mentions").Value.String(),
				MinReplies:     cmd.Flag("min-replies").Value.String(),
				MinLikes:       cmd.Flag("min-likes").Value.String(),
				MinRetweets:    cmd.Flag("min-retweets").Value.String(),
				Quoted:         cmd.Flag("quoted").Value.String(),
				ExcludeLinks:   cmd.Flag("exclude-links").Value.String(),
				ExcludeReplies: cmd.Flag("exclude-replies").Value.String(),
				Start:          cmd.Flag("start").Value.String(),
				End:            cmd.Flag("end").Value.String(),
				Top:            cmd.Flag("top").Value.String(),
				Stream:         cmd.Flag("stream").Value.String(),
				Interval:       cmd.Flag("interval").Value.String(),
			}
			if options.Stream {
				for tweet := range rettiwt.Tweet.Stream(options.ToTweetFilter(), options.Interval) {
					fmt.Println("Tweet:", tweet)
				}
			} else {
				tweets, err := rettiwt.Tweet.Search(options.ToTweetFilter(), count, cursor)
				if err != nil {
					fmt.Println("Error:", err)
					return
				}
				fmt.Println("Tweets:", tweets)
			}
		},
	}
	searchCmd.Flags().String("from", "", "Matches the tweets made by the comma-separated list of given users")
	searchCmd.Flags().String("to", "", "Matches the tweets made to the comma-separated list of given users")
	searchCmd.Flags().String("words", "", "Matches the tweets containing the given comma-separated list of words")
	searchCmd.Flags().String("phrase", "", "Matches the tweets containing the exact phrase")
	searchCmd.Flags().String("optional-words", "", "Matches the tweets containing any of the given comma-separated list of words")
	searchCmd.Flags().String("exclude-words", "", "Matches the tweets that do not contain any of the give comma-separated list of words")
	searchCmd.Flags().String("hashtags", "", "Matches the tweets containing the given comma-separated list of hashtags")
	searchCmd.Flags().String("list", "", "Matches the tweets from the list with the given id")
	searchCmd.Flags().String("mentions", "", "Matches the tweets that mention the given comma-separated list of usernames")
	searchCmd.Flags().String("min-replies", "", "Matches the tweets that have a minimum of given number of replies")
	searchCmd.Flags().String("min-likes", "", "Matches the tweets that have a minimum of given number of likes")
	searchCmd.Flags().String("min-retweets", "", "Matches the tweets that have a minimum of given number of retweets")
	searchCmd.Flags().String("quoted", "", "Matches the tweets that quote the tweet with the given id")
	searchCmd.Flags().String("exclude-links", "", "Matches tweets that do not contain links")
	searchCmd.Flags().String("exclude-replies", "", "Matches the tweets that are not replies")
	searchCmd.Flags().String("start", "", "Matches the tweets made since the given date (valid date/time string)")
	searchCmd.Flags().String("end", "", "Matches the tweets made upto the given date (valid date/time string)")
	searchCmd.Flags().String("top", "", "Matches top tweets instead of latest")
	searchCmd.Flags().String("stream", "", "Stream the filtered tweets in pseudo-realtime")
	searchCmd.Flags().String("interval", "", "The polling interval (in ms) to use for streaming. Default is 60000")

	unlikeCmd := &cobra.Command{
		Use:   "unlike [id]",
		Short: "Unlike a tweet",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			result, err := rettiwt.Tweet.Unlike(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}

	unpostCmd := &cobra.Command{
		Use:   "unpost [id]",
		Short: "Unpost a tweet",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			result, err := rettiwt.Tweet.Unpost(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}

	unretweetCmd := &cobra.Command{
		Use:   "unretweet [id]",
		Short: "Unretweet a tweet",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			result, err := rettiwt.Tweet.Unretweet(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}

	unscheduleCmd := &cobra.Command{
		Use:   "unschedule [id]",
		Short: "Unschedule a tweet",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			id := args[0]
			result, err := rettiwt.Tweet.Unschedule(id)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("Result:", result)
		},
	}

	uploadCmd := &cobra.Command{
		Use:   "upload [path]",
		Short: "Upload a media file and returns the alloted id (valid for 24 hrs)",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			path := args[0]
			id, err := rettiwt.Tweet.Upload(path)
			if err != nil {
				fmt.Println("Error:", err)
				return
			}
			fmt.Println("ID:", id)
		},
	}

	tweetCmd.AddCommand(detailsCmd)
	tweetCmd.AddCommand(likeCmd)
	tweetCmd.AddCommand(listCmd)
	tweetCmd.AddCommand(postCmd)
	tweetCmd.AddCommand(retweetCmd)
	tweetCmd.AddCommand(retweetersCmd)
	tweetCmd.AddCommand(scheduleCmd)
	tweetCmd.AddCommand(searchCmd)
	tweetCmd.AddCommand(unlikeCmd)
	tweetCmd.AddCommand(unpostCmd)
	tweetCmd.AddCommand(unretweetCmd)
	tweetCmd.AddCommand(unscheduleCmd)
	tweetCmd.AddCommand(uploadCmd)

	return tweetCmd
}

type TweetArgs struct {
	Text        string
	Media       string
	Quote       string
	ReplyTo     string
	ScheduleFor string
}

type TweetSearchOptions struct {
	From           string
	To             string
	Words          string
	Phrase         string
	OptionalWords  string
	ExcludeWords   string
	Hashtags       string
	List           string
	Mentions       string
	MinReplies     string
	MinLikes       string
	MinRetweets    string
	Quoted         string
	ExcludeLinks   string
	ExcludeReplies string
	Start          string
	End            string
	Top            string
	Stream         string
	Interval       string
}

func (options *TweetSearchOptions) ToTweetFilter() TweetFilter {
	return TweetFilter{
		FromUsers:      options.From,
		ToUsers:        options.To,
		IncludeWords:   options.Words,
		IncludePhrase:  options.Phrase,
		OptionalWords:  options.OptionalWords,
		ExcludeWords:   options.ExcludeWords,
		Hashtags:       options.Hashtags,
		List:           options.List,
		Mentions:       options.Mentions,
		MinReplies:     options.MinReplies,
		MinLikes:       options.MinLikes,
		MinRetweets:    options.MinRetweets,
		Quoted:         options.Quoted,
		Links:          options.ExcludeLinks,
		Replies:        options.ExcludeReplies,
		StartDate:      options.Start,
		EndDate:        options.End,
		Top:            options.Top,
	}
}
