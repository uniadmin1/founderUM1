const callClaudeAPI = async (prompt, maxTokens = 1000) => {
  try {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    const data = await response.json();
    
    // Just return whatever we can get
    return data?.content?.[0]?.text || data?.message || data?.error || "API returned: " + JSON.stringify(data);
    
  } catch (error) {
    return "Error: " + error.message;
  }
};
