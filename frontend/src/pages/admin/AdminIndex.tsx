import { Link } from "react-router-dom";

const AdminIndex = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="space-y-2">
        <Link to="/admin-dashboard/users" className="block p-2  rounded">
          Manage Users
        </Link>
        <Link to="/admin-dashboard/posts" className="block p-2   rounded">
          Manage Posts
        </Link>
        <Link to="/admin-dashboard/comments" className="block p-2   rounded">
          Manage Comments
        </Link>
      </div>
    </div>
  );
};

export default AdminIndex;
