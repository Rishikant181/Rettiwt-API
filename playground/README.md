# Rettiwt Playground

This playground is intended for developers to test and experiment with features from the Rettiwt-API package in a local development environment.

## Getting Started

### Prerequisites

- Node.js (v22 or higher recommended)
- npm (v7+ recommended for workspace support)

### Setup

1. **Install dependencies**
   From the root of the monorepo, run:

    ```sh
    npm install
    ```

    This will install dependencies for all workspaces, including `playground` and `src`.

2. **Environment Variables**
   Create a `.env` file in the `playground` directory with your API credentials:
    ```env
    ACCESS_TOKEN=your_access_token_here
    ```

### Usage

- The main entry point is [`index.js`](./index.js), which demonstrates usage of the Rettiwt-API.
- To run the playground:
    ```sh
    npm start --workspace=playground
    ```
    or from the `playground` directory:
    ```sh
    npm start
    ```

### Modifying Playground Code

- Edit `index.js` to try different API features or test new functionality.
- The `rettiwt-api` dependency is linked via npm workspaces, so changes in `src` are immediately available in the playground after rebuilding if necessary.

## Notes

- This playground is for development and testing only. Do not use production credentials.
- For more advanced usage, add scripts or files as needed.

---

For questions or issues, see the main project README or open an issue.
