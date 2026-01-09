'use client';

import { useEffect, useRef } from 'react';
import { useOrderStore } from '@/lib/store';
import OrderArea from '@/components/OrderArea';
import BotStatus from '@/components/BotStatus';

export default function Home() {
  const {
    orders,
    bots,
    isLoading,
    error,
    initialize,
    createNormalOrder,
    createVIPOrder,
    addBot,
    removeBot,
  } = useOrderStore();

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initialize();
    }
  }, [initialize]);

  const handleCreateNormal = async () => {
    await createNormalOrder();
  };

  const handleCreateVIP = async () => {
    await createVIPOrder();
  };

  const handleAddBot = async () => {
    await addBot();
  };

  const handleRemoveBot = async () => {
    await removeBot();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🍔 McDonald&apos;s Order Management System
        </h1>

        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-800 p-4 rounded-lg mb-6">
            Error: {error}
          </div>
        )}

        {/* Control Buttons */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-2 border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Controls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={handleCreateNormal}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              New Normal Order
            </button>
            <button
              onClick={handleCreateVIP}
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              New VIP Order ⭐
            </button>
            <button
              onClick={handleAddBot}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Bot
            </button>
            <button
              onClick={handleRemoveBot}
              disabled={isLoading || bots.length === 0}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              - Bot
            </button>
          </div>
        </div>

        {/* Bot Status */}
        <div className="mb-6">
          <BotStatus bots={bots} />
        </div>

        {/* Order Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OrderArea
            title="PENDING"
            orders={orders}
            status="PENDING"
            bgColor="bg-yellow-50"
            borderColor="border-yellow-300"
          />
          <OrderArea
            title="PROCESSING"
            orders={orders}
            status="PROCESSING"
            bgColor="bg-blue-50"
            borderColor="border-blue-300"
          />
          <OrderArea
            title="COMPLETE"
            orders={orders}
            status="COMPLETE"
            bgColor="bg-green-50"
            borderColor="border-green-300"
          />
        </div>

        {isLoading && (
          <div className="text-center mt-6 text-gray-600">Loading...</div>
        )}
      </div>
    </main>
  );
}

