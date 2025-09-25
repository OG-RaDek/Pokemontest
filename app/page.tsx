"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const characters = [
  { name: "Luke Skywalker", side: "Jedi", img: "/luke.jpg" },
  { name: "Yoda", side: "Jedi", img: "/yoda.jpg" },
  { name: "Obi-Wan Kenobi", side: "Jedi", img: "/obiwan.jpg" },
  { name: "Darth Vader", side: "Sith", img: "/vader.jpg" },
  { name: "Darth Sidious", side: "Sith", img: "/sidious.jpg" },
  { name: "Darth Maul", side: "Sith", img: "/maul.jpg" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    const res = await fetch(`https://swapi.dev/api/people/?search=${search}`);
    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div className="font-sans min-h-screen p-8 bg-black text-yellow-300">
      <main className="flex flex-col gap-10 items-center">
        {/* Título */}
        <h1 className="text-4xl font-bold text-center">Star Wars Database</h1>

        {/* Buscador */}
        <div className="flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Busca un personaje (ej: Luke)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300"
          >
            Buscar
          </button>
        </div>

        {/* Resultados */}
        {results.length > 0 && (
          <div className="bg-gray-900 p-4 rounded-lg w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-2">Resultados:</h2>
            <ul className="space-y-2">
              {results.map((char) => (
                <li
                  key={char.name}
                  className="bg-gray-800 p-2 rounded-lg border border-yellow-500"
                >
                  <p className="font-bold">{char.name}</p>
                  <p className="text-sm">Altura: {char.height} cm</p>
                  <p className="text-sm">Peso: {char.mass} kg</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Galería de Jedi y Sith */}
        <section className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Principales Jedi y Sith
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {characters.map((char) => (
              <div
                key={char.name}
                className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-yellow-500"
              >
                <Image
                  src={char.img}
                  alt={char.name}
                  width={300}
                  height={300}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold">{char.name}</h3>
                  <p className="text-sm text-gray-400">{char.side}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
