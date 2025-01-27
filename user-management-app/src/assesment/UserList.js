import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch users");
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
          toast.success("User deleted successfully!");
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body">
          <button
            onClick={() => navigate("/add")}
            className="btn btn-success mb-3"
          >
            Add User
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name.split(" ")[0]}</td>
                  <td>{user.name.split(" ")[1]}</td>
                  <td>{user.email}</td>
                  <td>{user.company.name}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/edit/${user.id}`)}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserList;
