
import Mainroutes from './routes/Mainroutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <Mainroutes/>
      <ToastContainer/>
    </div>
  )
}

export default App