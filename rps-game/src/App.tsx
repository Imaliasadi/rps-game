import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Game from "./pages/Game";
import SignUp from "./pages/SignUp";
import Result from "./pages/Result";
import Layout from "./Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="game"
          element={
            <PrivateRoute>
              <Game />
            </PrivateRoute>
          }
        />
        <Route
          path="game/result"
          element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
