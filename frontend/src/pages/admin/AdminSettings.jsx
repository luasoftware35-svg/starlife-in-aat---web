import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminUsersPanel from '@/components/admin/AdminUsersPanel';
import AdminResourceList from './AdminResourceList';

export default function AdminSettings() {
  const { user } = useOutletContext();

  return (
    <div className="space-y-8">
      <AdminResourceList resource="settings" />
      <AdminUsersPanel currentUser={user} />
    </div>
  );
}
