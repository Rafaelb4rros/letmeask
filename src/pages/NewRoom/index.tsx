import "./styles.scss";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";

export function NewRoom() {
  const navigateTo = useNavigate();
  const [newRoom, setNewRoom] = useState("");
  const { user } = useAuth();

  async function handleNewRoom(e: FormEvent) {
    e.preventDefault();

    if (!user || newRoom.trim() === "") return;

    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      name: newRoom,
      owner: user.id,
    });
    setNewRoom("");
    navigateTo(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <main id="page-newroom">
      <aside>
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <section>
        <div className="main_content">
          <img src={logoImg} alt="Letmeask Logo" />
          <h2 className="wrapper">Crie uma nova sala</h2>
          <form onSubmit={handleNewRoom}>
            <input
              onChange={(e) => setNewRoom(e.target.value)}
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala já existente?
            <Link to="/">Clique aqui!</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
