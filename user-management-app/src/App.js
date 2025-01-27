import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from "./assesment/UserList";
import UserForm from "./assesment/UserForm";

function App() {
  return (
    <Router>
      <div className="container py-5">
        <div className="card shadow">
          <div className="card-body">
            <h1 className="text-center text-primary mb-4">User Management App</h1>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/add" element={<UserForm />} />
              <Route path="/edit/:id" element={<UserForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;