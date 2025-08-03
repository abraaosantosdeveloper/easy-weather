// api/weather.js
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: 'Cidade é obrigatória' });
  }

  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    
    if (!API_KEY) {
      throw new Error('API key not configured');
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
    );

    if (!response.ok) {
      throw new Error('Weather API error');
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar dados do clima',
      message: error.message 
    });
  }
}