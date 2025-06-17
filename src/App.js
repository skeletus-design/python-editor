import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import PythonEditor from "./components/PythonEditor";
import Header from "./Header";
import LecturesPage from "./components/LecturesPage";
import LectureDetail from "./components/LectureDetail";
import HomePage from './components/HomePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsCheckingAuth(false);
  }, []);

  const ProtectedLayout = ({ children }) => {
    if (isCheckingAuth) {
      return <div>Проверка авторизации...</div>;
    }

    return isAuthenticated ? (
      <>
        <Header />
        {children}
      </>
    ) : (
      <Navigate to="/auth" replace />
    );
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? (
              <Navigate to="/lectures" replace />
            ) : (
              <AuthForm onAuthSuccess={() => setIsAuthenticated(true)} />
            )
          } 
        />

        <Route
          path="/home"
          element={
            <ProtectedLayout>
              <HomePage/>
            </ProtectedLayout>
          }
        />

        <Route 
          path="/lectures" 
          element={
            <ProtectedLayout>
              <LecturesPage />
            </ProtectedLayout>
          } 
        />

        <Route 
          path="/lectures/:id" 
          element={
            <ProtectedLayout>
              <LectureDetail />
            </ProtectedLayout>
          } 
        />

        <Route 
          path="/editor" 
          element={
            <ProtectedLayout>
              <PythonEditor />
            </ProtectedLayout>
          } 
        />

        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/home" : "/auth"} replace />
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;