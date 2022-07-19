import Login from "./components/Login";

import { useAuthState } from "react-firebase-hooks/auth";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { auth } from "./Firebase";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {user ? (
            <Route path='/' element={<Main />} />
          ) : (
            <Route path='/' element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
