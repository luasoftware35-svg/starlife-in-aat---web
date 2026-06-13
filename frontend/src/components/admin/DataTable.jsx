import React from 'react';
import { Link } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Edit3, Trash2 } from 'lucide-react';

export default function DataTable({ columns = [], rows = [], editBasePath, onDelete, emptyText = 'Kayıt bulunamadı.' }) {
  if (!rows.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center text-zinc-400">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60">
      <DndContext collisionDetection={closestCenter}>
        <SortableContext items={rows.map((row) => row.id || row.slug || row.title)} strategy={verticalListSortingStrategy}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-zinc-500">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} className="px-5 py-4 font-medium">{column.label}</th>
                  ))}
                  <th className="px-5 py-4 text-right font-medium">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((row) => (
                  <tr key={row.id || row.slug || row.title} className="text-zinc-300 transition hover:bg-white/[0.03]">
                    {columns.map((column) => (
                      <td key={column.key} className="px-5 py-4">
                        {column.render ? column.render(row) : row[column.key] || '-'}
                      </td>
                    ))}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {editBasePath && row.id && (
                          <Link
                            to={`${editBasePath}/${row.id}`}
                            className="rounded-full border border-white/10 p-2 text-zinc-400 transition hover:border-gold/50 hover:text-gold"
                            aria-label="Düzenle"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        )}
                        {onDelete && row.id && (
                          <button
                            type="button"
                            onClick={() => onDelete(row)}
                            className="rounded-full border border-white/10 p-2 text-zinc-400 transition hover:border-red-400/50 hover:text-red-300"
                            aria-label="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
