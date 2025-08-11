const callClaudeAPI = async (prompt, maxTokens = 1000) => {
  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    const data = await response.json();
    console.log('API Response:', data); // Debug what we're getting
    
    // Handle different response formats
    if (data.content && data.content[0] && data.content[0].text) {
      return data.content[0].text;
    } else if (data.text) {
      return data.text;
    } else if (data.message) {
      return data.message;
    } else {
      return "Got response but couldn't parse it: " + JSON.stringify(data);
    }
  } catch (error) {
    console.error('Claude API error:', error);
    return "Sorry, I'm having trouble connecting right now. Try asking again in a moment!";
  }
};
