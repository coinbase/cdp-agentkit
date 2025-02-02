const express = require('express');
const { spawn } = require('child_process');
const app = express();
require('dotenv').config();

app.use(express.json());

// Start the Claude MCP server process
const claudeServer = spawn('python3', ['/Users/matthewlaw/Downloads/agentkit/python/claude-mcp/src/claude_server.py'], {
  env: {
    ...process.env,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    PATH: process.env.PATH
  }
});

claudeServer.stdout.on('data', (data) => {
  console.log(`Claude MCP server: ${data}`);
});

claudeServer.stderr.on('data', (data) => {
  console.error(`Claude MCP server error: ${data}`);
});

// Handle requests to /mcp
app.post('/mcp', (req, res) => {
  const requestData = JSON.stringify(req.body) + '\n';
  claudeServer.stdin.write(requestData);

  // Listen for the response
  const onData = (data) => {
    try {
      const response = JSON.parse(data.toString());
      res.json(response);
      claudeServer.stdout.removeListener('data', onData);
    } catch (error) {
      console.error('Error parsing response:', error);
    }
  };

  claudeServer.stdout.on('data', onData);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Environment variables:', {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? 'Set' : 'Not set'
  });
});