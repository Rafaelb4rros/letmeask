import { useContext, useEffect } from "react";
import { DialogModalContext } from "../contexts/DialogModalContext";

type useConfirmationModalProps = {
  context: string;
  dialog: string;
  onConfirm: (value: any) => void;
  onConfirmParams: any;
};

export function useConfirmationModal() {
  const {
    dialogModalIsOpen,
    setOnSubmit,
    setDialog,
    setParams,
    setContext,
    setDialogModalIsOpen,
    closeDialogModal,
    dialog,
    params,
    onSubmit,
    context,
  } = useContext(DialogModalContext);

  function onConfirmDelete({
    onConfirm,
    dialog,
    onConfirmParams,
    context,
  }: useConfirmationModalProps) {
    setParams(onConfirmParams);
    setOnSubmit(onConfirm);
    setDialog(dialog);
    setContext(context);
    setDialogModalIsOpen(true);
  }

  useEffect(() => {
    if (!dialogModalIsOpen) {
      setParams("");
      setOnSubmit(null);
      setDialog("");
      setContext("");
    }
  }, [dialogModalIsOpen, setParams, setOnSubmit, setDialog, setContext]);

  return {
    onConfirmDelete,
    setDialogModalIsOpen,
    dialog,
    onSubmit,
    dialogModalIsOpen,
    closeDialogModal,
    params,
    context,
  };
}
