import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Home } from "./components/Home";
import NoteState from "./context/notes/noteState";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
