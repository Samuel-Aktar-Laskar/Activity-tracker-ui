import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainHome from './Pages/MainHome';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<MainHome/>} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
