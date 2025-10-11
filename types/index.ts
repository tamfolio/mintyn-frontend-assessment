
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
  
  export type TransactionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
  
  export interface Transaction {
    id: string;
    payerName: string;
    date: string;
    amount: number;
    currency?: string;
    status: TransactionStatus;
  }
  
  export interface ApiTransaction {
    player_name: string;
    date: string;
    amount: number;
    currency: string;
    status: string; 
  }
  
  export interface DashboardStats {
    salesValue: number;
    commissionsEarned: number;
    currency?: string;
  }
  
  export interface ApiDashboardStats {
    sales_value: number;
    commission_earned: number;
    currency: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message: string;
    error: string | null;
  }