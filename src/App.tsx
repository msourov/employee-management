import { Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import EmployeeCards from "./pages/EmployeeCards";
import EmployeeTable from "./pages/EmployeeTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<EmployeeTable />} />
        <Route path="/card" element={<EmployeeCards />} />
      </Route>
    </Routes>
  );
}

export default App;
