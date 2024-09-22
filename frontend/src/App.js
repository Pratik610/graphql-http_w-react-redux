import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import EditPostScreen from "./screens/EditPostScreen";
import SignupScreen from "./screens/SignupScreen";
function App() {
  return (
    <Router>
      <Routes>
        <Route Component={LoginScreen} path="/login" />
        <Route Component={SignupScreen} path="/sign-up" />
        <Route Component={HomeScreen} path="/" />
        <Route Component={CreatePostScreen} path="/create" />
        <Route Component={EditPostScreen} path="/post/:id" />
      </Routes>
    </Router>
  );
}

export default App;
