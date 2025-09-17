import { useEffect, useState } from "react";
import api from "../api/api";

interface Computador {
  id: number;
  nome: string;
  cor: string;
  dataFabricacao: string;
}

export default function Computadores() {
  const [computadores, setComputadores] = useState<Computador[]>([]);
  const [novo, setNovo] = useState({ nome: "", cor: "", dataFabricacao: "" });
  const [idBusca, setIdBusca] = useState<number | null>(null);
  const [resultado, setResultado] = useState<Computador | null>(null);

  const carregar = async () => {
    const res = await api.get("/computador");
    setComputadores(res.data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const criar = async () => {
    await api.post("/computador", novo);
    setNovo({ nome: "", cor: "", dataFabricacao: "" });
    carregar();
  };

  const remover = async (id: number) => {
    await api.delete(`/computador/${id}`);
    carregar();
  };

  const buscar = async () => {
    if (idBusca) {
      const res = await api.get(`/computador/${idBusca}`);
      setResultado(res.data);
    }
  };

  return (
    <div>
      <h2>Computadores</h2>

      <ul>
        {computadores.map((c) => (
          <li key={c.id}>
            {c.nome} - {c.cor} - {c.dataFabricacao}
            <button onClick={() => remover(c.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <h3>Novo Computador</h3>
      <input
        placeholder="Nome"
        value={novo.nome}
        onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
      />
      <input
        placeholder="Cor"
        value={novo.cor}
        onChange={(e) => setNovo({ ...novo, cor: e.target.value })}
      />
      <input
        type="date"
        value={novo.dataFabricacao}
        onChange={(e) => setNovo({ ...novo, dataFabricacao: e.target.value })}
      />
      <button onClick={criar}>Criar</button>

      <h3>Buscar por ID</h3>
      <input
        type="number"
        value={idBusca ?? ""}
        onChange={(e) => setIdBusca(Number(e.target.value))}
      />
      <button onClick={buscar}>Buscar</button>
      {resultado && (
        <div>
          Encontrado: {resultado.nome} - {resultado.cor}
        </div>
      )}
    </div>
  );
}
