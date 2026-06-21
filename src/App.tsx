import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './routes/Auth/Login';
import Callback from './routes/Auth/Callback';
import CreateOrg from './routes/Onboarding/CreateOrg';
import Invite from './routes/Onboarding/Invite';
import AcceptInvite from './routes/Onboarding/AcceptInvite';
import Home from './routes/App/Home';
import { useAuth } from './features/auth/hooks/useAuth';
import { Toaster } from 'sonner';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <div />;
  if (!user) return <Navigate to="/auth/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/callback" element={<Callback />} />

        <Route path="/onboarding/create" element={<CreateOrg />} />
        <Route path="/onboarding/invite" element={<Invite />} />
        <Route path="/onboarding/accept" element={<AcceptInvite />} />

        <Route path="/app" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
