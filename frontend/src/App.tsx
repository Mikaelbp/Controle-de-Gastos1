import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Gastos from "./pages/Gastos";
import NovoGasto from "./pages/NovoGasto";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Gastos />} />
            <Route path="/novo" element={<NovoGasto />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
