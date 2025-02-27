import "./App.css";
import Header from "../src/components/header/header.jsx";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Outlet/>
    </>
  );
}

export default App;
