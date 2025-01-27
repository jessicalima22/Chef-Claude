// api/getApiData.js

import dotenv from 'dotenv';

dotenv.config();

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY; 
  const apiUrl = 'https://api.exemplo.com/endpoint';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      return res.status(500).json({ message: 'Erro ao buscar dados' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
