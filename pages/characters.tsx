import {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from './characters.module.css'; // Import CSS module

function CharactersPage() {
    //init variables
    const [characters, setCharacters] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 25; //page number should be calculated based on card designs and range of queries. but this is static because of file dbms

    useEffect(() => {
        fetch(`/api/characters?page=${currentPage}&pageSize=${pageSize}`)
            .then((response) => response.json())
            .then((data) => setCharacters(data));
    }, [currentPage]);

    //function to go to previous
    const goToPreviousPage = () => {
        // @ts-ignore
        if (currentPage > 1) {
            // @ts-ignore
            setCurrentPage(currentPage - 1);
        }
    };

    //function to next the page
    const goToNextPage = () => {
        //check if character has something
        if (currentPage < pageSize) {
            //ignore page next if nothing to show
            setCurrentPage(currentPage + 1)
        }
    }

    // @ts-ignore
    return (
        <div className={styles.container}>
            <h1>Characters List</h1>
            <div className={styles.characterList}>
                {/* {characters.map((character) => (
          <div key={character.id} className={styles.characterCard}>
            <img src={character.image} alt={character.name} className={styles.characterImage} />
            <p className={styles.characterName}>Name: {character.name}</p>
            <p className={styles.characterStatus}>Status: {character.status}</p>
            <Link href={`/character/${character.id}`}>
              <div className={styles.detailsLink}>Details</div>
            </Link>
          </div>
        ))} */}


                {characters.map((character: any) => (
                    <Link key={character.id} href={`/character/${character.id}`}>
                        <div className={styles.characterCardLink}>
                            <div className={styles.characterCard}>
                                <img src={character.image} alt={character.name} className={styles.characterImage}/>
                                <p className={styles.characterName}>Name: {character.name}</p>
                                <p className={styles.characterStatus}>Status: {character.status}</p>
                                <div className={styles.detailsLink}>Details</div>
                            </div>
                        </div>
                    </Link>
                ))}

                {
                    characters.length === 0 ?
                        <div><p className={styles.emptyPage}>No Character to display at page {currentPage}</p></div> : null
                }

            </div>
            <div className={styles.paginationButtons}>
                <button
                    className={`${styles.paginationButton} ${styles.previousButton}`}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous Page
                </button>
                <span>{currentPage} of {pageSize}</span>
                <button
                    className={`${styles.paginationButton} ${styles.nextButton}`}
                    onClick={goToNextPage}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default CharactersPage;
