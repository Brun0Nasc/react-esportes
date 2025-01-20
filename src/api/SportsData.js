import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardAtleta from './CardAtleta';

function SportsData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://v3.football.api-sports.io/players/profiles', {
              params: {
              player: '276'
              },
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
              'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
            },
          });
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Erro ao carregar dados: {error}</p>;

return (
  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
    {data.response && data.response.length > 0 ? (
      data.response.map((playerData) => (
        <CardAtleta key={playerData.player.id} playerData={playerData} />
      ))
    ) : (
      <p>No player data available</p>
    )}
  </div>
);
}

export default SportsData;
