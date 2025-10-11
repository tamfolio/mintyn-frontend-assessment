"use client";

import { DollarSign, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import MetricCard from "@/components/dashboard/MetricsCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import {
  useDashboardStats,
  useDashboardTransactions,
} from "@/hooks/useDashboard";

export default function DashboardHomePage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: transactions, isLoading: transactionsLoading } =
    useDashboardTransactions();

  return (
    <div className="space-y-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <div className="flex items-center gap-4">
          <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <div className="flex">
            <button className="flex items-center gap-2 rounded-bl-lg rounded-tl-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-gray-400 ">
              <span>Aug 15, 2025</span>
            </button>
            <button className="flex items-center gap-2 rounded-br-lg rounded-tr-lg border  border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-gray-400 ">
              <span>Aug 15, 2025</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics */}
      {statsLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Skeleton Card 1 */}
          <div className="h-32 rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-40 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
          {/* Skeleton Card 2 */}
          <div className="h-32 rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-8 w-36 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <MetricCard
            title="Sales value"
            value={stats?.salesValue || 0}
            icon={<DollarSign className="h-6 w-6" />}
          />
          <MetricCard
            title="Commissions earned"
            value={stats?.commissionsEarned || 0}
            icon={<TrendingUp className="h-6 w-6" />}
          />
        </div>
      )}

      {/* Transaction History */}
      <div className="space-y-4 rounded-xl border border-border-gray2 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Transaction History
          </h2>
          <Link
            href="/dashboard/transactions"
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 border py-1 px-2 border-border-gray rounded-sm"
          >
            See all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {transactionsLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="animate-pulse">
              {/* Table Header Skeleton */}
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
              </div>
              {/* Table Rows Skeleton */}
              {[...Array(7)].map((_, i) => (
                <div key={i} className="border-b border-gray-200 px-6 py-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="h-4 bg-gray-100 rounded w-32" />
                    <div className="h-4 bg-gray-100 rounded w-24" />
                    <div className="h-4 bg-gray-100 rounded w-20" />
                    <div className="h-4 bg-gray-100 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <TransactionTable transactions={transactions || []} />
        )}
      </div>
    </div>
  );
}
