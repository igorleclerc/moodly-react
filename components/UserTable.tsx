'use client';

import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nom</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Prénom</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Rôle</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap">{user.lastName}</td>
              <td className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap">{user.firstName}</td>
              <td className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap">{user.email}</td>
              <td className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap">{user.role}</td>
              <td className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onEdit(user.id)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(user.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;