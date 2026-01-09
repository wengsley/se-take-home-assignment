import { create } from 'zustand';
import { orderAPI, botAPI, statusAPI, authAPI } from './api';

export interface Order {
  id: number;
  type: 'NORMAL' | 'VIP';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETE';
  createdAt: string;
}

export interface Bot {
  id: number;
  status: 'IDLE' | 'PROCESSING';
  currentOrderId: number | null;
}

interface OrderStore {
  orders: Order[];
  bots: Bot[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchStatus: () => Promise<void>;
  createNormalOrder: () => Promise<void>;
  createVIPOrder: () => Promise<void>;
  addBot: () => Promise<void>;
  removeBot: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  bots: [],
  isLoading: false,
  error: null,

  fetchStatus: async () => {
    try {
      set({ isLoading: true, error: null });
      const status = await statusAPI.get();
      set({
        orders: status.orders.list || [],
        bots: status.bots.list || [],
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch status',
        isLoading: false,
      });
    }
  },

  createNormalOrder: async () => {
    try {
      set({ error: null });
      await orderAPI.createNormal();
      await get().fetchStatus();
    } catch (error: any) {
      set({ error: error.message || 'Failed to create normal order' });
    }
  },

  createVIPOrder: async () => {
    try {
      set({ error: null });
      await orderAPI.createVIP();
      await get().fetchStatus();
    } catch (error: any) {
      set({ error: error.message || 'Failed to create VIP order' });
    }
  },

  addBot: async () => {
    try {
      set({ error: null });
      await botAPI.add();
      await get().fetchStatus();
    } catch (error: any) {
      set({ error: error.message || 'Failed to add bot' });
    }
  },

  removeBot: async () => {
    try {
      set({ error: null });
      await botAPI.remove();
      await get().fetchStatus();
    } catch (error: any) {
      set({ error: error.message || 'Failed to remove bot' });
    }
  },

  initialize: async () => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Auto-login for demo purposes
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        await authAPI.login('demo', 'demo');
      }
      await get().fetchStatus();
      
      // Set up polling for real-time updates (only if not already polling)
      if (!(window as any).__orderPolling) {
        (window as any).__orderPolling = setInterval(() => {
          get().fetchStatus();
        }, 1000); // Poll every second
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to initialize' });
    }
  },
}));

