import React, { useState, useEffect } from 'react';
import styles from './statistics.module.css';

function StatisticsPage({ characters }: any) {
  const [topCharacters, setTopCharacters] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [locationCounts, setLocationCounts] = useState({});
  const [speciesCounts, setSpeciesCounts] = useState({});
  const [originSpeciesMap, setOriginSpeciesMap] = useState({});

  useEffect(() => {
    // Calculate top characters with most episodes
    const sortedCharacters = characters.slice().sort((a: { episode: string | any[]; }, b: { episode: string | any[]; }) => b.episode.length - a.episode.length);
    setTopCharacters(sortedCharacters.slice(0, 3));

    // Calculate status counts
    const statusCounts = characters.reduce((counts: { [x: string]: any; }, character: { status: string | number; }) => {
      counts[character.status] = (counts[character.status] || 0) + 1;
      return counts;
    }, {});
    setStatusCounts(statusCounts);

    // Calculate location counts
    const locationCounts = characters.reduce((counts: { [x: string]: any; }, character: { location: { name: string | number; }; }) => {
      counts[character.location.name] = (counts[character.location.name] || 0) + 1;
      return counts;
    }, {});
    setLocationCounts(locationCounts);

    // Calculate species counts
    const speciesCounts = characters.reduce((counts: { [x: string]: any; }, character: { species: string | number; }) => {
      counts[character.species] = (counts[character.species] || 0) + 1;
      return counts;
    }, {});
    setSpeciesCounts(speciesCounts);

    // Calculate origin species map
    const originSpeciesMap = characters.reduce((map: { [x: string]: { [x: string]: number; }; }, character: { origin: { name: any; }; species: any; }) => {
      const originName = character.origin.name;
      const species = character.species;
      if (!map[originName]) {
        map[originName] = {};
      }
      if (!map[originName][species]) {
        map[originName][species] = 0;
      }
      map[originName][species]++;
      return map;
    }, {});
    setOriginSpeciesMap(originSpeciesMap);
  }, [characters]);

return (
    <div className={styles.container}>
      <h1>Statistics</h1>
      <div className={styles.statSection}>
        <h2>Top 3 Characters with Most Episodes</h2>
        <ul className={styles.statList}>
          {topCharacters.map((character: any) => (
            <li key={character.id} className={styles.statListItem}>
              {character.name} - {character.episode.length} episodes
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.statSection}>
        <h2>Status with Most Characters</h2>
        <ul className={styles.statList}>
          {Object.entries(statusCounts).map(([status, count]: any) => (
            <li key={status} className={styles.statListItem}>
              {status}: {count}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.statSection}>
        <h2>Location with Most Human Characters</h2>
        <ul className={styles.statList}>
          {Object.entries(locationCounts)
            .filter(([location, _]) => characters.find((char: { location: { name: string; }; species: string; }) => char.location.name === location && char.species === 'Human'))
            .map(([location, count]: any) => (
              <li key={location} className={styles.statListItem}>
                {location}: {count} Human characters
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.speciesSection}>
        <h2>Species with Most Male Characters</h2>
        <ul className={styles.speciesList}>
          {Object.entries(speciesCounts)
            .filter(([species, _]) => characters.find((char: { species: string; gender: string; }) => char.species === species && char.gender === 'Male'))
            .map(([species, count]: any) => (
              <li key={species} className={styles.speciesListItem}>
                {species}: {count} Male characters
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.originSection}>
        <h2>Unique Origin Names and Species</h2>
        <ul className={styles.originList}>
          {Object.entries(originSpeciesMap).map(([originName, speciesCounts]: any) => (
            <li key={originName} className={styles.originListItem}>
              {originName}:
              <ul className={styles.originSpeciesList}>
                {Object.entries(speciesCounts).map(([species, count]: any) => (
                  <li key={species} className={styles.originSpeciesItem}>
                    {species}: {count}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StatisticsPage;
