import React, { useState } from 'react';
import { PerfumeItem, BusinessInfo } from '../types';
import { INITIAL_PERFUMES } from '../data/initialPerfumes';
import { Plus, Trash2, Edit3, RotateCcw, Check, X, Search } from 'lucide-react';

interface TableEditorProps {
  perfumes: PerfumeItem[];
  onUpdatePerfumes: (items: PerfumeItem[]) => void;
  businessInfo: BusinessInfo;
  onSelectPerfumeToHighlight?: (id: string | null) => void;
}

export const TableEditor: React.FC<TableEditorProps> = ({
  perfumes,
  onUpdatePerfumes,
  businessInfo,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PerfumeItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  const [newPerfume, setNewPerfume] = useState<Omit<PerfumeItem, 'id'>>({
    name: '',
    brand: '',
    dupeOf: '',
    prices: {
      ml3: 150,
      ml5: 220,
      ml10: 380,
      ml15: 550,
      ml20: 780,
      ml30: 1050,
    },
  });

  const startEdit = (p: PerfumeItem) => {
    setEditingId(p.id);
    setEditForm(JSON.parse(JSON.stringify(p)));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (!editForm) return;
    onUpdatePerfumes(perfumes.map((p) => (p.id === editForm.id ? editForm : p)));
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = (id: string) => {
    if (perfumes.length <= 1) return;
    onUpdatePerfumes(perfumes.filter((p) => p.id !== id));
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPerfume.name.trim()) return;
    const item: PerfumeItem = {
      ...newPerfume,
      id: `perfume-${Date.now()}`,
    };
    onUpdatePerfumes([...perfumes, item]);
    setIsAddingNew(false);
    setNewPerfume({
      name: '',
      brand: '',
      dupeOf: '',
      prices: {
        ml3: 150,
        ml5: 220,
        ml10: 380,
        ml15: 550,
        ml20: 780,
        ml30: 1050,
      },
    });
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset the decant price list back to the original 11 perfumes from your image?')) {
      onUpdatePerfumes(INITIAL_PERFUMES);
    }
  };

  const filteredPerfumes = perfumes.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dupeOf.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Edit3 className="w-6 h-6 text-amber-400" />
            Manage & Edit Decant Prices
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Update prices, add new perfume releases, and manage clone inspirations. Changes reflect instantly on the 4:3 poster!
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsAddingNew(true)}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Perfume
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors border border-slate-700 shrink-0"
            title="Reset to default original spreadsheet"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Original
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search fragrance by name, dupe inspiration (e.g. Creed, Aventus, Hacivat, JPG, LV), or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#141620] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
        />
      </div>

      {/* Add New Perfume Form Modal / Collapse */}
      {isAddingNew && (
        <form
          onSubmit={handleAddNew}
          className="bg-[#141620] border border-amber-500/40 rounded-xl p-5 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="font-semibold text-amber-300 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Fragrance to Price Chart
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Perfume Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Afnan 9 PM"
                value={newPerfume.name}
                onChange={(e) => setNewPerfume({ ...newPerfume, name: e.target.value })}
                className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Brand / House
              </label>
              <input
                type="text"
                placeholder="e.g. Afnan"
                value={newPerfume.brand}
                onChange={(e) => setNewPerfume({ ...newPerfume, brand: e.target.value })}
                className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Inspiration / Dupe Of
              </label>
              <input
                type="text"
                placeholder="e.g. JPG Ultra Male"
                value={newPerfume.dupeOf}
                onChange={(e) => setNewPerfume({ ...newPerfume, dupeOf: e.target.value })}
                className="w-full bg-[#1c1f2e] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Decant Prices ({businessInfo.currency})
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {(['ml3', 'ml5', 'ml10', 'ml15', 'ml20', 'ml30'] as const).map((sizeKey) => (
                <div key={sizeKey} className="bg-[#1c1f2e] p-2 rounded-lg border border-slate-700">
                  <span className="block text-[10px] text-slate-400 mb-1 font-semibold">
                    {sizeKey === 'ml15' ? '15ml Heavy' : sizeKey.replace('ml', '') + ' ml'}
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={newPerfume.prices[sizeKey]}
                    onChange={(e) =>
                      setNewPerfume({
                        ...newPerfume,
                        prices: {
                          ...newPerfume.prices,
                          [sizeKey]: Number(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
            >
              Add to Catalog
            </button>
          </div>
        </form>
      )}

      {/* Editable Table */}
      <div className="bg-[#141620] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1b1e2c] border-b border-slate-800 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Fragrance</th>
                <th className="py-3 px-2 text-center">3ml</th>
                <th className="py-3 px-2 text-center">5ml</th>
                <th className="py-3 px-2 text-center">10ml</th>
                <th className="py-3 px-2 text-center text-sky-400">15ml Heavy</th>
                <th className="py-3 px-2 text-center">20ml</th>
                <th className="py-3 px-2 text-center">30ml</th>
                <th className="py-3 px-3">Dupe Inspiration</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredPerfumes.map((p) => {
                const isEditing = editingId === p.id;
                const form = isEditing && editForm ? editForm : p;

                return (
                  <tr
                    key={p.id}
                    className={`transition-colors ${
                      isEditing ? 'bg-amber-500/10' : 'hover:bg-[#1a1c2a]'
                    }`}
                  >
                    {/* Fragrance Name */}
                    <td className="py-2.5 px-4 font-medium text-slate-200">
                      {isEditing ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                              setEditForm(editForm ? { ...editForm, name: e.target.value } : null)
                            }
                            className="bg-slate-900 border border-amber-400/60 rounded px-2 py-1 text-xs w-full text-white"
                          />
                          <input
                            type="text"
                            placeholder="Brand"
                            value={form.brand || ''}
                            onChange={(e) =>
                              setEditForm(editForm ? { ...editForm, brand: e.target.value } : null)
                            }
                            className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-[10px] w-full text-slate-300"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-slate-100">{p.name}</div>
                          {p.brand && <div className="text-[10px] text-slate-400">{p.brand}</div>}
                        </div>
                      )}
                    </td>

                    {/* 3 ml */}
                    <td className="py-2.5 px-2 text-center font-mono font-semibold">
                      {isEditing ? (
                        <input
                          type="number"
                          value={form.prices.ml3}
                          onChange={(e) =>
                            setEditForm(
                              editForm
                                ? {
                                    ...editForm,
                                    prices: { ...editForm.prices, ml3: Number(e.target.value) || 0 },
                                  }
                                : null
                            )
                          }
                          className="w-14 bg-slate-900 border border-amber-400 rounded px-1.5 py-0.5 text-center text-xs text-amber-300"
                        />
                      ) : (
                        <span className="text-slate-300">{p.prices.ml3}</span>
                      )}
                    </td>

                    {/* 5 ml */}
                    <td className="py-2.5 px-2 text-center font-mono font-semibold">
                      {isEditing ? (
                        <input
                          type="number"
                          value={form.prices.ml5}
                          onChange={(e) =>
                            setEditForm(
                              editForm
                                ? {
                                    ...editForm,
                                    prices: { ...editForm.prices, ml5: Number(e.target.value) || 0 },
                                  }
                                : null
                            )
                          }
                          className="w-14 bg-slate-900 border border-amber-400 rounded px-1.5 py-0.5 text-center text-xs text-amber-300"
                        />
                      ) : (
                        <span className="text-slate-300">{p.prices.ml5}</span>
                      )}
                    </td>

                    {/* 10 ml */}
                    <td className="py-2.5 px-2 text-center font-mono font-semibold">
                      {isEditing ? (
                        <input
                          type="number"
                          value={form.prices.ml10}
                          onChange={(e) =>
                            setEditForm(
                              editForm
                                ? {
                                    ...editForm,
                                    prices: { ...editForm.prices, ml10: Number(e.target.value) || 0 },
                                  }
                                : null
                            )
                          }
                          className="w-14 bg-slate-900 border border-amber-400 rounded px-1.5 py-0.5 text-center text-xs text-amber-300"
                        />
                      ) : (
                        <span className="text-slate-300">{p.prices.ml10}</span>
                      )}
                    </td>

                    {/* 15 ml Heavy */}
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-sky-400 bg-sky-950/15">
                      {isEditing ? (
                        <input
                          type="number"
                          value={form.prices.ml15}
                          onChange={(e) =>
                            setEditForm(
                              editForm
                                ? {
                                    ...editForm,
                                    prices: { ...editForm.prices, ml15: Number(e.target.value) || 0 },
                                  }
                                : null
                            )
                          }
                          className="w-14 bg-slate-900 border border-sky-400 rounded px-1.5 py-0.5 text-center text-xs text-sky-300"
                        />
                      ) : (
                        <span>{p.prices.ml15}</span>
                      )}
                    </td>

                    {/* 20 ml */}
                    <td className="py-2.5 px-2 text-center font-mono font-semibold">
                      {isEditing ? (
                        <input
                          type="number"
                          value={form.prices.ml20}
                          onChange={(e) =>
                            setEditForm(
                              editForm
                                ? {
                                    ...editForm,
                                    prices: { ...editForm.prices, ml20: Number(e.target.value) || 0 },
                                  }
                                : null
                            )
                          }
                          className="w-14 bg-slate-900 border border-amber-400 rounded px-1.5 py-0.5 text-center text-xs text-amber-300"
                        />
                      ) : (
                        <span className="text-slate-300">{p.prices.ml20}</span>
                      )}
                    </td>

                    {/* 30 ml */}
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-amber-400">
                      {isEditing ? (
                        <input
                          type="number"
                          value={form.prices.ml30}
                          onChange={(e) =>
                            setEditForm(
                              editForm
                                ? {
                                    ...editForm,
                                    prices: { ...editForm.prices, ml30: Number(e.target.value) || 0 },
                                  }
                                : null
                            )
                          }
                          className="w-14 bg-slate-900 border border-amber-400 rounded px-1.5 py-0.5 text-center text-xs text-amber-300"
                        />
                      ) : (
                        <span>{p.prices.ml30}</span>
                      )}
                    </td>

                    {/* Dupe */}
                    <td className="py-2.5 px-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={form.dupeOf}
                          onChange={(e) =>
                            setEditForm(editForm ? { ...editForm, dupeOf: e.target.value } : null)
                          }
                          className="bg-slate-900 border border-amber-400/60 rounded px-2 py-1 text-xs w-full text-amber-300"
                        />
                      ) : (
                        <span className="font-serif-luxury italic text-amber-400/90">
                          {p.dupeOf}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-3 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={saveEdit}
                            className="p-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="p-1 rounded bg-slate-700/40 text-slate-400 hover:bg-slate-700"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => startEdit(p)}
                            className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                            title="Edit row"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {perfumes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDelete(p.id)}
                              className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                              title="Delete row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
