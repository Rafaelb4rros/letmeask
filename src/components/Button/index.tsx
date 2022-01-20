import { ButtonHTMLAttributes } from "react";

import "./styles.scss";

type NewRoomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  highlight?: boolean;
};

export function Button({ highlight = false, ...props }: NewRoomButtonProps) {
  return (
    <button className={`newroom_btn ${highlight && "highlight"}`} {...props} />
  );
}
