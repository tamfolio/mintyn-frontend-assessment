'use client';

import { DollarSign, TrendingUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MetricCard from '@/components/dashboard/MetricsCard';
import TransactionTable from '@/components/dashboard/TransactionTable';
import { Transaction } from '@/types';

// Mock data - will be replaced with API calls
const mockTransactions: Transaction[] = [
  {
    id: '1',
    payerName: 'James Ibori',
    date: '2025-09-08',
    amount: 20000,
    status: 'PENDING',
  },
  {
    id: '2',
    payerName: 'Mark Spencer',
    date: '2025-12-01',
    amount: 200000,
    status: 'PENDING',
  },
  {
    id: '3',
    payerName: 'Lola Rubis',
    date: '2025-12-12',
    amount: 607000,
    status: 'PENDING',
  },
  {
    id: '4',
    payerName: 'Simon Effiong',
    date: '2025-10-12',
    amount: 560000,
    status: 'PENDING',
  },
  {
    id: '5',
    payerName: 'Kate Wilson',
    date: '2025-09-02',
    amount: 70000,
    status: 'APPROVED',
  },
  {
    id: '6',
    payerName: 'Peter Marcus',
    date: '2025-09-11',
    amount: 100000,
    status: 'APPROVED',
  },
  {
    id: '7',
    payerName: 'Josh Egger',
    date: '2025-09-08',
    amount: 240000,
    status: 'APPROVED',
  },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <div className="flex items-center gap-4">
          <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Aug 15, 2025</span>
            <span>-</span>
            <span>Aug 15, 2025</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <MetricCard
          title="Sales value"
          value={230000000}
          icon={<DollarSign className="h-6 w-6" />}
        />
        <MetricCard
          title="Commissions earned"
          value={200000}
          icon={<TrendingUp className="h-6 w-6" />}
        />
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          <Link
            href="/dashboard/transactions"
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            See all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <TransactionTable transactions={mockTransactions} />
      </div>
    </div>
  );
}