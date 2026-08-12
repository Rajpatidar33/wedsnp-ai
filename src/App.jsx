import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";

function App() {
  return (
  <>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/gallery/:eventId" element={<Gallery />} />
    </Routes>
  </>
);
}

export default App;