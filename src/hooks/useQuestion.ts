import { FormEvent } from "react";
import { toast } from "react-toastify";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";
import { useConfirmationModal } from "./useConfirmationModal";

type useQuestionProps = {
  e: FormEvent;
  newQuestion: string;
  isAdmin: boolean;
  setNewQuestion: (newQuestion: string) => void;
};
type QuestionContent = {
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  id: string;
  likeCount: number;
  likeId: string | undefined;
};

export function useQuestion(roomId: string, question?: QuestionContent) {
  const { user } = useAuth();
  const { setDialogModalIsOpen } = useConfirmationModal();

  async function handleNewQuestion({
    e,
    newQuestion,
    isAdmin,
    setNewQuestion,
  }: useQuestionProps) {
    e.preventDefault();

    if (newQuestion.trim() === "" || !user) return;

    const question = {
      value: newQuestion,
      isHighlighted: false,
      isAnswered: false,

      author: {
        isAdmin: isAdmin,
        name: user.name,
        avatar: user.avatar,
      },
    };

    setNewQuestion("");

    try {
      await database.ref(`rooms/${roomId}/questions`).push(question);
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function handleSendLike(id: string, likeId: string | undefined) {
    if (!user) {
      toast.error("Voce precisa estar logado!");
      return;
    }
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${id}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${id}/likes`).push({
        authorId: user.id,
      });
    }
  }

  async function handleDeleteQuestion(questionId: string | null) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    toast.success("Mensagem deletada com sucesso!");
    setDialogModalIsOpen(false);
  }

  async function handleHighlightQuestion(questionId: string) {
    if (!question?.isHighlighted && !question?.isAnswered) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
      });
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: false,
      });
    }
  }

  async function handleMarkQuestionAsAnswered(questionId: string) {
    if (!question?.isAnswered) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true,
      });
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: false,
      });
    }
  }

  return {
    handleNewQuestion,
    handleSendLike,
    handleMarkQuestionAsAnswered,
    handleHighlightQuestion,
    handleDeleteQuestion,
  };
}
