import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type PriceMode = 'default' | 'safe' | 'reversed';
export type OrderSide = 'Buy' | 'Sell';
export type OrderStatus = 'Open' | 'Completed' | 'Cancelled';
export type ListingStatus = 'Active' | 'Paused' | 'Draft' | 'Sold';

export type Asset = {
  symbol: string;
  name: string;
  exchange: string;
  category: 'Equity' | 'Index' | 'ETF' | 'Gold';
  price: number;
  changePercent: number;
};
export type Holding = { symbol: string; quantity: number; averagePrice: number };
export type Order = {
  id: string;
  symbol: string;
  name: string;
  side: OrderSide;
  quantity: number;
  price: number;
  total: number;
  orderType: 'Market' | 'Limit';
  status: OrderStatus;
  createdAt: string;
};
export type Transaction = {
  id: string;
  type: 'Buy' | 'Sell' | 'Deposit' | 'Withdrawal' | 'Marketplace';
  title: string;
  detail: string;
  amount: number;
  createdAt: string;
  status: 'Completed' | 'Pending';
};
export type ProductListing = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  seller: string;
  sellerEmail: string;
  sellerRating: number;
  location: string;
  status: ListingStatus;
  views: number;
  ordersCount: number;
  mine: boolean;
};

export const ASSETS: Asset[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', exchange: 'NSE', category: 'Equity', price: 1484.9, changePercent: 1.84 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', exchange: 'NSE', category: 'Equity', price: 1722.35, changePercent: 0.72 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', category: 'Equity', price: 3890.2, changePercent: -0.46 },
  { symbol: 'INFY', name: 'Infosys', exchange: 'NSE', category: 'Equity', price: 1846.7, changePercent: 1.12 },
  { symbol: 'NIFTY 50', name: 'Nifty 50', exchange: 'NSE', category: 'Index', price: 24872.3, changePercent: 0.54 },
  { symbol: 'BANKNIFTY', name: 'Nifty Bank', exchange: 'NSE', category: 'Index', price: 53642.15, changePercent: -0.21 },
  { symbol: 'NIFTYBEES', name: 'Nippon India ETF Nifty 50', exchange: 'NSE', category: 'ETF', price: 284.16, changePercent: 0.38 },
  { symbol: 'GOLDBEES', name: 'Nippon India ETF Gold BeES', exchange: 'NSE', category: 'Gold', price: 75.82, changePercent: 0.91 },
];

export const MARKETPLACE_PRODUCTS: ProductListing[] = [
  { id: 'prd-1', name: 'Nifty 50 ETF units', category: 'ETF', description: 'A small lot of Nifty 50 ETF units from a verified demo seller. A simple way to explore the marketplace experience.', price: 284.16, quantity: 120, seller: 'Meera K.', sellerEmail: 'meera@market.demo', sellerRating: 4.9, location: 'Mumbai, Maharashtra', status: 'Active', views: 84, ordersCount: 7, mine: false },
  { id: 'prd-2', name: 'Digital Gold units', category: 'Gold', description: 'Fractional digital gold units offered in this simulated client demo. All orders are local and do not represent a real investment.', price: 75.82, quantity: 240, seller: 'Arjun R.', sellerEmail: 'arjun@market.demo', sellerRating: 4.8, location: 'Bengaluru, Karnataka', status: 'Active', views: 62, ordersCount: 4, mine: false },
  { id: 'prd-3', name: 'Short-duration bond basket', category: 'Bonds', description: 'A demo listing for a diversified short-duration bond basket. Review the description and seller details before placing a simulated order.', price: 1025, quantity: 48, seller: 'Nisha S.', sellerEmail: 'nisha@market.demo', sellerRating: 4.7, location: 'Pune, Maharashtra', status: 'Active', views: 51, ordersCount: 3, mine: false },
  { id: 'prd-4', name: 'Large-cap starter basket', category: 'Basket', description: 'A curated large-cap sample basket for exploring product discovery and simulated checkout.', price: 2500, quantity: 30, seller: 'Dev P.', sellerEmail: 'dev@market.demo', sellerRating: 5, location: 'New Delhi', status: 'Active', views: 96, ordersCount: 11, mine: false },
];

export type AppData = {
  balance: number;
  holdings: Holding[];
  orders: Order[];
  transactions: Transaction[];
  listings: ProductListing[];
  watchlist: string[];
  marketplacePurchases: Record<string, number>;
  priceMode: PriceMode;
  userName: string;
  userEmail: string;
  signedIn: boolean;
  notificationsEnabled: boolean;
};

