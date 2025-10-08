import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { UploadCSV } from './pages/UploadCSV';
import { UploadReceipt } from './pages/UploadReceipt';
import { ManualReceipt } from './pages/ManualReceipt';
import { Budgets } from './pages/Budgets';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Layout>
                  <Transactions />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-csv"
            element={
              <ProtectedRoute>
                <Layout>
                  <UploadCSV />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-receipt"
            element={
              <ProtectedRoute>
                <Layout>
                  <UploadReceipt />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/manual-receipt"
            element={
              <ProtectedRoute>
                <Layout>
                  <ManualReceipt />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/budgets"
            element={
              <ProtectedRoute>
                <Layout>
                  <Budgets />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
