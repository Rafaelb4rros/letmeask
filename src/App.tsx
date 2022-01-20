import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { AuthContextProvider } from "./contexts/AuthContext";
import { DialogModalContextProvider } from "./contexts/DialogModalContext";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AuthContextProvider>
          <DialogModalContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="rooms/new" element={<NewRoom />} />
              <Route path="rooms/:id" element={<Room />} />
            </Routes>
          </DialogModalContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
