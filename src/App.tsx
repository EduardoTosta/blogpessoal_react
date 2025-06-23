import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <div className="min-h-[80vh]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
