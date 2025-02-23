import { useEffect, useState } from "react";
import { adminFetchUsers, adminPromoteuser, adminDemoteuser } from "../../api/admin";
import { format } from "date-fns";
import { User } from "../../types";
import toast from "react-hot-toast";
const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    adminFetchUsers()
      .then((data) => setUsers(data.users))
      .catch((err) => console.error(err));
  }, []);

  const handleTimeFormat = (date: string) => {
    return format(new Date(date), `eeee dd/MM/yyyy 'at' hh:mm aaa`);
  };

  const handlePromote = async (userId: string) => {
    try {
      await adminPromoteuser(userId);
      setUsers(users.map(user => (user.id === userId ? { ...user, role: "ADMIN" } : user)));
      toast(<div className="flex items-center">
        <span role="img" >😺</span>
        User Promoted to Admin
      </div>)
    } catch (error) {
      console.error("Error promoting user:", error);
    }
  };

  const handleDemote = async (userId: string) => {
    try {
      await adminDemoteuser(userId);
      setUsers(users.map(user => (user.id === userId ? { ...user, role: "USER" } : user)));
      toast(<div className="flex items-center">
        <span role="img" >😿</span>
        User Promoted to Admin
      </div>)
    } catch (error) {
      console.error("Error demoting user:", error);
    }
  };

  return (
    <div className="p-6 dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <ul className="space-y-2 dark:bg-gray-700">
        {users.map((user) => (
          <li key={user.id} className="p-4 border rounded flex flex-col gap-2 bg-gray-100 dark:bg-gray-900">
            <p className="font-semibold">{user.firstName} {user.lastName} - {user.email}</p>
            <p className="text-sm">Role: <span className="font-bold">{user.role}</span></p>
            <p className="text-xs text-gray-500">Created at {handleTimeFormat(user.createdAt)}</p>
            <div className="flex gap-2">
              {user.role !== "ADMIN" && (
                <button
                  onClick={() => handlePromote(user.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Promote
                </button>
              )}
              {user.role === "ADMIN" && (
                <button
                  onClick={() => handleDemote(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Demote
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
