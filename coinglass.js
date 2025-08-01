export default async function handler(req, res) {
  const { symbol } = req.query;

  const response = await fetch(`https://open-api.coinglass.com/api/pro/v1/futures/openInterest?symbol=${symbol}`, {
    method: 'GET',
    headers: {
      'coinglassSecret': process.env.COINGLASS_API_KEY
    }
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
