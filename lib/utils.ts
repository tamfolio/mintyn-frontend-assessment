import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `₦${new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

export function formatDate(dateString: string): string {
    if (!dateString) return "Invalid Date";
  
    // detect dd/mm/yyyy format
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  
    // fallback for ISO or other formats
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime())
      ? "Invalid Date"
      : parsed.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
  }
  

export function getStatusColor(status: string): string {
  const colors = {
    PENDING: 'bg-orange-100 text-orange-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
}