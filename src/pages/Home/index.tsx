import { useNavigate } from "react-router-dom";

import "./styles.scss";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleLogo from "../../assets/images/google-icon.svg";
import LogInIcon from "../../assets/images/log-in.svg";

import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useState } from "react";

import { database } from "../../services/firebase";
import { Button } from "../../components/Button";

export function Home() {
  const navigateTo = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [joinRoom, setJoinRoom] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      try {
        await signInWithGoogle();
      } catch (err: any) {
        toast.error(err.message);
        return;
      }
    }
    navigateTo("rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();
    if (joinRoom.trim() === "") return;

    const room = await database.ref(`rooms/${joinRoom}`).get();

    if (!room.exists()) {
      toast.error("Room does not exists!");
      setJoinRoom("");
      return;
    }

    navigateTo(`rooms/${room.key}`);
  }
  return (
    <>
      <main id="page-auth">
        <aside>
          <img
            src={illustrationImg}
            alt="Ilustração de perguntas e respostas"
          />
          <strong>Toda pergunta tem uma resposta.</strong>
          <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
        </aside>
        <section>
          <div className="main_content">
            <img src={logoImg} alt="Letmeask Logo" />
            <button
              onClick={handleCreateRoom}
              className="create-room_btn"
              type="button"
            >
              <img src={googleLogo} alt="Google logo" />
              Crie sua sala com o google
            </button>
            <div className="wrapper">Ou entre em uma sala</div>
            <form onSubmit={handleJoinRoom}>
              <input
                onChange={(e) => setJoinRoom(e.target.value)}
                type="text"
                placeholder="Digite o código da sala"
                value={joinRoom}
              />
              <Button type="submit">
                <img src={LogInIcon} alt="Login icon" />
                Entrar na sala
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
