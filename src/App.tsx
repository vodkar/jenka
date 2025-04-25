import { Route, Routes } from "react-router";
import Project from "./pages/project";
import Root from "./pages/root";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/projects/:projectId" element={<Project />} />
    </Routes>
  );
}

export default App