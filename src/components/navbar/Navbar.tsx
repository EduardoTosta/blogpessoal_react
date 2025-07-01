import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, type ReactNode } from "react";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O usuário foi desconectado com sucesso!", "info");
    navigate("/login");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div
        className="w-full bg-indigo-900 text-white
                flex justify-center py-4"
      >
        <div className="container flex justify-between text-lg">
          <Link to="/home" className="text-2xl font-bold">
            {" "}
            Blog Pessoal{" "}
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/postagens" className="hover:underline">
              Postagens
            </Link>
            <Link to="/temas" className="hover:underline">
              Temas
            </Link>
            <Link to="/cadastrartema" className="hover:underline">
              Cadastrar tema
            </Link>
            <Link to="" onClick={logout} className="hover-underline">
              Sair
            </Link>
            <Link
              to="/perfil"
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={usuario.foto}
                alt="Foto do usuário"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;
