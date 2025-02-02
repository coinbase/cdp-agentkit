#!/bin/bash

# Exit on error
set -e

# Store the current directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../../.. && pwd)"
EXAMPLE_DIR="$ROOT_DIR/typescript/examples/claude-tool-example"
PID_FILE="/tmp/claude-mcp-server.pid"

# Cleanup function
cleanup() {
    if [ -f "$PID_FILE" ]; then
        echo "Stopping server..."
        kill $(cat "$PID_FILE") 2>/dev/null || true
        rm "$PID_FILE"
    fi
}

# Set up cleanup on script exit
trap cleanup EXIT

echo "Setting up environment..."
# Check if .env exists, if not create it from example
if [ ! -f "$EXAMPLE_DIR/.env" ]; then
    cp "$EXAMPLE_DIR/.env.example" "$EXAMPLE_DIR/.env"
    echo "Created .env file. Please edit it to add your ANTHROPIC_API_KEY"
    exit 1
fi

# Check if ANTHROPIC_API_KEY is set in .env
if ! grep -q "^ANTHROPIC_API_KEY=sk-ant" "$EXAMPLE_DIR/.env"; then
    echo "ANTHROPIC_API_KEY not found or invalid in .env file"
    echo "Please edit $EXAMPLE_DIR/.env and add your ANTHROPIC_API_KEY"
    exit 1
fi

echo "Installing Python dependencies..."
cd "$ROOT_DIR/python/claude-mcp"
pip install -r requirements.txt

echo "Installing and building TypeScript dependencies..."
cd "$ROOT_DIR/typescript/agentkit"
npm install
npm run build

echo "Installing example dependencies..."
cd "$EXAMPLE_DIR"
npm install

echo "Setting up CDP API key..."
# Check if cdp_api_key.json exists in parent directory
if [ -f "$ROOT_DIR/../cdp_api_key.json" ]; then
    cp "$ROOT_DIR/../cdp_api_key.json" "$EXAMPLE_DIR/coinbase_cloud_api_key.json"
elif [ -f "$ROOT_DIR/../cdp_api_key (2).json" ]; then
    cp "$ROOT_DIR/../cdp_api_key (2).json" "$EXAMPLE_DIR/coinbase_cloud_api_key.json"
else
    echo "CDP API key file not found. Please copy your CDP API key file to coinbase_cloud_api_key.json"
    exit 1
fi

echo "Starting server..."
# Kill any existing node processes on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Start the server in the background
cd "$EXAMPLE_DIR"
npm run server > server.log 2>&1 &
echo $! > "$PID_FILE"

# Wait for server to start
echo "Waiting for server to start..."
while ! nc -z localhost 3000; do   
  sleep 1
done

echo "Running example..."
# Run the example
npm run start

echo "Done! Server has been stopped."
