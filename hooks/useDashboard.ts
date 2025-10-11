import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/lib/api';
import { DashboardStats, Transaction, ApiResponse, ApiTransaction, ApiDashboardStats } from '@/types';


function transformStats(data: ApiDashboardStats): DashboardStats {
  return {
    salesValue: data.sales_value || 0,
    commissionsEarned: data.commission_earned  || 0,
  };
}


function transformTransactions(data: ApiTransaction[]): Transaction[] {
  return data.map((transaction, index) => ({
    id: `${transaction.player_name}-${transaction.date}-${index}`,
    payerName: transaction.player_name,
    date: transaction.date,
    amount: transaction.amount,
    currency: transaction.currency,
    status: transaction.status.toUpperCase() as 'PENDING' | 'APPROVED' | 'REJECTED',
  }));
}


export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => fetchData<ApiResponse<ApiDashboardStats>>('/dashboard/stats'),
    select: (response) => transformStats(response.data),
  });
}


export function useDashboardTransactions() {
  return useQuery({
    queryKey: ['dashboard', 'transactions'],
    queryFn: () => fetchData<ApiResponse<ApiTransaction[]>>('/dashboard/transactions'),
    select: (response) => transformTransactions(response.data),
  });
}