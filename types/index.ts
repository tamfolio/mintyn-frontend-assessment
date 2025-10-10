// Authentication types
export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  // Transaction types
  export type TransactionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
  
  export interface Transaction {
    id: string;
    payerName: string;
    date: string;
    amount: number;
    status: TransactionStatus;
  }
  
  // Metrics types
  export interface DashboardMetrics {
    salesValue: number;
    commissionsEarned: number;
  }