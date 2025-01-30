package main

import (
	"flag"

	"github.com/spf13/cobra"
)

type RettiwtConfig struct {
	APIKey   string
	Logging  bool
	ProxyURL string
	Timeout  int
}

func main() {
	// Define command-line flags
	apiKey := flag.String("key", "", "The API key to use for authentication")
	logging := flag.Bool("log", false, "Enable logging to console")
	proxyURL := flag.String("proxy", "", "The URL to the proxy to use")
	timeout := flag.Int("timeout", 0, "The timeout (in milliseconds) to use for requests")

	// Parse command-line flags
	flag.Parse()

	// Initialize RettiwtConfig using the given options
	config := RettiwtConfig{
		APIKey:   *apiKey,
		Logging:  *logging,
		ProxyURL: *proxyURL,
		Timeout:  *timeout,
	}

	// Initialize Rettiwt instance
	rettiwt := NewRettiwt(config)

	// Create root command
	rootCmd := &cobra.Command{Use: "rettiwt"}

	// Add sub-commands
	rootCmd.AddCommand(createListCommand(rettiwt))
	rootCmd.AddCommand(createTweetCommand(rettiwt))
	rootCmd.AddCommand(createUserCommand(rettiwt))
	rootCmd.AddCommand(createAuthCommand(rettiwt))

	// Execute the root command
	if err := rootCmd.Execute(); err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
}

func NewRettiwt(config RettiwtConfig) *Rettiwt {
	// Initialize and return a new Rettiwt instance
	return &Rettiwt{
		Config: config,
	}
}

type Rettiwt struct {
	Config RettiwtConfig
}
