import noQuestionsImg from "../../assets/images/empty-questions.svg";
import "./styles.scss";

export function NoQuestionsSection({ user }: any) {
  return (
    <div className="noQuestionsSection">
      <img
        className="noQuestionsImg"
        src={noQuestionsImg}
        alt="This room has no questions for now"
      />
      <h2>Nenhuma pergunta por aqui...</h2>
      {user ? (
        <span>Seja a primeira pessoa a fazer uma pergunta!</span>
      ) : (
        <span>
          Faca o seu login e seja a primeira pessoa a fazer uma pergunta!
        </span>
      )}
    </div>
  );
}
