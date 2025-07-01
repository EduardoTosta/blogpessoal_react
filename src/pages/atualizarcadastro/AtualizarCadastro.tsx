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

function AtualizarCadastro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { usuario } = useContext(AuthContext);

  const [usuarioAtualizado, setUsuarioAtualizado] = useState<Usuario>(
    {} as Usuario
  );
  const [confirmarSenha, setConfirmarSenha] = useState("");

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
            usuario: (resposta as any).usuario ?? (resposta as any).email ?? "", // converte de "email" para "usuario", se necessário
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

  async function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
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

        <div className="flex flex-col">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={usuarioAtualizado.senha}
            onChange={atualizarEstado}
            className="border border-gray-400 rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
            className="border border-gray-400 rounded p-2"
          />
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