const STORAGE_KEY = 'citron-demo-state-v1';
const sampleNow = 'Today, 10:32 am';
const initialData: AppData = {
  balance: 254612.4,
  holdings: [
    { symbol: 'RELIANCE', quantity: 12, averagePrice: 1433.23 },
    { symbol: 'HDFCBANK', quantity: 18, averagePrice: 1664.9 },
    { symbol: 'TCS', quantity: 5, averagePrice: 3914.1 },
    { symbol: 'NIFTYBEES', quantity: 42, averagePrice: 276.5 },
  ],
  orders: [
    { id: 'ORD-82143', symbol: 'INFY', name: 'Infosys', side: 'Buy', quantity: 4, price: 1832, total: 7328, orderType: 'Limit', status: 'Open', createdAt: 'Today, 9:48 am' },
    { id: 'ORD-82018', symbol: 'RELIANCE', name: 'Reliance Industries', side: 'Buy', quantity: 2, price: 1471.5, total: 2943, orderType: 'Market', status: 'Completed', createdAt: 'Yesterday, 2:12 pm' },
    { id: 'ORD-81966', symbol: 'TCS', name: 'Tata Consultancy Services', side: 'Sell', quantity: 1, price: 3910, total: 3910, orderType: 'Market', status: 'Completed', createdAt: 'Yesterday, 11:06 am' },
  ],
  transactions: [
    { id: 'TXN-2501', type: 'Buy', title: 'Bought Reliance Industries', detail: '2 shares · Market order', amount: -2943, createdAt: 'Yesterday, 2:12 pm', status: 'Completed' },
    { id: 'TXN-2498', type: 'Sell', title: 'Sold Tata Consultancy Services', detail: '1 share · Market order', amount: 3910, createdAt: 'Yesterday, 11:06 am', status: 'Completed' },
    { id: 'TXN-2471', type: 'Deposit', title: 'Added funds', detail: 'UPI · Demo transaction', amount: 15000, createdAt: '18 Sep, 4:21 pm', status: 'Completed' },
  ],
  listings: [],
  watchlist: ['RELIANCE', 'HDFCBANK', 'INFY'],
  marketplacePurchases: {},
  priceMode: 'default',
  userName: 'Ananya',
  userEmail: 'demo@citron.app',
  signedIn: false,
  notificationsEnabled: true,
};

type NewListing = Pick<ProductListing, 'name' | 'category' | 'description' | 'price' | 'quantity' | 'location'> & { id?: string; status?: ListingStatus };
type OrderRequest = { symbol: string; side: OrderSide; quantity: number; orderType: 'Market' | 'Limit'; limitPrice?: number };

type ContextValue = {
  data: AppData;
  quotes: Asset[];
  ready: boolean;
  storageAvailable: boolean;
  toggleWatchlist: (symbol: string) => void;
  placeOrder: (request: OrderRequest) => Order;
  cancelOrder: (id: string) => void;
  buyProduct: (product: ProductListing) => void;
  availableQuantity: (product: ProductListing) => number;
  createListing: (listing: NewListing) => void;
  updateListing: (listing: NewListing & { id: string }) => void;
  updateListingStatus: (id: string, status: ListingStatus) => void;
  deleteListing: (id: string) => void;
  addFunds: (amount: number) => void;
  setPriceMode: (mode: PriceMode) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  signIn: (email: string) => void;
  signOut: () => void;
};

const AppContext = createContext<ContextValue | null>(null);
const makeId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
const timestamp = () => new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

