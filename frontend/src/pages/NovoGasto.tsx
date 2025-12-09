import { useState } from "react";
import axios from "axios";


export default function NovoGasto() {
  const [descricao, setDescricao] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [valor, setValor] = useState<string>("");
  const [data, setData] = useState<string>(new Date().toISOString().slice(0, 10));

  const salvar = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/gastos", {
        descricao,
        categoria,
        valor: parseFloat(valor),
        data
      });

      alert("Gasto cadastrado!");
      setDescricao("");
      setCategoria("");
      setValor("");
      setData(new Date().toISOString().slice(0, 10));
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar gasto!");
    }
  };

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Cadastrar Novo Gasto</h1>
      <form
        className="bg-white rounded shadow p-6 flex flex-col gap-4 w-full max-w-xs"
        onSubmit={e => { e.preventDefault(); salvar(); }}
      >
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Descrição</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Categoria</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Valor</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            value={valor}
            onChange={e => setValor(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Data</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
