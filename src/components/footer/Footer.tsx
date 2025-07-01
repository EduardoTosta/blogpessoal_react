import { FacebookLogo, InstagramLogo, LinkedinLogo } from "phosphor-react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
  const data = new Date().getFullYear();

  const { usuario } = useContext(AuthContext);

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">
            Blog Pessoal Generation | &copy; {data}
          </p>
          <p className="text-lg mb-2">Acesse nossas redes sociais</p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/eduardotosta-/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <LinkedinLogo size={40} weight="bold" />
            </a>
            <a
              href="https://www.instagram.com/edu_tosta001"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              <InstagramLogo size={40} weight="bold" />
            </a>
            <a
              href="https://www.facebook.com/eduardo.tosta.180?locale=pt_BR"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FacebookLogo size={40} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Footer;
