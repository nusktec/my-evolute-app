import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function CharacterDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    if (id) {

        
      fetch(`/api/characters/${id}`)
        .then((response) => response.json())
        .then((data) => setCharacter(data))
        .catch((error) => {
          console.error('Error fetching character:', error);
        });
    }
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Character Details</h1>
      <img src={character.image} alt={character.name} />
      <p>Name: {character.name}</p>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Created at: {character.created}</p>
      <p>Gender: {character.gender}</p>
      <p>Location: {character.location.name}</p>
      <p>Episodes: {character.episode.length}</p>
    </div>
  );
}

export default CharacterDetailsPage;
