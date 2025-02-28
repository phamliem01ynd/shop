import "./App.css";
import Header from "../src/components/header/header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/footer.jsx";
function App() {
  return (
    <>
      <Header />
      <Outlet/>
      <Footer/>
    </>
  );
}

export default App;
