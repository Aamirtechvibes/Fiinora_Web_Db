import { createContext, useContext, ReactNode } from 'react';
import { convertUSDToINR } from '../utils/currency';

export interface Account {
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  change: number;
  bank: string;
  accountNumber: string;
  interest?: number;
  ytdReturn?: number;
  limit?: number;
}

export interface BudgetCategory {
  category: string;
  budgeted: number;
  spent: number;
  color: string;
}

export interface PortfolioHolding {
  symbol: string;
  name: string;
  shares: number;
  currentPrice: number;
  totalValue: number;
  change: number;
  allocation: number;
}

export interface SavingsGoal {
  name: string;
  target: number;
  current: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

export interface DebtAccount {
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
  payoffDate: string;
}

export interface FinancialData {
  accounts: Account[];
  budgetCategories: BudgetCategory[];
  portfolioHoldings: PortfolioHolding[];
  savingsGoals: SavingsGoal[];
  debtAccounts: DebtAccount[];
  monthlyIncome: number;
  monthlyExpenses: number;
}

const FinancialContext = createContext<FinancialData | undefined>(undefined);

const initialFinancialData: FinancialData = {
  accounts: [
    { 
      name: 'HDFC Bank Savings', 
      balance: convertUSDToINR(4850.42), 
      type: 'checking', 
      change: +convertUSDToINR(325.30), 
      bank: 'HDFC',
      accountNumber: '****7842',
      interest: 3.5
    },
    { 
      name: 'Fixed Deposit Account', 
      balance: convertUSDToINR(15850.89), 
      type: 'savings', 
      change: +convertUSDToINR(420.15), 
      bank: 'SBI',
      accountNumber: '****2156',
      interest: 7.0
    },
    { 
      name: 'ICICI Credit Card', 
      balance: -convertUSDToINR(1845.67), 
      type: 'credit', 
      change: -convertUSDToINR(127.45), 
      bank: 'ICICI',
      accountNumber: '****8923',
      limit: convertUSDToINR(15000)
    },
    { 
      name: 'Zerodha Portfolio', 
      balance: convertUSDToINR(12350.23), 
      type: 'investment', 
      change: +convertUSDToINR(678.18), 
      bank: 'Zerodha',
      accountNumber: '****3401',
      ytdReturn: 8.7
    },
    { 
      name: 'Emergency Fund', 
      balance: convertUSDToINR(8200.00), 
      type: 'savings', 
      change: +convertUSDToINR(150.00), 
      bank: 'Axis Bank',
      accountNumber: '****9876',
      interest: 6.5
    },
  ],
  budgetCategories: [
    { category: 'Food & Dining', budgeted: convertUSDToINR(500), spent: convertUSDToINR(425), color: '#8884d8' },
    { category: 'Transportation', budgeted: convertUSDToINR(200), spent: convertUSDToINR(180), color: '#82ca9d' },
    { category: 'Entertainment', budgeted: convertUSDToINR(150), spent: convertUSDToINR(195), color: '#ffc658' },
    { category: 'Shopping', budgeted: convertUSDToINR(300), spent: convertUSDToINR(250), color: '#ff7300' },
    { category: 'Bills & Utilities', budgeted: convertUSDToINR(800), spent: convertUSDToINR(785), color: '#0088fe' },
  ],
  portfolioHoldings: [
    { symbol: 'RELIANCE', name: 'Reliance Industries', shares: 25, currentPrice: convertUSDToINR(185.43), totalValue: convertUSDToINR(4635.75), change: 2.4, allocation: 20.8 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', shares: 15, currentPrice: convertUSDToINR(248.50), totalValue: convertUSDToINR(3727.50), change: -1.2, allocation: 16.7 },
    { symbol: 'INFY', name: 'Infosys Limited', shares: 12, currentPrice: convertUSDToINR(412.80), totalValue: convertUSDToINR(4953.60), change: 1.8, allocation: 22.2 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', shares: 8, currentPrice: convertUSDToINR(445.20), totalValue: convertUSDToINR(3561.60), change: 4.5, allocation: 16.0 },
    { symbol: 'NIFTYBEES', name: 'Nifty 50 ETF', shares: 35, currentPrice: convertUSDToINR(418.50), totalValue: convertUSDToINR(14647.50), change: 0.9, allocation: 24.3 },
  ],
  savingsGoals: [
    { 
      name: 'Emergency Fund', 
      target: convertUSDToINR(10000), 
      current: convertUSDToINR(6500), 
      deadline: '2025-12-31',
      priority: 'high'
    },
    { 
      name: 'Vacation to Europe', 
      target: convertUSDToINR(3500), 
      current: convertUSDToINR(1200), 
      deadline: '2025-07-15',
      priority: 'medium'
    },
    { 
      name: 'New Car Down Payment', 
      target: convertUSDToINR(8000), 
      current: convertUSDToINR(2400), 
      deadline: '2026-03-01',
      priority: 'low'
    },
  ],
  debtAccounts: [
    {
      name: 'Credit Card - ICICI',
      balance: convertUSDToINR(2450),
      minPayment: convertUSDToINR(75),
      interestRate: 18.24,
      payoffDate: '2026-02-15'
    },
    {
      name: 'Education Loan',
      balance: convertUSDToINR(15680),
      minPayment: convertUSDToINR(180),
      interestRate: 9.5,
      payoffDate: '2032-08-20'
    },
    {
      name: 'Car Loan',
      balance: convertUSDToINR(8920),
      minPayment: convertUSDToINR(320),
      interestRate: 8.5,
      payoffDate: '2027-11-10'
    },
  ],
  monthlyIncome: convertUSDToINR(6800),
  monthlyExpenses: convertUSDToINR(4390),
};

export function FinancialContextProvider({ children }: { children: ReactNode }) {
  return (
    <FinancialContext.Provider value={initialFinancialData}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancialContext() {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancialContext must be used within a FinancialContextProvider');
  }
  return context;
}
