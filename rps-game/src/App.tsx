import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Result from "./pages/Result";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="game" element={<Game />} />
        <Route path="game/result" element={<Result />} />
      </Route>
    </Routes>
  );
}

export default App;
