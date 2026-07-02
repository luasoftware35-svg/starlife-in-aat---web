import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import ConfirmModal from '@/components/admin/ConfirmModal';
import DataTable from '@/components/admin/DataTable';
import { deleteRow, listRows } from '@/lib/supabase/admin';
import { adminResources } from './adminResources';

export default function AdminResourceList({ resource: resourceProp }) {
  const { resource: resourceParam } = useParams();
  const resource = resourceProp || resourceParam || 'projects';
  const config = adminResources[resource];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadRows = useCallback(async () => {
    if (!config) return;
    setLoading(true);
    try {
      const data = await listRows(config.table, {
        orderBy: config.orderBy,
        ascending: config.ascending,
      });
      setRows(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  if (!config) {
    return <div className="rounded-3xl border border-white/10 p-6 text-zinc-300">Bilinmeyen kaynak.</div>;
  }

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteRow(config.table, deleteTarget.id);
      toast.success('Kayıt silindi.');
      setDeleteTarget(null);
      loadRows();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-500">Supabase table: {config.table}</p>
          <h2 className="text-2xl font-semibold text-white">{config.label}</h2>
        </div>
        {config.readOnly ? null : (
        <Link
          to={`${config.basePath}/yeni`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gold-light"
        >
          <Plus className="h-4 w-4" />
          Yeni Kayıt
        </Link>
        )}
      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-zinc-400">Yükleniyor...</div>
      ) : (
        <DataTable
          columns={config.columns}
          rows={rows}
          editBasePath={config.readOnly ? null : config.editBasePath}
          onDelete={setDeleteTarget}
          emptyText="Henüz kayıt yok."
        />
      )}

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Kaydı sil?"
        description={`${deleteTarget?.title || deleteTarget?.name || 'Bu kayıt'} kalıcı olarak silinecek.`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
