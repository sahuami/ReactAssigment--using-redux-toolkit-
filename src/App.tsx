import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import { useAppSelector } from './hooks';
import type { RootState } from './store';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  return <>{isAuthenticated ? children : <Navigate to="/login" replace />}</>;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground antialiased font-sans">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <ProductsPage />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
