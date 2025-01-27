import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch user");
          return response.json();
        })
        .then((data) => setFormData(data))
        .catch((err) => setError(err.message));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = `https://jsonplaceholder.typicode.com/users${id ? `/${id}` : ""}`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success(`User ${id ? "updated" : "added"} successfully!`);
          navigate("/");
        } else {
          throw new Error(`Failed to ${id ? "update" : "add"} user`);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                value={formData.company.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: { ...formData.company, name: e.target.value },
                  })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {id ? "Update" : "Add"} User
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserForm;
