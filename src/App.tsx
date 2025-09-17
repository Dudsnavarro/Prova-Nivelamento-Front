import axios from 'axios'
import { useEffect, useState } from 'react';


const API = "http://localhost:3000";

interface Computador {
  id?: number;
  nome: string;
  cor: string;
  dataFabricacao: string; 
}

interface Perifericos {
  id?: number;
  nome: string;
  computador_id: number;
}

async function fetchComputador(): Promise<Computador[]> {
  const response = await fetch('http://localhost:3000/perifericos');
  const data = await response.json();
  return data;
}

function ComputadorList() {
  const [computador, setComputador] = useState<Computador[]>([]);
  useEffect(() => {
    fetchComputador().then((data) => setComputador(data));
  }, []);   return (
    <div>
      {computador.map((computador) => (
        <div key={computador.id}>
          <h2>{computador.nome}</h2>
          <p>{computador.dataFabricacao}</p>
          <p>{computador.cor}</p>
        </div>
      ))}
    </div>
  );
}

function App() {

  return (
    <>
      <div>
      <h1>CRUD Computadores & Periféricos</h1>

      <h2>Computadores</h2>
      <input placeholder="Nome"/>
      <input placeholder="Cor" />
      <input type="date" />
      <input placeholder="ID" />
      <button >Criar</button>
      <button >Listar</button>
      <button >Buscar</button>
      <button >Alterar</button>
      <button >Deletar</button>
      <ul></ul>

      <h2>Periféricos</h2>
      <input placeholder="Nome"/>
      <input placeholder="ID Computador" />
      <input placeholder="ID"/>
      <button >Criar</button>
      <button >Listar</button>
      <button >Buscar</button>
      <button >Alterar</button>
      <button >Deletar</button>
      <ul>{}</ul>
    </div>

    </>
  )
}

export default App
