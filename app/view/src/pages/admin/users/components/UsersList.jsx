import React, { useEffect, useState } from 'react';
import { apiGetUsers } from '../../../../service/api_calls';
import Button from '../../../../components/Button';

function UsersList({ selectedUser , setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Fehler beim Laden der Benutzer:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-600">Lade Benutzer...</p>;
  }

  return (
    <div className="users-container p-4">
      {users.length === 0 ? (
        <p className="text-gray-600">Keine Benutzer verfügbar</p>
      ) : (
        users.map((user) => (
          <Button
            key={user.id}
            onClick={() => {setSelectedUser(user)}}
            className="block w-full text-left px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200"
          >
            {user.email}
          </Button>
        ))
      )}
    </div>
  );
}

export default UsersList;
