export default function handler(req, res) {
  if (req.method === 'POST') {
    res.json({ message: 'Test response from API' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
