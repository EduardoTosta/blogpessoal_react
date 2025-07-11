import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ListaTemas from "./components/temas/listatemas/ListaTemas";
import FormTema from "./components/temas/formtema/FormTema";
import DeletarTema from "./components/temas/deletartema/DeletarTema";
import ListaPostagens from "./components/postagens/listapostagens/ListaPostagens";
import FormPostagem from "./components/postagens/formpostagem/FormPostagem";
import DeletarPostagem from "./components/postagens/deletarpostagem/DeletarPostagem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Perfil from "./pages/perfil/Perfil";
import AtualizarCadastro from "./pages/atualizarcadastro/AtualizarCadastro";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
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
                <Route path="/temas" element={<ListaTemas />} />
                <Route path="/cadastrartema" element={<FormTema />} />
                <Route path="/editartema/:id" element={<FormTema />} />
                <Route path="/deletartema/:id" element={<DeletarTema />} />
                <Route path="/postagens" element={<ListaPostagens />} />
                <Route path="/cadastrarpostagem" element={<FormPostagem />} />
                <Route path="/editarpostagem/:id" element={<FormPostagem />} />
                <Route
                  path="/deletarpostagem/:id"
                  element={<DeletarPostagem />}
                />
                <Route path="/perfil" element={<Perfil />} />
                <Route
                  path="/atualizarcadastro/:id"
                  element={<AtualizarCadastro />}
                />
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
