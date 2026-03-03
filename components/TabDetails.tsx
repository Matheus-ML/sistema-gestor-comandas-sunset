
import React, { useState } from 'react';
import { Tab, Product, TabItem } from '../types';
import { Button } from './Button';


interface TabDetailsProps {
  tab: Tab;
  products: Product[];
  onAddItem: (tabId: string, item: TabItem) => void;
  onRemoveItem: (tabId: string, productId: string) => void;
  onCloseTab: (tabId: string) => void;
}

export const TabDetails: React.FC<TabDetailsProps> = ({ tab, products, onAddItem, onRemoveItem, onCloseTab }) => {

  const [search, setSearch] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [qty, setQty] = useState('1');
  const [isOpen, setIsOpen] = useState(false);
  
  const sortedProducts = [...products].sort((a, b) =>
  a.name.localeCompare(b.name)
  );

  const filteredProducts = sortedProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !qty) return;
    
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    onAddItem(tab.id, {
      productId: product.id,
      quantity: parseInt(qty),
      unitPrice: product.price,
      total: product.price * parseInt(qty)
    });
    
    setQty('1');
  };

  const getProductName = (id: string) => products.find(p => p.id === id)?.name || 'Produto Desconhecido';

  return (
    <div className="flex flex-col h-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="px-10 py-8 bg-[#0c4a6e] text-white flex justify-between items-center relative overflow-hidden">
        <div className="absolute bottom-0 right-0 p-4 opacity-10">
          <i className="fa-solid fa-umbrella-beach text-9xl"></i>
        </div>
        <div className="relative z-10">
          <span className="text-orange-400 font-black text-xs uppercase tracking-[0.3em] mb-1 block">Comanda em Aberto</span>
          <h2 className="text-4xl font-black tracking-tight">{tab.customerName}</h2>
          <div className="flex items-center mt-2 text-sky-200 text-sm font-medium">
            <i className="fa-solid fa-clock mr-2 opacity-70"></i>
            Aberta às {new Date(tab.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </div>
        </div>
        <div className="text-right relative z-10">
          <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-1">Total Consumido</p>
          <p className="text-5xl font-black text-white">R${tab.total.toFixed(2)}</p>
        </div>
      </div>

      {/* Item Adding Controls */}
      <div className="px-10 py-8 border-b border-slate-50 bg-white shadow-sm z-10">
        <form onSubmit={handleManualAdd} className="space-y-4">
          <div className="flex items-center space-x-2 text-[#0c4a6e]">
            <i className="fa-solid fa-cart-plus"></i>
            <h3 className="text-xs font-black uppercase tracking-widest">Lançar Novo Pedido</h3>
          </div>
          <div className="flex gap-3">
  <div className="flex-1 relative">

    {/* Botão que abre o dropdown */}
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="w-full h-14 pl-5 pr-10 text-left rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-[#f97316] outline-none transition-all font-bold text-slate-700 shadow-inner"
    >
      {selectedProductId
        ? products.find(p => p.id === selectedProductId)?.name + 
          " — R$" + 
          products.find(p => p.id === selectedProductId)?.price.toFixed(2)
        : "Buscar Produto no Menu..."}
    </button>

    {/* Ícone */}
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
      <i className="fa-solid fa-chevron-down text-xs"></i>
    </div>

    {/* Dropdown */}
    {isOpen && (
      <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-lg p-3">

        {/* Input dentro da lista */}
        <input
          type="text"
          placeholder="Digite para pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded-lg"
          autoFocus
        />

        <div className="max-h-60 overflow-y-auto">
          {filteredProducts.length === 0 && (
            <div className="text-slate-400 text-sm p-2">
              Nenhum produto encontrado
            </div>
          )}

          {filteredProducts.map(p => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedProductId(p.id);
                setIsOpen(false);
                setSearch('');
              }}
              className="p-2 hover:bg-orange-100 rounded-lg cursor-pointer font-semibold text-slate-700"
            >
              {p.name} — R${p.price.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    )}

  </div>
            <div className="w-24">
              <input 
                type="number" 
                min="1" 
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full h-14 px-4 text-center rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-[#f97316] outline-none transition-all font-black text-[#0c4a6e] shadow-inner"
              />
            </div>
            <Button type="submit" icon="fa-check" size="lg" className="h-14 sunset-gradient px-10">Lançar</Button>
          </div>
        </form>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-10 py-6">
        {tab.items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-200">
            <i className="fa-solid fa-champagne-glasses text-8xl mb-6 animate-bounce"></i>
            <p className="text-xl font-black text-slate-300 uppercase tracking-widest italic">Aguardando Pedidos...</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="pb-4">Descrição</th>
                <th className="pb-4 text-center">Qtd</th>
                <th className="pb-4 text-right">Unit.</th>
                <th className="pb-4 text-right">Total</th>
                <th className="pb-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tab.items.map((item, idx) => (
                <tr key={`${item.productId}-${idx}`} className="group transition-colors hover:bg-orange-50/20">
                  <td className="py-5">
                    <span className="font-bold text-[#0c4a6e] text-lg block">{getProductName(item.productId)}</span>
                  </td>
                  <td className="py-5 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 font-black text-sm text-[#0c4a6e]">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="py-5 text-right text-slate-400 font-medium text-sm">R${item.unitPrice.toFixed(2)}</td>
                  <td className="py-5 text-right font-black text-[#0c4a6e] text-lg">R${item.total.toFixed(2)}</td>
                  <td className="py-5 text-right">
                    <button 
                      onClick={() => onRemoveItem(tab.id, item.productId)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-slate-200 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center text-slate-400 font-medium italic text-sm">
          <i className="fa-solid fa-circle-info mr-2 text-orange-300"></i>
          Revise os itens e o total antes do pagamento
        </div>
        <Button 
          variant="success" 
          size="lg" 
          icon="fa-cash-register" 
          onClick={() => onCloseTab(tab.id)}
          disabled={tab.items.length === 0}
          className="bg-emerald-600 hover:bg-emerald-700 h-16 px-12 text-lg shadow-xl shadow-emerald-100 rounded-2xl"
        >
          Finalizar e Pagar
        </Button>
      </div>
    </div>
  );
};
