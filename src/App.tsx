import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CVProvider } from './contexts/CVContext';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { CVEditor } from './components/editor/CVEditor';
import { PreviewPage } from './pages/PreviewPage';
import { AIAssistantPage } from './pages/AIAssistantPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <CVEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/preview"
            element={
              <ProtectedRoute>
                <PreviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoute>
                <AIAssistantPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CVProvider>
        <AppRoutes />
      </CVProvider>
    </AuthProvider>
  );
}

export default App;