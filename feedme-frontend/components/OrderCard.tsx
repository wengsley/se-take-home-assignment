import { Order } from '@/lib/store';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const bgColor = order.type === 'VIP' ? 'bg-yellow-100 border-yellow-400' : 'bg-blue-100 border-blue-400';
  const textColor = order.type === 'VIP' ? 'text-yellow-800' : 'text-blue-800';
  
  return (
    <div className={`p-4 rounded-lg border-2 ${bgColor} ${textColor} shadow-md`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-lg">
            {order.type} Order #{order.id}
          </div>
          <div className="text-sm opacity-75">
            Status: {order.status}
          </div>
        </div>
        {order.type === 'VIP' && (
          <div className="text-2xl">⭐</div>
        )}
      </div>
    </div>
  );
}

