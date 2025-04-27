import { Route, Routes } from "react-router";
import DatasourcesPage from "./pages/datasource";
import Root from "./pages/root";
import { WorkersPage } from "./pages/workers";

function App() {
  return (
    <Routes>
      <Route index element={<Root />} />
      <Route path="datasources" element={<DatasourcesPage />} />
      <Route path="workers" element={<WorkersPage />} />
    </Routes>
  );
}

export default App