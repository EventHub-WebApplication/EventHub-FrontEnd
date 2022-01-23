import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import NewEvent from "./components/NewEvent";
import Login from "./components/Login";
import MyEvent from "./components/MyEvent";
import Registration from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth"


function App() {
  return (

    <AuthProvider>
      <Routes>
        <Route path="/myevent" element={<ProtectedRoute><MyEvent /></ProtectedRoute>} />
        <Route path="/new" element={<ProtectedRoute><NewEvent /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </AuthProvider>

  );
}

export default App;
