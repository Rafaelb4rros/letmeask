import "./styles.scss";

import deleteImg from "../../assets/images/delete.svg";
import answerImg from "../../assets/images/answer.svg";
import checkImg from "../../assets/images/check.svg";

import { useConfirmationModal } from "../../hooks/useConfirmationModal";
import { useQuestion } from "../../hooks/useQuestion";

type QuestionContent = {
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  id: string;
  likeCount: number;
  likeId: string | undefined;
};

type QuestionProps = {
  question: QuestionContent;
  roomId: string;
  isAdmin: boolean;
  author: {
    name: string;
    avatar: string;
    isAdmin: boolean;
  };
};

export function Question({ roomId, question, author, isAdmin }: QuestionProps) {
  const { onConfirmDelete } = useConfirmationModal();

  const {
    handleDeleteQuestion,
    handleHighlightQuestion,
    handleMarkQuestionAsAnswered,
    handleSendLike,
  } = useQuestion(roomId, question);

  return (
    <>
      <div
        className={`question ${
          question.isHighlighted && !question.isAnswered && "highlight"
        } ${question.isAnswered && "answered"}`}
      >
        <div className="question-content">
          <p>{question.content}</p>
        </div>

        <footer className="question-footer">
          <div className="question-user-info">
            <img src={author.avatar} alt="User avatar" />
            <span className="user-name">{author.name}</span>
            {author.isAdmin && <span className="user-emphasis">Admin</span>}
          </div>

          <div className="question-btn_container">
            {!question.isAnswered && !question.isHighlighted && (
              <button
                onClick={() => handleSendLike(question.id, question.likeId)}
                aria-label="Marcar como gostei"
                type="button"
              >
                <span>{question.likeCount > 0 && question.likeCount}</span>
                <svg
                  className={`${question.likeId && "liked"}`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                    stroke="#737380"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            {isAdmin && (
              <>
                <button
                  onClick={() =>
                    onConfirmDelete({
                      context: "DeleteQuestion",
                      dialog:
                        "Tem certeza que você deseja excluir esta pergunta?",
                      onConfirm: () => handleDeleteQuestion,
                      onConfirmParams: question.id,
                    })
                  }
                  type="button"
                >
                  <img src={deleteImg} alt="Delete" />
                </button>

                <button
                  onClick={() => handleHighlightQuestion(question.id)}
                  type="button"
                >
                  <img src={answerImg} alt="highlight" />
                </button>

                <button
                  onClick={() => handleMarkQuestionAsAnswered(question.id)}
                  type="button"
                >
                  <img src={checkImg} alt="answered" />
                </button>
              </>
            )}
          </div>
        </footer>
      </div>
    </>
  );
}
