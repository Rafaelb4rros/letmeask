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

export function sort(arr: QuestionType[]) {
  arr.forEach((question) => {
    if (question.isHighlighted) {
      question.likeCount = 9999999;
    }
    if (question.isAnswered) {
      question.likeCount = -1;
    }
  });
  return arr.sort((a: any, b: any) => -a.likeCount + b.likeCount);
}
