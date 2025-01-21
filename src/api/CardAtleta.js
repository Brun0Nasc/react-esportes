import React, { useState, useEffect } from "react";
import axios from 'axios';

function Atletas() {
  const [searchFirstname, setSearchFirstname] = useState('');
  const [searchLastname, setSearchLastname] = useState('');
  const [players, setPlayers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]); // Jogadores favoritos
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false); // Exibe apenas favoritos
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://basketball-head.p.rapidapi.com/players',
        {pageSize: 100},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
          },
        }
      )

      setPlayers(response.data.body);
    } catch (err) {
      setError('Erro ao buscar jogadores: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchPlayers = async () => {
    if (!searchFirstname && !searchLastname) {
      alert('Por favor, insira pelo menos um critério de busca.');
      return;
    };

    setLoading(true);
    try {
      const response = await axios.post(
        'https://basketball-head.p.rapidapi.com/players/search',
        {
          pageSize: 100,
          firstname: searchFirstname,
          lastname: searchLastname,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
          },
        }
      );

      setSearchResults(response.data.body);
      setIsSearchActive(true);
    } catch (err) {
      setError('Erro ao buscar jogadores: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const clearSearch = () => {
    setSearchFirstname('');
    setSearchLastname('');
    setSearchResults(players);
    setIsSearchActive(false); // Desativa a pesquisa
  };

  const toggleFavorite = (player) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.playerId === player.playerId)) {
        return prevFavorites.filter((fav) => fav.playerId !== player.playerId);
      } else {
        return [...prevFavorites, player];
      }
    });
  };

  const toggleShowFavorites = () => {
    setShowOnlyFavorites((prev) => !prev);
  };

  const renderCardAtleta = (player) => {
    const isFavorite = favorites.some((fav) => fav.playerId === player.playerId);

    return (
      <div
        key={player.playerId}
        style={{
          border: '2px solid #ddd',
          borderRadius: '10px',
          padding: '15px',
          margin: '10px',
          maxWidth: '200px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <img
          src={player.headshotUrl}
          alt={`${player.firstName} ${player.lastName}`}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '10px',
          }}
        />
        <h3 style={{ fontSize: '1em', margin: '10px 0' }}>
          {player.firstName} {player.lastName}
        </h3>
        <p><strong>Altura:</strong> {player.height}</p>
        <p><strong>Peso:</strong> {player.weight}</p>
        <p><strong>Posições:</strong> {player.positions}</p>
        <p><strong>Data de Nascimento:</strong> {player.dateBorn}</p>
        <p><strong>Lugar de Nascimento:</strong> {player.birthPlace}</p>
        <p><strong>Draft:</strong> {player.draftInfo}</p>
        <button
          onClick={() => toggleFavorite(player)}
          style={{
            padding: '5px 10px',
            backgroundColor: isFavorite ? 'red' : 'green',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {isFavorite ? 'Remover dos Favoritos' : 'Favoritar'}
        </button>
      </div>
    )};

  if (loading) return <p>Carregando jogadores...</p>;
  if (error) return <p>Erro ao carregar dados: {error}</p>;

  // Decide quais jogadores exibir com base no estado atual
  const jogadoresExibidos = showOnlyFavorites
    ? favorites
    : (searchFirstname || searchLastname) && isSearchActive
    ? searchResults
    : players;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Figurinhas de Jogadores de Basquete</h1>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Formulário de pesquisa */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Pesquisar Jogador</h2>
        <input
          type="text"
          placeholder="Primeiro Nome"
          value={searchFirstname}
          onChange={(e) => setSearchFirstname(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={searchLastname}
          onChange={(e) => setSearchLastname(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={searchPlayers}>Pesquisar</button>
        <button onClick={clearSearch}>
          Limpar Pesquisa
        </button>
        <button onClick={toggleShowFavorites}>
          {showOnlyFavorites ? 'Exibir Todos' : 'Exibir Favoritos'}
        </button>
      </div>

      {/* Lista de jogadores */}
      <div>
        <h2>{showOnlyFavorites ? 'Favoritos' : 'Jogadores'}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {jogadoresExibidos.map(renderCardAtleta)}
        </div>
      </div>
    </div>
  );
}

export default Atletas;