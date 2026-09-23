import React, { useState, useEffect} from "react";   
import SearchBar from './SearchBar';


function Users({ API_URL, showMessage }) {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({ name: '', age: '', genre: ''});
    const [selectedUser, setSelectUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [searchTerm]);

    const fetchUsers = async () => {
        try {
            const url = searchTerm
                ? `${API_URL}/users?search=${searchTerm}`
                : `${API_URL}/users`;

            const res = await fetch(url);
            const result = await res.json();
            if (result.success) setUsers(result.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    }

    const recallUser = async (id) => {
        try {
            const res = await fetch(`${API_URL}/users/${id}`);
            const result = await res.json();
            if (result.success) setSelectUser(result.data);
        } catch (err) {
            console.error("Error recalling user:", err)
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(userData),
            });
            if (res.ok) {
                setUserData({name: '', age: '', genre: '' });
                fetchUsers();
                showMessage('Successfully stored new user!');
            } else {
                const errorData = await res.json();
                showMessage(errorData.message, 'error');
            }
        } catch (err) {
            showMessage('Error creating user', 'error');            
        }
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
            fetchUsers();
            if (selectedUser?._id === id) setSelectUser(null);
            showMessage('Successfully deleted user.');
        } catch (err) {
            showMessage('Error deleting user', 'error')
        }
    }

    return (
        <div style={{flex: 1 }}>
            {selectedUser && (
                <div style={{ padding: '15px', backgroundColor: '#eef6ff', border: '1px solid #b3b4ff', borderRadius: '5px', marginBottom: '20px' }}>
                    <h3>User Details</h3>
                    <p><strong>Name:</strong>{selectedUser.name}</p>
                    <p><strong>Age:</strong>{selectedUser.age}</p>
                    <p><strong>Favorite Genre:</strong>{selectedUser.genre}</p>
                    <button onClick={() => setSelectUser(null)}>Close</button>
                </div>
            )}

            <h2>Users</h2>
            <form onSubmit={handleSubmit} 
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px'}}>

            <input type="text" placeholder="User Name" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} required />
                
            <input type="number" placeholder="Age" value={userData.age} onChange={(e) => setUserData({...userData, age: e.target.value})} required />
                
            <input type="text" placeholder="Favorite Genre" value={userData.genre} onChange={(e) => setUserData({...userData, genre: e.target.value})} required />
            <button type="submit">Add User</button>
            </form>

            <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ccc'}} />

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="🔍 Search users by name..." 
            />

            <ul style={{ padding: 0, listStyle: 'none'}}>
                {users?.map(user => (
                    <li key={user._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                        <strong>{user.name} </strong>
                        <div style={{ float: 'right'}}>
                            <button type="button" onClick={() => recallUser(user._id)} style={{ marginRight: '10px', cursor: 'pointer'}}>View</button>
                            <button type="button" onClick={() => handleDelete(user._id)} style={{ color: 'red', cursor: 'pointer' }}>X</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users;













