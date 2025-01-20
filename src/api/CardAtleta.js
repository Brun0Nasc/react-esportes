import React from 'react';

function CardAtleta({ playerData }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', width: '200px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <img src={playerData.player.photo} alt={playerData.player.name} style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }} />
      <h2 style={{ fontSize: '1.2em', margin: '10px 0' }}>{playerData.player.name}</h2>
      <p><strong>Nome:</strong> {playerData.player.firstname}</p>
      <p><strong>Sobrenome:</strong> {playerData.player.lastname}</p>
      <p><strong>Idade:</strong> {playerData.player.age}</p>
      <p><strong>Aniversário:</strong> {playerData.player.birth.date}</p>
      <p><strong>Nacionalidade:</strong> {playerData.player.nationality}</p>
      <p><strong>Número:</strong> {playerData.player.number}</p>
      <p><strong>Posição:</strong> {playerData.player.position}</p>
    </div>
  );
}

export default CardAtleta;
