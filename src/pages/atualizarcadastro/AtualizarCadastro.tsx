/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useContext,
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Usuario from "../../models/Usuario";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { atualizar, buscar } from "../../services/Service";
import { Eye, EyeOff } from "lucide-react"; // 👈 Ícones adicionados

function AtualizarCadastro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { usuario } = useContext(AuthContext);

  const [usuarioAtualizado, setUsuarioAtualizado] = useState<Usuario>(
    {} as Usuario
  );
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false); // 👈 Novo estado

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado!", "erro");
      navigate("/login");
    }
  }, [usuario.token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function buscarPorId(id: string) {
    try {
      await buscar(
        `/usuarios/buscarPorId/${id}`,
        (resposta: Usuario) => {
          const usuarioConvertido = {
            ...resposta,
            id: Number(id),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            usuario: (resposta as any).usuario ?? (resposta as any).email ?? "",
            senha: "",
          };
          setUsuarioAtualizado(usuarioConvertido);
        },
        {
          headers: {
            Authorization: usuario.token,
          },
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      ToastAlerta("Erro ao buscar usuário!", "erro");
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioAtualizado({
      ...usuarioAtualizado,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function atualizarCadastro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (usuarioAtualizado.senha !== confirmarSenha) {
      console.log("Objeto que vai ser enviado:", usuarioAtualizado);
      ToastAlerta("As senhas não coincidem", "erro");
      return;
    }

    try {
      await atualizar(
        `/usuarios/atualizar`,
        usuarioAtualizado,
        setUsuarioAtualizado,
        {
          headers: {
            Authorization: usuario.token,
          },
        }
      );

      ToastAlerta("Usuário atualizado com sucesso!", "sucesso");
      navigate("/perfil");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Objeto que vai ser enviado:", usuarioAtualizado);
      console.error("Erro ao atualizar:", error.response?.data);
      ToastAlerta("Erro ao atualizar usuário!", "erro");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={atualizarCadastro}
        className="flex flex-col gap-4 w-1/2 p-8 bg-white rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Atualizar Cadastro</h2>

        <div className="flex flex-col">
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={usuarioAtualizado.nome}
            onChange={atualizarEstado}
            className="border border-gray-400 rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="usuario">Usuário (email)</label>
          <input
            type="email"
            id="usuario"
            name="usuario"
            value={usuarioAtualizado.usuario}
            onChange={atualizarEstado}
            className="border border-gray-400 rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="foto">Foto (URL)</label>
          <input
            type="text"
            id="foto"
            name="foto"
            value={usuarioAtualizado.foto}
            onChange={atualizarEstado}
            className="border border-gray-400 rounded p-2"
          />
        </div>

        {/* Campo senha com botão de exibir/ocultar */}
        <div className="flex flex-col relative">
          <label htmlFor="senha">Senha</label>
          <input
            type={mostrarSenha ? "text" : "password"}
            id="senha"
            name="senha"
            value={usuarioAtualizado.senha}
            onChange={atualizarEstado}
            className="border border-gray-400 rounded p-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-2 top-9 text-gray-700"
          >
            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Campo confirmar senha com mesma lógica */}
        <div className="flex flex-col relative">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type={mostrarSenha ? "text" : "password"}
            id="confirmarSenha"
            name="confirmarSenha"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
            className="border border-gray-400 rounded p-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-2 top-9 text-gray-700"
          >
            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}

export default AtualizarCadastro;
