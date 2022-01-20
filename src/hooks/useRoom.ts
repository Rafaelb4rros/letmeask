import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { database } from "../services/firebase";
import { sort } from "../utils/sort";
import { useConfirmationModal } from "./useConfirmationModal";

type FirebaseQuestions = Record<
  string,
  {
    id: string;
    author: {
      name: string;
      avatar: string;
      isAdmin: boolean;
    };

    likeCount: number;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;

    isHighlighted: boolean;
    isAnswered: boolean;
    value: string;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
    isAdmin: boolean;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
  content: string;
  likeCount: number;
  likeId: string | undefined;
};

type User = {
  id: string;
  avatar: string;
  name: string;
};

export function useRoom(roomId: string, user: User | undefined) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const navigateTo = useNavigate();
  const { setDialogModalIsOpen } = useConfirmationModal();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    const questionRef = database.ref(`rooms/${roomId}/questions`);

    roomRef.get().then((room) => {
      const roomOwnerId = room.child("owner").val();
      setIsAdmin(roomOwnerId === user?.id);
      setTitle(room.child("name").val());
    });

    roomRef.on("value", (room) => {
      const data = room.val();
      if (!data) {
        navigateTo("/");
        return;
      }

      return () => {
        roomRef.off("value");
      };
    });

    questionRef.on("value", (question) => {
      const data = question.val();
      const firebaseRoom = data as FirebaseQuestions;
      const parsedData = Object.entries(firebaseRoom ?? {}).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.value,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, value]) => value.authorId === user?.id
            )?.[0],
          };
        }
      );

      sort(parsedData);
      setQuestions(parsedData);

      return () => {
        questionRef.off("value");
      };
    });
  }, [roomId, navigateTo, user]);

  async function handleDeleteRoom(id: string) {
    await database.ref(`rooms/${id}`).remove();
    toast.success("Sala deletada com sucesso!");
    setDialogModalIsOpen(false);
  }

  return {
    questions,
    title,
    setQuestions,
    isAdmin,
    setNewQuestion,
    newQuestion,
    navigateTo,
    handleDeleteRoom,
  };
}
