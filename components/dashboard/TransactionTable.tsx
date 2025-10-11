'use client';

import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Transaction } from '@/types';
import Badge from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';

interface TransactionTableProps {
  transactions: Transaction[];
}

type SortField = keyof Transaction;
type SortDirection = 'asc' | 'desc';

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortField(null);
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-2 font-medium text-gray-700 hover:text-gray-900 uppercase text-xs"
    >
      {children}
      <ArrowUpDown className="h-4 w-4" />
    </button>
  );

  return (
    <div className="overflow-hidden rounded-xl border-b border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-white">
            <tr>
              <th className="px-6 py-3 text-left">
                <SortButton field="payerName">Payer Name</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="date">Date</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="amount">Amount</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="status">Status</SortButton>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.payerName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-6 py-4">
                  <Badge status={transaction.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}