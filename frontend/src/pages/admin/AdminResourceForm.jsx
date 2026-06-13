import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { getRowById, upsertRow } from '@/lib/supabase/admin';
import { adminResources } from './adminResources';

function Field({ field, form }) {
  const error = form.formState.errors[field.key]?.message;

  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
        <input type="checkbox" {...form.register(field.key)} className="h-4 w-4 accent-gold" />
        {field.label}
      </label>
    );
  }

  if (field.type === 'image') {
    return (
      <div>
        <span className="mb-2 block text-sm text-zinc-300">{field.label}</span>
        <Controller
          control={form.control}
          name={field.key}
          render={({ field: controllerField }) => (
            <ImageUpload value={controllerField.value} onChange={controllerField.onChange} folder={field.key} />
          )}
        />
        {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
      </div>
    );
  }

  if (field.type === 'images') {
    return (
      <div>
        <span className="mb-2 block text-sm text-zinc-300">{field.label}</span>
        <Controller
          control={form.control}
          name={field.key}
          render={({ field: controllerField }) => (
            <MultiImageUpload value={controllerField.value || []} onChange={controllerField.onChange} folder={field.key} />
          )}
        />
        {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
      </div>
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
            <RichTextEditor value={controllerField.value || ''} onChange={controllerField.onChange} placeholder={field.placeholder} />
          )}
        />
        {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <label className="block">
        <span className="mb-2 block text-sm text-zinc-300">{field.label}</span>
        <select
          {...form.register(field.key)}
          className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-gold/50"
        >
          <option value="">Seçiniz</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
      </label>
    );
  }

  return (
    <label className="block">
      <span className="mb-2 block text-sm text-zinc-300">{field.label}</span>
      <input
        type={field.type || 'text'}
        {...form.register(field.key)}
        placeholder={field.placeholder}
        className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-gold/50"
      />
      {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

export default function AdminResourceForm({ resource: resourceProp }) {
  const { resource: resourceParam, id } = useParams();
  const resource = resourceProp || resourceParam || 'projects';
  const navigate = useNavigate();
  const config = adminResources[resource];
  const isEdit = Boolean(id);
  const form = useForm({
    resolver: config?.schema ? zodResolver(config.schema) : undefined,
    defaultValues: config?.defaults || {},
  });

  useEffect(() => {
    if (!config || !isEdit) return;

    getRowById(config.table, id)
      .then((row) => form.reset({ ...config.defaults, ...row }))
      .catch((error) => toast.error(error.message));
  }, [config, form, id, isEdit]);

  if (!config) {
    return <div className="rounded-3xl border border-white/10 p-6 text-zinc-300">Bilinmeyen kaynak.</div>;
  }

  const onSubmit = async (values) => {
    try {
      await upsertRow(config.table, isEdit ? { ...values, id } : values);
      toast.success('Kayıt kaydedildi.');
      navigate(config.basePath);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link to={config.basePath} className="text-sm text-gold hover:text-gold-light">
          ← Listeye dön
        </Link>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          {isEdit ? 'Kaydı Düzenle' : 'Yeni Kayıt'} · {config.label}
        </h2>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        {config.fields.map((field) => (
          <Field key={field.key} field={field} form={form} />
        ))}

        <div className="flex justify-end gap-3 pt-4">
          <Link to={config.basePath} className="rounded-full px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-white/10">
            Vazgeç
          </Link>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gold-light disabled:opacity-50"
          >
            {form.formState.isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
