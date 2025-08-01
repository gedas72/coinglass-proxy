export default async function handler(req, res) {
  const { endpoint } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing endpoint parameter' });
  }

  const COINGLASS_API_KEY = process.env.COINGLASS_API_KEY;

  try {
    const response = await fetch(`https://open-api.coinglass.com/${endpoint}`, {
      headers: {
        'accept': 'application/json',
        'coinglassSecret': COINGLASS_API_KEY
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: 'CoinGlass error', message: errorText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
}
