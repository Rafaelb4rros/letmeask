import Modal from "react-modal";
import { useConfirmationModal } from "../../hooks/useConfirmationModal";
import "./styles.scss";

Modal.setAppElement("body");

type ConfirmationModalProps = {
  onConfirm: (confirmationParams: any) => void;
  params: any;
  dialog: string;
  context: string;
};

export function ConfirmationModal({
  onConfirm,
  params,
  dialog,
  context,
}: ConfirmationModalProps) {
  const { setDialogModalIsOpen, dialogModalIsOpen, closeDialogModal } =
    useConfirmationModal();

  return (
    <Modal
      className="ConfirmationModal"
      overlayClassName="overlay"
      onRequestClose={closeDialogModal}
      isOpen={dialogModalIsOpen}
    >
      {setDialogModalIsOpen && (
        <div className="modalContent">
          <div className="modalText">
            {context === "DeleteQuestion" ? (
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5.99988H5H21"
                  stroke="#737380"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                  stroke="#737380"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.6599 18.34L18.3399 29.66"
                  stroke="#E73F5D"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M29.6599 29.66L18.3399 18.34"
                  stroke="#E73F5D"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 42V42C14.058 42 6 33.942 6 24V24C6 14.058 14.058 6 24 6V6C33.942 6 42 14.058 42 24V24C42 33.942 33.942 42 24 42Z"
                  stroke="#E73F5D"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {context === "DeleteQuestion" ? (
              <h1>Excluir Pergunta</h1>
            ) : (
              <h1>Encerrar sala</h1>
            )}
            <span>{dialog}</span>
          </div>

          <div className="controlsContainer">
            <button
              className="cancelBtn"
              onClick={() => setDialogModalIsOpen(false)}
            >
              Cancelar
            </button>
            <button className="confirmBtn" onClick={() => onConfirm(params)}>
              Sim, {context === "DeleteQuestion" ? " Excluir" : " Encerrar"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
