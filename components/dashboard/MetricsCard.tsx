import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export default function MetricCard({ title, value }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-start gap-6">
          <Image src='/images/currency.png' width={32} height={32} alt='currency'/>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {formatCurrency(value)}
          </p>
        </div>
      </div>
    </Card>
  );
}