import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex justify-center bg-indigo-900 text-white py-4">
      <div className="container flex justify-between items-center">
        <Link to="/home" className="txt-2x1 font-bold">
          Blog Pessoal
        </Link>

        <ul className="flex gap-6 text-lg">
          <li>
            <a href="#" className="hover:text-indigo-300 transition-colors">
              Postagens
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-300 transition-colors">
              Temas
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-300 transition-colors">
              Cadastrar
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-300 transition-colors">
              Perfil
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-400 transition-colors">
              Sair
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
