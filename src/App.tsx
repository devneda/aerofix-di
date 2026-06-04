import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AvionesPage from "./pages/AvionesPage";
import AvionDetailPage from "./pages/AvionDetailPage";
import MecanicosPage from "./pages/MecanicosPage";
import AddAvionPage from "./pages/AddAvionPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";

import AdminDashboard from "./pages/AdminDashboard";
import MecanicoDashboard from "./pages/MecanicoDashboard";

function AppRoutes() {
  const { token, user, loadingSession, logout } = useAuth();

  return (
    <BrowserRouter>
      <Navigation token={token} user={user} onLogout={logout} />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/dashboard-admin" element={
            <RequireAuth token={token} loadingSession={loadingSession}>
              <RequireRole token={token} user={user} allowedRoles={["admin"]}>
                <AdminDashboard />
              </RequireRole>
            </RequireAuth>
          } />

          <Route path="/dashboard-mecanico" element={
            <RequireAuth token={token} loadingSession={loadingSession}>
              <RequireRole token={token} user={user} allowedRoles={["mecanico"]}>
                <MecanicoDashboard />
              </RequireRole>
            </RequireAuth>
          } />
          <Route path="/aviones" element={
            <RequireAuth token={token} loadingSession={loadingSession}>
              <AvionesPage />
            </RequireAuth>
          } />
          
          <Route path="/aviones/:matricula" element={
            <RequireAuth token={token} loadingSession={loadingSession}>
              <AvionDetailPage />
            </RequireAuth>
          } />
          
          <Route path="/mecanicos" element={
            <RequireAuth token={token} loadingSession={loadingSession}>
              <MecanicosPage />
            </RequireAuth>
          } />
          
          <Route path="/add-avion" element={
            <RequireAuth token={token} loadingSession={loadingSession}>
              <RequireRole token={token} user={user} allowedRoles={["admin"]}>
                <AddAvionPage />
              </RequireRole>
            </RequireAuth>
          } />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <AppRoutes />
    </AuthProvider>
  );
}
