
import React, { useState } from 'react';
import { Product } from '../types';
import { Button } from './Button';

interface ProductManagementProps {
  products: Product[];
  onAdd: (p: Omit<Product, 'id'>) => void;
  onDelete: (id: string) => void;
  onUpdate: (p: Product) => void;
}

export const ProductManagement: React.FC<ProductManagementProps> = ({ products, onAdd, onDelete, onUpdate }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    
    if (editingId) {
      onUpdate({ id: editingId, name, price: parseFloat(price) });
      setEditingId(null);
    } else {
      onAdd({ name, price: parseFloat(price) });
    }
    
    setName('');
    setPrice('');
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price.toString());
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto custom-scrollbar">
      <div className="mb-10 bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <h2 className="text-3xl font-black mb-8 text-[#0c4a6e] tracking-tight relative z-10">
          <i className="fa-solid fa-tags mr-4 text-[#f97316]"></i>
          {editingId ? 'Editar Item do Menu' : 'Novo Item no Menu'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 items-end relative z-10">
          <div className="flex-1 min-w-[300px]">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Nome do Produto</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 px-6 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-[#f97316] outline-none transition-all font-bold text-slate-700"
              placeholder="Ex: Porção de Peixe"
            />
          </div>
          <div className="w-40">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Preço (R$)</label>
            <input 
              type="number" 
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-14 px-6 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-[#f97316] outline-none transition-all font-black text-[#0c4a6e]"
              placeholder="0,00"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant={editingId ? 'navy' : 'primary'} size="lg" className="h-14 px-10">
              {editingId ? 'Salvar Alteração' : 'Cadastrar'}
            </Button>
            {editingId && (
              <Button type="button" variant="ghost" size="lg" className="h-14" onClick={() => { setEditingId(null); setName(''); setPrice(''); }}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#0c4a6e] text-white">
            <tr>
              <th className="px-10 py-5 text-xs font-black uppercase tracking-[0.2em]">Descrição do Produto</th>
              <th className="px-10 py-5 text-xs font-black uppercase tracking-[0.2em]">Preço Unitário</th>
              <th className="px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-10 py-16 text-center text-slate-300 italic font-medium">
                  Menu vazio. Cadastre seu primeiro produto acima.
                </td>
              </tr>
            ) : (
              products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6 font-bold text-[#0c4a6e] text-lg">{p.name}</td>
                  <td className="px-10 py-6 font-black text-[#f97316] text-xl">R${p.price.toFixed(2)}</td>
                  <td className="px-10 py-6 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon="fa-pen" 
                      onClick={() => handleEdit(p)}
                      className="mr-2 text-indigo-600 hover:bg-indigo-50"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon="fa-trash" 
                      onClick={() => onDelete(p.id)}
                      className="text-rose-500 hover:bg-rose-50"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
