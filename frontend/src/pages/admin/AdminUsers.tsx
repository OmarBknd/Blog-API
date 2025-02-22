import { useEffect, useState } from "react";
import { adminFetchUsers } from "../../api/admin";
import { format } from "date-fns";
import { User } from "../../types";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    adminFetchUsers()
      .then((data) => setUsers(data.users))
      .catch((err) => console.error(err));
  }, []);
 const handleTimeFormat = (date:string) =>{
   return format(new Date(date),` eeee dd/MM/yyyy 'at' hh:mm aaa`)
 }
  
  return (
    <div className="p-6 dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <ul className="space-y-2 dark:bg-gray-700">
        {users.map((user) => (
          <li key={user.id} className="p-2 border rounded">
            {user.firstName} {user.lastName} - {user.email} 
            <p>Created at {handleTimeFormat(user.createdAt)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
