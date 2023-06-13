import { BrowserRouter } from "react-router-dom";

import '../../css/App.css';
import { Menu } from "./Menu";
import { Rutas } from "./Rutas";
import { Footer } from "./Footer";
import ModalDialog from "./ModalDialog";


function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <Rutas />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export { App };
