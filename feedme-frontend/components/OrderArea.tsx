import { Order } from '@/lib/store';
import OrderCard from './OrderCard';

interface OrderAreaProps {
  title: string;
  orders: Order[];
  status: 'PENDING' | 'PROCESSING' | 'COMPLETE';
  bgColor: string;
  borderColor: string;
}

export default function OrderArea({ title, orders, status, bgColor, borderColor }: OrderAreaProps) {
  const filteredOrders = orders.filter(order => order.status === status);
  
  return (
    <div className={`flex-1 p-6 rounded-lg ${bgColor} border-2 ${borderColor} min-h-[400px]`}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No orders</div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}

