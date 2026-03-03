
export interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
}

export interface TabItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Tab {
  id: string;
  customerName: string;
  items: TabItem[];
  status: 'OPEN' | 'CLOSED';
  createdAt: number;
  closedAt?: number;
  total: number;
}

export type ViewMode = 'SALES' | 'PRODUCTS' | 'HISTORY';
