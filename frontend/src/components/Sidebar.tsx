import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="w-full md:w-60 min-h-[80px] md:min-h-screen bg-gray-900 text-white flex flex-row md:flex-col items-center md:items-start p-4 md:p-6 gap-2 md:gap-0">
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-8 tracking-wide">Dashboard</h2>
      <nav className="flex-1 w-full">
        <ul className="flex flex-row md:flex-col gap-2 md:gap-2 w-full">
          <li className="w-full">
            <Link
              to="/"
              className={`block rounded px-2 py-2 md:px-4 transition-colors font-medium hover:bg-gray-800 w-full text-center md:text-left ${location.pathname === '/' ? 'bg-gray-800' : ''}`}
            >
              Lista de Gastos
            </Link>
          </li>
          <li className="w-full">
            <Link
              to="/novo"
              className={`block rounded px-2 py-2 md:px-4 transition-colors font-medium hover:bg-gray-800 w-full text-center md:text-left ${location.pathname === '/novo' ? 'bg-gray-800' : ''}`}
            >
              Novo Gasto
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hidden md:block border-t border-gray-700 mt-8 pt-4 w-full">
        <p className="text-xs text-gray-400">© Mikael Pereira</p>
      </div>
    </aside>
  );
}
