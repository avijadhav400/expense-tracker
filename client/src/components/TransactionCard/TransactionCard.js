import React from "react";
import axios from 'axios'
import "./TransactionCard.css";
import toast, {Toaster} from "react-hot-toast";

function TransactionCard({ _id, title, amount, category, type, createdAt, loadTransactions }) {

  const deleteTransaction = async()=>{

    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${_id}`)
    toast.success(response.data.message)
    loadTransactions()

  }

  return (
    <div className="transaction-card">
      <h2 className="transaction-card-title">{title}</h2>
      <span className="transaction-card-date">
        {new Date(createdAt).toLocaleString()}
      </span>
      <span className="transaction-card-category">{category}</span>
      <p
        className="transaction-card-amount"
        style={{ color: type === "credit" ? "green" : "red" }}
      >
        {type === "credit" ? "+" : "-"}
        {amount}
      </p>
      <button 
      className="delete-transaction-btn"
      onClick={deleteTransaction}
      >Delete</button>
      <Toaster/>
    </div>
  );
}

export default TransactionCard;
