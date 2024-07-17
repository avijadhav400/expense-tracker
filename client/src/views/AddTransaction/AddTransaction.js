import React, { useEffect, useState } from "react";
import "./AddTransaction.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AddTransaction() {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("debit");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      window.location.href = "/login";
    }
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const addTransaction = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/transaction`,
      {
        title,
        amount,
        type,
        category,
        user: user._id,
      }
    );
    toast.success(response.data.message);
    setTitle("");
    setAmount("");
    setCategory("");
    setType("");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div>
      <h1 className="form-heading">Add Transaction For {user.fullName}</h1>
      <form className="form">
        <input
          type="text"
          placeholder="Title"
          className="user-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="user-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="user-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Type</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <select
          className="user-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="clothing">Clothing</option>
          <option value="utilities">Utilities</option>
          <option value="shopping">Shopping</option>
          <option value="learning">Learning</option>
          <option value="health">Health</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="salary">Salary</option>
          <option value="other">Other</option>
        </select>

        <button type="button" className="auth-btn" onClick={addTransaction}>
          Add Transaction
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default AddTransaction;
