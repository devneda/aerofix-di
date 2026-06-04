import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AvionesPage from "./pages/AvionesPage";
import AvionDetailPage from "./pages/AvionDetailPage";
import MecanicosPage from "./pages/MecanicosPage";
import AddAvionPage from "./pages/AddAvionPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Navigation />
        <main style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aviones" element={<AvionesPage />} />
            <Route path="/aviones/:matricula" element={<AvionDetailPage />} />
            <Route path="/mecanicos" element={<MecanicosPage />} />
            <Route path="/add-avion" element={<AddAvionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </>
  );
}