export function FintechProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(initialData);
  const [quotes, setQuotes] = useState<Asset[]>(ASSETS);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!active) return;
        if (stored) setData({ ...initialData, ...JSON.parse(stored) as Partial<AppData> });
        setReady(true);
      })
      .catch(() => {
        if (!active) return;
        setStorageAvailable(false);
        setReady(true);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready || !storageAvailable) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch(() => setStorageAvailable(false));
  }, [data, ready, storageAvailable]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuotes((current) => current.map((asset) => {
        const nudge = (Math.random() - 0.48) * 0.0018;
        return { ...asset, price: Math.max(0.01, asset.price * (1 + nudge)), changePercent: asset.changePercent + nudge * 100 };
      }));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const value = useMemo<ContextValue>(() => {
    const toggleWatchlist = (symbol: string) => setData((current) => ({
      ...current,
      watchlist: current.watchlist.includes(symbol) ? current.watchlist.filter((item) => item !== symbol) : [...current.watchlist, symbol],
    }));

    const placeOrder = (request: OrderRequest) => {
      const asset = quotes.find((item) => item.symbol === request.symbol);
      if (!asset || !Number.isFinite(request.quantity) || request.quantity <= 0) throw new Error('Enter a valid quantity.');
      const price = request.orderType === 'Limit' ? Number(request.limitPrice) : asset.price;
      if (!Number.isFinite(price) || price <= 0) throw new Error('Enter a valid limit price.');
      const total = price * request.quantity;
      const holding = data.holdings.find((item) => item.symbol === request.symbol);
      if (request.side === 'Buy' && total > data.balance) throw new Error('This order is higher than your available demo balance.');
      if (request.side === 'Sell' && (!holding || request.quantity > holding.quantity)) throw new Error('You do not have enough shares to sell.');
      const status: OrderStatus = request.orderType === 'Market' ? 'Completed' : 'Open';
      const order: Order = {
        id: makeId('ORD'), symbol: asset.symbol, name: asset.name, side: request.side,
        quantity: request.quantity, price, total, orderType: request.orderType, status, createdAt: timestamp(),
      };
      setData((current) => {
        let holdings = current.holdings;
        let balance = current.balance;
        const transactions = [...current.transactions];
        if (status === 'Completed' && request.side === 'Buy') {
          const prior = holdings.find((item) => item.symbol === asset.symbol);
          holdings = prior
            ? holdings.map((item) => item.symbol === asset.symbol
              ? { ...item, averagePrice: ((item.quantity * item.averagePrice) + total) / (item.quantity + request.quantity), quantity: item.quantity + request.quantity }
              : item)
            : [...holdings, { symbol: asset.symbol, quantity: request.quantity, averagePrice: price }];
          balance -= total;
        } else if (status === 'Completed') {
          holdings = holdings.map((item) => item.symbol === asset.symbol ? { ...item, quantity: item.quantity - request.quantity } : item).filter((item) => item.quantity > 0);
          balance += total;
        }
        if (status === 'Completed') transactions.unshift({
          id: makeId('TXN'), type: request.side, title: `${request.side === 'Buy' ? 'Bought' : 'Sold'} ${asset.name}`,
          detail: `${request.quantity} ${request.quantity === 1 ? 'share' : 'shares'} · ${request.orderType} order`,
          amount: request.side === 'Buy' ? -total : total, createdAt: timestamp(), status: 'Completed',
        });
        return { ...current, orders: [order, ...current.orders], holdings, balance, transactions };
      });
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return order;
    };

    const cancelOrder = (id: string) => setData((current) => ({
      ...current, orders: current.orders.map((order) => order.id === id && order.status === 'Open' ? { ...order, status: 'Cancelled' } : order),
    }));

    const availableQuantity = (product: ProductListing) => {
      if (product.mine) return Math.max(0, product.quantity);
      return Math.max(0, product.quantity - (data.marketplacePurchases[product.id] ?? 0));
    };

    const buyProduct = (product: ProductListing) => {
      if (product.mine) throw new Error('You cannot buy your own listing.');
      if (availableQuantity(product) < 1) throw new Error('This listing is sold out.');
      if (data.balance < product.price) throw new Error('This purchase is higher than your available demo balance.');
      setData((current) => {
        const own = current.listings.some((item) => item.id === product.id);
        const listings = own
          ? current.listings.map((item) => item.id === product.id ? { ...item, quantity: item.quantity - 1, status: item.quantity <= 1 ? 'Sold' as const : item.status } : item)
          : current.listings;
        return {
          ...current, balance: current.balance - product.price, listings,
          marketplacePurchases: own ? current.marketplacePurchases : { ...current.marketplacePurchases, [product.id]: (current.marketplacePurchases[product.id] ?? 0) + 1 },
          transactions: [{ id: makeId('TXN'), type: 'Marketplace', title: `Bought ${product.name}`, detail: `Marketplace · ${product.seller}`, amount: -product.price, createdAt: timestamp(), status: 'Completed' }, ...current.transactions],
        };
      });
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    const createListing = (listing: NewListing) => setData((current) => {
      const newListing: ProductListing = {
        ...listing, id: makeId('LST'), seller: current.userName, sellerEmail: current.userEmail,
        sellerRating: 5, status: listing.status ?? 'Active', views: 0, ordersCount: 0, mine: true,
      };
      return { ...current, listings: [newListing, ...current.listings] };
    });

    const updateListing = (listing: NewListing & { id: string }) => setData((current) => ({
      ...current, listings: current.listings.map((item) => item.id === listing.id ? { ...item, ...listing } : item),
    }));
    const updateListingStatus = (id: string, status: ListingStatus) => setData((current) => ({
      ...current, listings: current.listings.map((item) => item.id === id ? { ...item, status } : item),
    }));
    const deleteListing = (id: string) => setData((current) => ({ ...current, listings: current.listings.filter((item) => item.id !== id) }));
    const addFunds = (amount: number) => setData((current) => ({
      ...current, balance: current.balance + amount,
      transactions: [{ id: makeId('TXN'), type: 'Deposit', title: 'Added demo funds', detail: 'UPI · Simulated transaction', amount, createdAt: timestamp(), status: 'Completed' }, ...current.transactions],
    }));
    const setPriceMode = (priceMode: PriceMode) => setData((current) => ({ ...current, priceMode }));
    const setNotificationsEnabled = (notificationsEnabled: boolean) => setData((current) => ({ ...current, notificationsEnabled }));
    const signIn = (email: string) => setData((current) => ({
      ...current, signedIn: true, userEmail: email.trim().toLowerCase(),
      userName: email.trim().split('@')[0]?.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Ananya',
    }));
    const signOut = () => setData((current) => ({ ...current, signedIn: false }));

    return {
      data, quotes, ready, storageAvailable, toggleWatchlist, placeOrder, cancelOrder, buyProduct,
      availableQuantity, createListing, updateListing, updateListingStatus, deleteListing, addFunds,
      setPriceMode, setNotificationsEnabled, signIn, signOut,
    };
  }, [data, quotes, ready, storageAvailable]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useFintech() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useFintech must be used inside FintechProvider.');
  return context;
}

export function useAsset(symbol: string) {
  const { quotes } = useFintech();
  return quotes.find((asset) => asset.symbol === symbol);
}