import { useEffect, useState } from "react";
import api from "../api/api";

interface Periferico {
  id: number;
  nome: string;
  computador_id: number;
}

export default function Perifericos() {
  const [perifericos, setPerifericos] = useState<Periferico[]>([]);
  const [novo, setNovo] = useState({ nome: "", computador_id: 0 });
  const [idBusca, setIdBusca] = useState<number | null>(null);
  const [resultado, setResultado] = useState<Periferico | null>(null);

  const carregar = async () => {
    const res = await api.get("/perifericos");
    setPerifericos(res.data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const criar = async () => {
    await api.post("/perifericos", novo);
    setNovo({ nome: "", computador_id: 0 });
    carregar();
  };

  const remover = async (id: number) => {
    await api.delete(`/perifericos/${id}`);
    carregar();
  };

  const buscar = async () => {
    if (idBusca) {
      const res = await api.get(`/perifericos/${idBusca}`);
      setResultado(res.data);
    }
  };

  return (
    <div>
      <h2>Periféricos</h2>

      <ul>
        {perifericos.map((p) => (
          <li key={p.id}>
            {p.nome} - Computador {p.computador_id}
            <button onClick={() => remover(p.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <h3>Novo Periférico</h3>
      <input
        placeholder="Nome"
        value={novo.nome}
        onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
      />
      <input
        type="number"
        placeholder="Computador ID"
        value={novo.computador_id}
        onChange={(e) =>
          setNovo({ ...novo, computador_id: Number(e.target.value) })
        }
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
          Encontrado: {resultado.nome} - Computador {resultado.computador_id}
        </div>
      )}
    </div>
  );
}
