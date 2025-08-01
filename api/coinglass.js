export default async function handler(req, res) {
  const { symbol } = req.query;
  const apiKey = process.env.COINGLASS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not set' });
  }

  try {
    const response = await fetch(`https://open-api.coinglass.com/public/v2/open_interest/market?symbol=${symbol}`, {
      headers: {
        'coinglassSecret': apiKey
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from CoinGlass' });
  }
}
