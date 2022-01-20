import "./styles.scss";

import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { RoomCode } from "../../components/RoomCode";

import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";
import { ConfirmationModal } from "../../components/Modal";
import { useConfirmationModal } from "../../hooks/useConfirmationModal";
import { NoQuestionsSection } from "../../components/NoQuestionsSection";
import { NewQuestionForm } from "../../components/NewQuestionForm";

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams() as RoomParams;
  const { user } = useAuth();
  const { questions, isAdmin, handleDeleteRoom } = useRoom(params.id, user);

  const {
    onConfirmDelete,
    dialog,
    onSubmit,
    params: onSubmitParams,
    context,
  } = useConfirmationModal();

  return (
    <>
      <ConfirmationModal
        dialog={dialog}
        onConfirm={onSubmit}
        params={onSubmitParams}
        context={context}
      />

      <main id="page-room">
        <header className="page-header">
          <div className="content">
            <img src={logoImg} alt="Logo" />
            <div className="btn_container">
              <RoomCode code={params.id} />
              {isAdmin && (
                <Button
                  onClick={() =>
                    onConfirmDelete({
                      context: "DeleteRoom",
                      dialog: "Tem certeza que você deseja encerrar esta sala?",
                      onConfirm: () => handleDeleteRoom,
                      onConfirmParams: params.id,
                    })
                  }
                  type="button"
                  highlight
                >
                  Encerrar Sala
                </Button>
              )}
            </div>
          </div>
        </header>

        <NewQuestionForm />

        <div className="page-footer">
          {questions.length >= 1 ? (
            questions.map((question) => (
              <Question
                roomId={params.id}
                key={question.id}
                question={question}
                author={question.author}
                isAdmin={isAdmin}
              />
            ))
          ) : (
            <NoQuestionsSection user={user} />
          )}
        </div>
      </main>
    </>
  );
}
