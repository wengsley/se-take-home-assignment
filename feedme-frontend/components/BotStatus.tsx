import { Bot } from '@/lib/store';

interface BotStatusProps {
  bots: Bot[];
}

export default function BotStatus({ bots }: BotStatusProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-300">
      <h3 className="text-xl font-bold mb-3 text-gray-800">Bot Status</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {bots.length === 0 ? (
          <div className="col-span-full text-gray-500 text-center py-4">No bots</div>
        ) : (
          bots.map(bot => (
            <div
              key={bot.id}
              className={`p-3 rounded-lg border-2 ${
                bot.status === 'PROCESSING'
                  ? 'bg-green-100 border-green-400'
                  : 'bg-gray-200 border-gray-400'
              }`}
            >
              <div className="font-bold">Bot #{bot.id}</div>
              <div className="text-sm">
                {bot.status === 'PROCESSING' ? (
                  <span className="text-green-700">🔄 Processing</span>
                ) : (
                  <span className="text-gray-600">💤 Idle</span>
                )}
              </div>
              {bot.currentOrderId && (
                <div className="text-xs mt-1 text-gray-600">
                  Order #{bot.currentOrderId}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Total: {bots.length} | Active: {bots.filter(b => b.status === 'PROCESSING').length} | Idle: {bots.filter(b => b.status === 'IDLE').length}
      </div>
    </div>
  );
}

