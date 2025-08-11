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
    console.log('Full API response:', data); // See what we're getting
    
    if (data.content && data.content[0] && data.content[0].text) {
      return data.content[0].text;
    } else {
      return "Error: " + JSON.stringify(data);
    }
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
};
