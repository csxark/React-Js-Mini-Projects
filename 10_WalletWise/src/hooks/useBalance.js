// src/hooks/useBalance.js
import { useState } from 'react';

export const useBalance = () => {
  const [balance, setBalance] = useState(1250);
  const [tempBalance, setTempBalance] = useState("");
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [savings, setSavings] = useState(250);
  const [goalProgress, setGoalProgress] = useState(25);
  const [minMonthlyBalance, setMinMonthlyBalance] = useState(1000);
  const [showMinBalanceDialog, setShowMinBalanceDialog] = useState(false);
  const [tempMinBalance, setTempMinBalance] = useState("");

  // Handle setting minimum monthly balance
  const handleSetMinBalance = () => {
    if (tempMinBalance) {
      setMinMonthlyBalance(parseFloat(tempMinBalance));
      setTempMinBalance("");
      setShowMinBalanceDialog(false);
    }
  };
  
  // Handle editing available balance
  const handleEditBalance = () => {
    if (tempBalance) {
      setBalance(parseFloat(tempBalance));
      setTempBalance("");
      setShowBalanceDialog(false);
    }
  };

  return {
    balance,
    setBalance,
    savings,
    setSavings,
    goalProgress,
    setGoalProgress,
    minMonthlyBalance,
    showBalanceDialog,
    setShowBalanceDialog,
    tempBalance,
    setTempBalance,
    showMinBalanceDialog,
    setShowMinBalanceDialog,
    tempMinBalance,
    setTempMinBalance,
    handleEditBalance,
    handleSetMinBalance
  };
};