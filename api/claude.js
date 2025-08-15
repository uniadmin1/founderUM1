export default async function handler(req, res) {
  console.log('API route hit!', req.method, req.body);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle both old format (prompt, maxTokens) and new format (messages)
    let claudeRequest;
    if (req.body.prompt) {
      // Convert old format to new
      claudeRequest = {
        model: "claude-3-sonnet-20240229",
        max_tokens: req.body.maxTokens || 1000,
        messages: [{ role: "user", content: req.body.prompt }]
      };
    } else {
      // Use new format directly
      claudeRequest = req.body;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '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',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(claudeRequest)
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    } catch (error) {
    console.error('Claude API error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
}
