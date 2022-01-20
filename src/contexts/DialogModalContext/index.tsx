import { createContext, ReactNode, useState } from "react";
export const DialogModalContext = createContext({} as DialogModalContextData);

type DialogModalContextProps = {
  children: ReactNode;
};

type DialogModalContextData = {
  dialogModalIsOpen: boolean;
  dialog: string;
  params: any;
  onSubmit: any;
  context: string;
  setContext: (context: string) => void;
  setOnSubmit: (value: any) => void;
  setParams: (value: any) => void;
  setDialogModalIsOpen: (dialogModalIsOpen: boolean) => void;
  closeDialogModal: () => void;
  setDialog: (dialog: string) => void;
};

export function DialogModalContextProvider(props: DialogModalContextProps) {
  const [dialogModalIsOpen, setDialogModalIsOpen] = useState(false);
  const [dialog, setDialog] = useState("");
  const [params, setParams] = useState() as any;
  const [onSubmit, setOnSubmit] = useState() as any;
  const [context, setContext] = useState("");

  function closeDialogModal() {
    setDialogModalIsOpen(false);
  }

  return (
    <DialogModalContext.Provider
      value={{
        context,
        setContext,
        dialogModalIsOpen,
        setDialogModalIsOpen,
        closeDialogModal,
        setDialog,
        dialog,
        params,
        setParams,
        setOnSubmit,
        onSubmit,
      }}
    >
      {props.children}
    </DialogModalContext.Provider>
  );
}
