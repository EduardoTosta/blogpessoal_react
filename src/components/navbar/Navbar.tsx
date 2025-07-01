import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  function logout() {
    handleLogout();
    ToastAlerta("O usuário foi desconectado com sucesso!", "info");
    navigate("/login");
  }

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return usuario.token !== "" ? (
    <div className="w-full bg-indigo-900 text-white flex justify-center py-4">
      <div className="container flex justify-between text-lg items-center">
        <Link to="/home" className="text-2xl font-bold">
          Blog Pessoal
        </Link>

        <div className="flex gap-4 items-center relative">
          <Link to="/postagens" className="hover:underline">
            Postagens
          </Link>
          <Link to="/temas" className="hover:underline">
            Temas
          </Link>
          <Link to="/cadastrartema" className="hover:underline">
            Cadastrar tema
          </Link>
          <span
            onClick={() => setOpenDropdown(!openDropdown)}
            className="cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={usuario.foto}
              alt="Foto do usuário"
              className="w-full h-full object-cover"
            />
          </span>

          {openDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-16 bg-white text-indigo-900 rounded shadow-md w-48 z-50"
            >
              <Link
                to="/perfil"
                className="block px-4 py-2 hover:bg-indigo-100 border-b"
              >
                Perfil
              </Link>
              <Link
                to={`/atualizarcadastro/${usuario.id}`}
                className="block px-4 py-2 hover:bg-indigo-100 border-b"
              >
                Atualizar Cadastro
              </Link>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default Navbar;
