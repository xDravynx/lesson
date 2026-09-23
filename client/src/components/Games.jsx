import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'

function Games({ API_URL, showMessage }) {
    const [games, setGames] = useState([]);
    const [gameData, setGameData] = useState({ name: '', year: '', genre: '', description: ''})
    const [selectedGame, setSelectedGame] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {
        fetchGames();
    }, [searchTerm]);

    const fetchGames = async () => {
        try {
            const url = searchTerm
                ? `${API_URL}/games?search=${searchTerm}`
                :  `${API_URL}/games`;

            const res = await fetch(url);
            const result = await res.json();
            if (result.success) setGames(result.data);
        } catch (err) {
            console.error("Error fetching games:", err);
        }
    };

    const recallGame = async (id) => {
        try {
            const res = await fetch(`${API_URL}/games/${id}`);
            const result = await res.json();
            if (result.success) setSelectedGame(result.data);
        } catch (error) {
            console.error("Error fetching games:", error)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gameData),
            })
            if (res.ok) {
                setGameData({ name: '', year: '', genre: '', description: '' });
                fetchGames();
                showMessage('Successfully stored new game!');
            } else {
                const errorData = await res.json();
                showMessage(errorData.message, 'error')
            }
        } catch (error) {
            showMessage('Error creating game', 'error');
        }
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/games/${id}`, { method: 'DELETE'});
            fetchGames();
            if (selectedGame?._id === id) setSelectedGame(null);
            showMessage('Successfully deleted game.');
        } catch (error) {
            showMessage('Error deleting game', 'error')
        }       
    };



    return (
        <div style={{ flex: 1 }}>
            {selectedGame && (
                <div style={{padding: '15px', backgroundColor: '#f0ffe6', border: '1px solid #bde6a1', borderRadius: '5px', marginBottom: '20px'}}>
                    <h3>Game Details</h3>
                    <p><strong>Title:</strong>{selectedGame.name}</p>
                    <p><strong>Year:</strong>{selectedGame.year}</p>
                    <p><strong>Genre:</strong>{selectedGame.genre}</p>
                    <p><strong>Description:</strong>{selectedGame.description}</p>
                    <button onClick={() => setSelectedGame(null)}>Close</button>
                </div>
            )}

            <h2>Games</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                <input type="text" placeholder='Game Name' value={gameData.name} onChange={(e) => setGameData({...gameData, name: e.target.value})} required />
                <input type="number" placeholder='Release Year' value={gameData.year} onChange={(e) => setGameData({...gameData, year: e.target.value})} required />
                <input type="text" placeholder='Genre' value={gameData.genre} onChange={(e) => setGameData({...gameData, genre: e.target.value})} required />
                
                <textarea placeholder="Description" value={gameData.description} onChange={(e) => setGameData({...gameData, description: e.target.value})} required />
                    <button type="submit">Add Game</button>
            </form>
            
            <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ccc'}} />

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="🔍 Search games by name..." 
            />
            <ul style={{ padding: 0, listStyle: 'none' }}>
                {games?.map(game => (
                    <li key={game._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                    <strong>{game.name}</strong>
                    <div style={{ float: 'right' }}>
                    <button type="button" onClick={() => recallGame(game._id)} style={{ marginRight: '10px', cursor: 'pointer'}}>View</button>
                    <button type="button" onClick={() => handleDelete(game._id)} style={{ color: 'red', cursor: 'pointer'}}>X</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Games;