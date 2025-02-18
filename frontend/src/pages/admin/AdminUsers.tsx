import { useEffect, useState } from "react";
import { adminFetchUsers } from "../../api/admin";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    adminFetchUsers()
      .then((data) => setUsers(data.users))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 border rounded">
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
