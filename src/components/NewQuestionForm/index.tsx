import { useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { toast } from "react-toastify";
import { Button } from "../Button";
import "./styles.scss";
import { useQuestion } from "../../hooks/useQuestion";

type RoomParams = {
  id: string;
};

export function NewQuestionForm() {
  const params = useParams() as RoomParams;
  const roomId: string = params.id;
  const { user, signInWithGoogle } = useAuth();
  const { questions, title, setNewQuestion, newQuestion, isAdmin } = useRoom(
    roomId,
    user
  );
  const { handleNewQuestion } = useQuestion(roomId);

  async function handleSignIn() {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <section className="page-content">
      <div>
        <h1>{title}</h1>
        <span>{questions.length} Pergunta(s)</span>
      </div>

      <form
        onSubmit={(e) =>
          handleNewQuestion({ e, isAdmin, newQuestion, setNewQuestion })
        }
      >
        <textarea
          disabled={!user}
          onChange={(e) => setNewQuestion(e.target.value)}
          value={newQuestion}
          placeholder="Oque voce quer perguntar?"
        />

        <div className="form-footer">
          {user ? (
            <div className="user-info">
              <img src={user.avatar} alt="User avatar" />
              <span>{user.name}</span>
            </div>
          ) : (
            <span>
              Para enviar uma pergunta,{" "}
              <button type="button" onClick={handleSignIn}>
                faca seu login
              </button>
              .
            </span>
          )}

          <Button type="submit" disabled={!user}>
            Enviar Pergunta
          </Button>
        </div>
      </form>
    </section>
  );
}
