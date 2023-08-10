import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import CharactersPage from './characters'
import StatisticsPage from './statistics'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Fetch characters data
    fetch('/api/characters')
      .then((response) => response.json())
      .then((data) => setCharacters(data));
  }, []);

  return (
    <div>
      <CharactersPage />
      <hr />
      {/* Pass characters data to the StatisticsPage */}
      <StatisticsPage characters={characters} />
    </div>
  );
}