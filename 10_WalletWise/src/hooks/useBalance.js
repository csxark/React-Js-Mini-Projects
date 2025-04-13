// src/hooks/useBalance.js
import { useState } from 'react';

export const useBalance = () => {
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [showMinBalanceDialog, setShowMinBalanceDialog] = useState(false);
  const [tempBalance, setTempBalance] = useState("");
  const [tempMinBalance, setTempMinBalance] = useState("");

  return {
    showBalanceDialog,
    setShowBalanceDialog,
    showMinBalanceDialog,
    setShowMinBalanceDialog,
    tempBalance,
    setTempBalance,
    tempMinBalance,
    setTempMinBalance
  };
};