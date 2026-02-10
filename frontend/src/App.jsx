import Mainroutes from "./routes/Mainroutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
const App = () => {
  const lenis = new Lenis({
    autoRaf: true,
  });

  return (
    <div>
      <Navbar/>
      <Mainroutes />
      <ToastContainer />
    </div>
  );
};

export default App;
