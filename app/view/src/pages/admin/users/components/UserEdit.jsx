import React, { useEffect, useState } from 'react';
import { apiUpdateUser } from '../../../../service/api_calls';

function UserEdit({ selectedUser, setSelectedUser })
 {
 
  const [email, setEmail] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setEmail(selectedUser?.email)
    setIsActive(selectedUser?.isActive)
    setIsAdmin(selectedUser?.isAdmin)
  }, [selectedUser]);
  async function onClickSpeichern(){
    let response = await apiUpdateUser(selectedUser.id, {email, isActive, isAdmin})
    console.log(response);
  }

  if (!selectedUser) {
    return <p className="text-gray-600">Kein Benutzer ausgewählt.</p>;

  }

  return (
    
    <div className="edit-container p-4 border rounded-lg shadow-md bg-white">
      {email}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Erstelldatum:</label>
        <p className="mt-1 text-gray-500">{new Date().toLocaleString()}</p>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={isActive}
          
        />
        <label className="ml-2 text-sm font-medium text-gray-700">Aktiv</label>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={isAdmin}
         
        />
        <label className="ml-2 text-sm font-medium text-gray-700">Admin</label>
      </div>

      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          onClick={()=>onClickSpeichern()}
        >
          Speichern
        </button>
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          
        >
          Löschen
        </button>
      </div>
    </div>
  );
}

export default UserEdit;
