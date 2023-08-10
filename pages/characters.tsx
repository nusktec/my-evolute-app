import { useState, useEffect } from 'react';
import Link from 'next/link';

import styles from './characters.module.css'; // Import CSS module

function CharactersPage() {
  const [characters, setCharacters] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  useEffect(() => {
    fetch(`/api/characters?page=${currentPage}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((data) => setCharacters(data));
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Characters List</h1>
      <div className={styles.characterList}>
        {characters.map((character) => (
          <div key={character.id} className={styles.characterCard}>
            <img src={character.image} alt={character.name} className={styles.characterImage} />
            <p className={styles.characterName}>Name: {character.name}</p>
            <p className={styles.characterStatus}>Status: {character.status}</p>
            <Link href={`/character/${character.id}`}>
              <div className={styles.detailsLink}>Details</div>
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.paginationButtons}>
        <button
          className={`${styles.paginationButton} ${styles.previousButton}`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className={`${styles.paginationButton} ${styles.nextButton}`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default CharactersPage;
