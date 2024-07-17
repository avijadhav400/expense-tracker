import React, { useEffect, useState } from "react";
import "./Home.css";
import toast, { Toaster } from "react-hot-toast";
import {Link} from 'react-router-dom'
import axios from "axios";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import AddImg from './add.png'

function Home() {
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      setUser(currentUser);
    }

    if (!currentUser) {
      window.location.href = "/login";
    }
  }, []);

  const loadTransactions = async () => {
    if (!user._id) return;

    toast.loading("Loading transactions...");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`
    );
    toast.dismiss();
    setTransactions(response.data.data);
  };

  useEffect(() => {
    let income = 0;
    let expense = 0;
    transactions.map((transaction) => {
      if (transaction.type === "credit") {
        income += transaction.amount;
      }
      else{
        expense += transaction.amount
      }
    });

    setNetIncome(income)
    setNetExpense(expense)
  }, [transactions]);

  useEffect(() => {
    loadTransactions();
  }, [user]);
  return (
    <div>
      <h1 className="home-greeting">Hello! {user.fullName}</h1>
      <h2 className="home-heading">Welcome to the Expense Tracker </h2>
      <div className="main-div-transaction-calculator">
        <div className="transactions-calculator">
          <div className="net-income-amount">+{netIncome}</div>
          <div>Net Income</div>
        </div>
        <div className="transactions-calculator">
          <div className="net-expense-amount">-{netExpense}</div>
          <div>Net Expense</div>
        </div>
        <div className="transactions-calculator">
          <div className="net-total-balance">₹{netIncome - netExpense}</div>
          <div>Net Balance</div>
        </div>
      </div>

      <span
        className="home-logout"
        onClick={() => {
          localStorage.clear();
          setTimeout(() => {
            
            window.location.href = "/login";
          }, 1000);
        
          toast.success("Logged out successfully");
        }}
      >
        Logout
      </span>

<div className="transactions-container">
      {transactions.map((transaction) => {
        const { _id, title, amount, category, type, createdAt } = transaction;

        return (
          <TransactionCard
            key={_id}
            _id={_id}
            title={title}
            amount={amount}
            category={category}
            type={type}
            createdAt={createdAt}
            loadTransactions={loadTransactions}
          />
        );
      })}
      </div>
      <Link to="/add">
      <img src={AddImg} alt="img" className="add-wallet-img"/>
      </Link>
      <Toaster />
    </div>
  );
}

export default Home;
