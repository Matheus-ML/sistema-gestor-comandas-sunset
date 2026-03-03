
import React, { useState, useEffect } from 'react';
import { Product, Tab, ViewMode, TabItem } from './types';
import { ProductManagement } from './components/ProductManagement';
import { TabDetails } from './components/TabDetails';
import { Button } from './components/Button';

const STORAGE_KEY_PRODUCTS = 'pos_products';
const STORAGE_KEY_TABS = 'pos_tabs';

const PRELOADED_PRODUCTS: Omit<Product, 'id'>[] = [
  { name: 'CHOPP', price: 37.50 },
  { name: 'GARRAFA HEINEKEN', price: 18.00 },
  { name: 'GARRAFA SKOL', price: 14.00 },
  { name: 'GARRAFA ORIGINAL', price: 14.00 },
  { name: 'GARRAFA AMSTEL', price: 14.00 },
  { name: 'LONG NECK HEINEKEN', price: 10.00 },
  { name: 'LATA 0% ALCOOL', price: 9.00 },
  { name: 'LATA SKOL', price: 8.00 },
  { name: 'LATA BUDWEISER', price: 8.00 },
  { name: 'LATA SPATEN', price: 8.00 },
  { name: 'REFRI 2,5L COCA-COLA', price: 19.00 },
  { name: 'REFRI 2L COCA-COLA', price: 18.00 },
  { name: 'REFRI 2L DEMAIS', price: 14.00 },
  { name: 'REFRI 600ML', price: 8.00 },
  { name: 'REFRI LATA', price: 6.00 },
  { name: 'AGUA', price: 4.00 },
  { name: 'H2O', price: 8.00 },
  { name: 'ISOTONICO', price: 9.00 },
  { name: 'ENERGETICO', price: 14.00 },
  { name: 'SUCO', price: 4.00 },
  { name: 'ACHOCOLATADO', price: 4.00 }
];

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('SALES');
  const [products, setProducts] = useState<Product[]>([]);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [selectedHistoryTab, setSelectedHistoryTab] = useState<Tab | null>(null);

  // Initial Load
  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    const savedTabs = localStorage.getItem(STORAGE_KEY_TABS);
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const initialProducts = PRELOADED_PRODUCTS.map(p => ({
        ...p,
        id: crypto.randomUUID()
      }));
      setProducts(initialProducts);
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(initialProducts));
    }

    if (savedTabs) {
      const parsedTabs = JSON.parse(savedTabs);
      setTabs(parsedTabs);
      const firstOpen = parsedTabs.find((t: Tab) => t.status === 'OPEN');
      if (firstOpen) setActiveTabId(firstOpen.id);
    }
  }, []);

  // Save on change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify(tabs));
  }, [tabs]);

  // Handlers
  const handleAddProduct = (p: Omit<Product, 'id'>) => {
    const newProduct = { ...p, id: crypto.randomUUID() };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateProduct = (updated: Product) => {
    // Corrected variable 'i' to 'p' to match the map function parameter
    setProducts(products.map(p => p.id === updated.id ? updated : p));
  };

  const handleCreateTab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName) return;
    
    const newTab: Tab = {
      id: crypto.randomUUID(),
      customerName: newCustomerName,
      items: [],
      status: 'OPEN',
      createdAt: Date.now(),
      total: 0
    };
    
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setNewCustomerName('');
  };

  const handleAddItemToTab = (tabId: string, item: TabItem) => {
    setTabs(prev => prev.map(t => {
      if (t.id !== tabId) return t;
      
      const existingItemIdx = t.items.findIndex(i => i.productId === item.productId);
      let newItems = [...t.items];
      
      if (existingItemIdx > -1) {
        const existing = newItems[existingItemIdx];
        newItems[existingItemIdx] = {
          ...existing,
          quantity: existing.quantity + item.quantity,
          total: (existing.quantity + item.quantity) * existing.unitPrice
        };
      } else {
        newItems.push(item);
      }
      
      const newTotal = newItems.reduce((acc, i) => acc + i.total, 0);
      return { ...t, items: newItems, total: newTotal };
    }));
  };

  const handleRemoveItemFromTab = (tabId: string, productId: string) => {
    setTabs(prev => prev.map(t => {
      if (t.id !== tabId) return t;
      const newItems = t.items.filter(i => i.productId !== productId);
      const newTotal = newItems.reduce((acc, i) => acc + i.total, 0);
      return { ...t, items: newItems, total: newTotal };
    }));
  };

  const handleCloseTab = (tabId: string) => {
    setTabs(prev => prev.map(t => {
      if (t.id !== tabId) return t;
      return { ...t, status: 'CLOSED', closedAt: Date.now() };
    }));
    setActiveTabId(null);
  };

  const openTabs = tabs.filter(t => t.status === 'OPEN');
  const activeTab = tabs.find(t => t.id === activeTabId);
  const [searchTab, setSearchTab] = useState('');
  const filteredTabs = openTabs.filter(tab =>
  tab.customerName.toLowerCase().includes(searchTab.toLowerCase())
);
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter text-[#0c4a6e] leading-none uppercase">SUNSET</h1>
          <h2 className="font-brand text-lg text-[#f97316] leading-none">Arena Beach Club</h2>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-full">
          <button 
            onClick={() => setViewMode('SALES')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'SALES' ? 'sunset-gradient shadow text-white' : 'text-slate-500 hover:text-[#0c4a6e]'}`}
          >
            <i className="fa-solid fa-umbrella-beach mr-2"></i>Comandas
          </button>
          <button 
            onClick={() => setViewMode('PRODUCTS')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'PRODUCTS' ? 'sunset-gradient shadow text-white' : 'text-slate-500 hover:text-[#0c4a6e]'}`}
          >
            <i className="fa-solid fa-martini-glass-citrus mr-2"></i>Produtos
          </button>
          <button 
            onClick={() => setViewMode('HISTORY')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'HISTORY' ? 'sunset-gradient shadow text-white' : 'text-slate-500 hover:text-[#0c4a6e]'}`}
          >
            <i className="fa-solid fa-clock-rotate-left mr-2"></i>Histórico
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-hidden">
        {viewMode === 'PRODUCTS' && (
          <ProductManagement 
            products={products} 
            onAdd={handleAddProduct} 
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
          />
        )}

        {viewMode === 'SALES' && (
          <div className="flex h-full bg-[#f8fafc]">
            {/* Sidebar: Open Tabs List */}
            <aside className="w-80 border-r border-slate-200 bg-white flex flex-col shadow-[4px_0_15px_-3px_rgba(0,0,0,0.05)]">
              <div className="p-4 bg-slate-50/50 border-b border-slate-100">
                <form onSubmit={handleCreateTab} className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Abrir Nova Mesa/Cliente</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Nome ou Nº Mesa..."
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#f97316] outline-none text-sm bg-white"
                    />
                    <Button type="submit" variant="primary" size="sm" icon="fa-plus" className="sunset-gradient border-none" />
                  </div>
                </form>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                <h3 className="px-2 pt-2 pb-1 text-[11px] font-black text-[#0c4a6e] uppercase tracking-[0.2em]">Comandas Ativas</h3>
                <input
                  type="text"
                  placeholder="Pesquisar comanda..."
                  value={searchTab}
                 onChange={(e) => setSearchTab(e.target.value)}
                  className="w-full h-12 px-4 mt-4 mb-6 rounded-2xl border border-slate-200                 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-[#f97316]                outline-none font-semibold text-slate-700"
/>
                {openTabs.length === 0 ? (
                  <div className="p-8 text-center text-slate-300 italic text-sm">
                    Sem comandas no momento.
                  </div>
                ) : (
                  filteredTabs.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTabId(t.id)}
                      className={`w-full text-left p-4 rounded-2xl transition-all border ${activeTabId === t.id ? 'bg-gradient-to-br from-white to-orange-50/50 border-orange-200 shadow-md ring-1 ring-orange-200' : 'bg-white border-slate-100 hover:border-orange-100 hover:bg-orange-50/20'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`font-bold text-base truncate pr-2 ${activeTabId === t.id ? 'text-[#0c4a6e]' : 'text-slate-700'}`}>{t.customerName}</span>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{new Date(t.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center text-[#f97316] text-xs font-semibold">
                          <i className="fa-solid fa-receipt mr-1.5 opacity-50"></i>
                          {t.items.length} itens
                        </div>
                        <span className={`text-xl font-black ${activeTabId === t.id ? 'text-[#f97316]' : 'text-slate-600'}`}>R${t.total.toFixed(2)}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </aside>

            {/* Main Content: Tab Details */}
            <section className="flex-1 p-6 flex flex-col min-w-0">
              {activeTab ? (
                <TabDetails 
                  tab={activeTab} 
                  products={products}
                  onAddItem={handleAddItemToTab}
                  onRemoveItem={handleRemoveItemFromTab}
                  onCloseTab={handleCloseTab}
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-orange-100/50 rounded-full blur-2xl animate-pulse"></div>
                    <div className="relative sunset-gradient p-10 rounded-full shadow-2xl">
                      <i className="fa-solid fa-sun text-6xl text-white"></i>
                    </div>
                  </div>
                  <h2 className="text-3xl font-black text-[#0c4a6e] tracking-tight">Sunset Arena Beach Club</h2>
                  <p className="text-slate-400 font-medium mt-2">Selecione uma comanda ao lado para gerenciar os pedidos.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {viewMode === 'HISTORY' && (
          <div className="p-8 max-w-6xl mx-auto h-full overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-black text-[#0c4a6e] flex items-center tracking-tight">
                <i className="fa-solid fa-receipt mr-4 text-[#f97316]"></i>
                Histórico de Vendas
              </h2>
            </div>
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0c4a6e] text-white">
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em]">Cliente / Mesa</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em]">Fechamento</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em]">Itens</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-right">Total Pago</th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tabs.filter(t => t.status === 'CLOSED').length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-16 text-center">
                        <i className="fa-solid fa-box-open text-4xl text-slate-200 mb-4 block"></i>
                        <span className="text-slate-400 font-medium italic">Nenhuma venda registrada no histórico.</span>
                      </td>
                    </tr>
                  ) : (
                    tabs.filter(t => t.status === 'CLOSED').sort((a,b) => (b.closedAt || 0) - (a.closedAt || 0)).map(t => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <span className="text-[#0c4a6e] font-black text-lg">{t.customerName}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="text-slate-600 font-semibold text-sm">
                            {new Date(t.closedAt!).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-slate-400 text-xs font-medium">
                            às {new Date(t.closedAt!).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-slate-500 text-sm font-medium">
                            {t.items.length} itens registrados
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className="font-black text-xl text-[#0c4a6e]">R${t.total.toFixed(2)}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            icon="fa-eye"
                            onClick={() => setSelectedHistoryTab(t)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Ver itens
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Item Details Modal */}
      {selectedHistoryTab && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c4a6e]/60 backdrop-blur-sm" onClick={() => setSelectedHistoryTab(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-10 py-8 bg-[#0c4a6e] text-white flex justify-between items-center relative">
               <div className="absolute bottom-0 right-0 p-4 opacity-10">
                <i className="fa-solid fa-receipt text-8xl"></i>
              </div>
              <div className="relative z-10">
                <span className="text-orange-400 font-black text-xs uppercase tracking-[0.3em] mb-1 block">Detalhes do Pedido</span>
                <h2 className="text-3xl font-black tracking-tight">{selectedHistoryTab.customerName}</h2>
                <div className="flex items-center mt-1 text-sky-200 text-sm font-medium">
                  <i className="fa-solid fa-calendar-check mr-2 opacity-70"></i>
                  Fechada em {new Date(selectedHistoryTab.closedAt!).toLocaleDateString('pt-BR')} às {new Date(selectedHistoryTab.closedAt!).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}
                </div>
              </div>
              <button 
                onClick={() => setSelectedHistoryTab(null)}
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            {/* List */}
            <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                    <th className="pb-4">Produto</th>
                    <th className="pb-4 text-center">Qtd</th>
                    <th className="pb-4 text-right">Unitário</th>
                    <th className="pb-4 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {selectedHistoryTab.items.map((item, idx) => {
                    const product = products.find(p => p.id === item.productId);
                    return (
                      <tr key={`${item.productId}-${idx}`}>
                        <td className="py-4">
                          <span className="font-bold text-[#0c4a6e] text-lg">{product?.name || 'Produto Removido'}</span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 font-black text-sm text-[#0c4a6e]">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="py-4 text-right text-slate-400 font-medium">R${item.unitPrice.toFixed(2)}</td>
                        <td className="py-4 text-right font-black text-[#0c4a6e] text-lg">R${item.total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <div className="text-slate-400 font-bold text-sm uppercase tracking-widest">Valor Total Pago</div>
              <div className="text-4xl font-black text-[#f97316]">R${selectedHistoryTab.total.toFixed(2)}</div>
            </div>
            
            <div className="p-6 bg-white flex justify-center border-t border-slate-100">
              <Button variant="navy" size="lg" onClick={() => setSelectedHistoryTab(null)} className="w-full">
                Fechar Detalhes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
