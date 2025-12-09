import { useEffect, useState } from "react";
import axios from "axios";


interface Gasto {
  id: number;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
}

export default function Gastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [deletando, setDeletando] = useState<number | null>(null);
  const deletarGasto = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja deletar este gasto?")) return;
    setDeletando(id);
    try {
      await axios.delete(`http://127.0.0.1:8000/gastos/${id}`);
      setGastos(gastos => gastos.filter(g => g.id !== id));
    } catch (err) {
      alert("Erro ao deletar gasto!");
    } finally {
      setDeletando(null);
    }
  };

  const loadData = async () => {
    const res = await axios.get<Gasto[]>("http://127.0.0.1:8000/gastos");
    setGastos(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const gastosFiltrados = categoriaFiltro.trim() === ""
    ? gastos
    : gastos.filter(g => g.categoria.toLowerCase().includes(categoriaFiltro.toLowerCase()));

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Lista de Gastos</h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center">
        <input
          type="text"
          placeholder="Filtrar por categoria..."
          className="border rounded px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={categoriaFiltro}
          onChange={e => setCategoriaFiltro(e.target.value)}
        />
      </div>
      <div className="rounded shadow bg-white">
        {/* Cabeçalho responsivo */}
        <div className="hidden md:grid grid-cols-5 bg-gray-100 text-gray-700 font-semibold text-sm">
          <div className="px-4 py-2">ID</div>
          <div className="px-4 py-2">Descrição</div>
          <div className="px-4 py-2">Valor</div>
          <div className="px-4 py-2">Categoria</div>
          <div className="px-4 py-2">Data</div>
        </div>
        <div className="flex flex-col gap-2">
          {gastosFiltrados.map((g) => (
            <div
              key={g.id}
              className="grid grid-cols-1 md:grid-cols-6 border-b last:border-b-0 hover:bg-gray-50 text-sm items-center"
            >
              {/* Mobile: label + valor, Desktop: só valor */}
              <div className="px-4 py-2 md:py-3 flex md:block">
                <span className="md:hidden font-semibold text-gray-500 w-28">ID:</span>
                <span>{g.id}</span>
              </div>
              <div className="px-4 py-2 md:py-3 flex md:block">
                <span className="md:hidden font-semibold text-gray-500 w-28">Descrição:</span>
                <span>{g.descricao}</span>
              </div>
              <div className="px-4 py-2 md:py-3 flex md:block">
                <span className="md:hidden font-semibold text-gray-500 w-28">Valor:</span>
                <span>R$ {g.valor.toFixed(2)}</span>
              </div>
              <div className="px-4 py-2 md:py-3 flex md:block">
                <span className="md:hidden font-semibold text-gray-500 w-28">Categoria:</span>
                <span>{g.categoria}</span>
              </div>
              <div className="px-4 py-2 md:py-3 flex md:block">
                <span className="md:hidden font-semibold text-gray-500 w-28">Data:</span>
                <span>{g.data}</span>
              </div>
              <div className="px-4 py-2 md:py-3 flex md:block justify-end">
                <button
                  className="text-red-600 hover:text-red-800 font-semibold px-2 py-1 rounded border border-red-200 hover:bg-red-50 transition disabled:opacity-50"
                  onClick={() => deletarGasto(g.id)}
                  disabled={deletando === g.id}
                  title="Deletar"
                >
                  {deletando === g.id ? '...' : 'Deletar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
