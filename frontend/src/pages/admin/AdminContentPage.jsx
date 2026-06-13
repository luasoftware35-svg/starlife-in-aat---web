import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DataTable from '@/components/admin/DataTable';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { deleteRow, listRows, upsertRow } from '@/lib/supabase/admin';
import { contentResources } from './adminResources';

function ContentField({ field, form }) {
  if (field.type === 'image') {
    return (
      <label className="block">
        <span className="mb-2 block text-sm text-zinc-300">{field.label}</span>
        <Controller
          control={form.control}
          name={field.key}
          render={({ field: controllerField }) => (
            <ImageUpload value={controllerField.value} onChange={controllerField.onChange} folder={field.key} />
          )}
        />
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label className="block">
        <span className="mb-2 block text-sm text-zinc-300">{field.label}</span>
        <Controller
          control={form.control}
          name={field.key}
          render={({ field: controllerField }) => (
            <RichTextEditor value={controllerField.value || ''} onChange={controllerField.onChange} />
          )}
        />
      </label>
    );
  }

  return (
    <label className="block">
      <span className="mb-2 block text-sm text-zinc-300">{field.label}</span>
      <input
        type={field.type || 'text'}
        {...form.register(field.key)}
        className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-gold/50"
      />
    </label>
  );
}

export default function AdminContentPage({ type }) {
  const config = contentResources[type];
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const form = useForm();

  const loadRows = useCallback(async () => {
    if (!config) return;
    try {
      setRows(await listRows(config.table, { orderBy: config.orderBy || null, ascending: true }));
    } catch (error) {
      toast.error(error.message);
    }
  }, [config]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  if (!config) {
    return <div className="rounded-3xl border border-white/10 p-6 text-zinc-300">Bilinmeyen içerik alanı.</div>;
  }

  const onSubmit = async (values) => {
    try {
      await upsertRow(config.table, editing ? { ...values, id: editing.id } : values);
      toast.success('İçerik kaydedildi.');
      setEditing(null);
      form.reset({});
      loadRows();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (row) => {
    setEditing(row);
    form.reset(row);
  };

  const handleDelete = async (row) => {
    try {
      await deleteRow(config.table, row.id);
      toast.success('İçerik silindi.');
      loadRows();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <section className="space-y-4">
        <div>
          <p className="text-sm text-zinc-500">Supabase table: {config.table}</p>
          <h2 className="text-2xl font-semibold text-white">{config.label}</h2>
        </div>
        <DataTable
          rows={rows}
          columns={config.fields.slice(0, 3).map((field) => ({ key: field.key, label: field.label }))}
          onDelete={handleDelete}
          emptyText="Henüz içerik yok."
        />
        <div className="flex flex-wrap gap-2">
          {rows.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => handleEdit(row)}
              className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 hover:border-gold/50 hover:text-gold"
            >
              {row.title || row.key || row.id} düzenle
            </button>
          ))}
        </div>
      </section>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">{editing ? 'Düzenle' : 'Yeni içerik'}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{config.label}</h3>
        </div>
        {config.fields.map((field) => (
          <ContentField key={field.key} field={field} form={form} />
        ))}
        <div className="flex justify-end gap-3">
          {editing && (
            <button type="button" onClick={() => { setEditing(null); form.reset({}); }} className="rounded-full px-4 py-2 text-sm text-zinc-300 hover:bg-white/10">
              Vazgeç
            </button>
          )}
          <button type="submit" className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-gold-light">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
