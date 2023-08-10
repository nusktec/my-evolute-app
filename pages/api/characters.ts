import charactersData from '../api/evo-task-data.json';

export default function handler(req, res) {
  const { id } = req.query;
    console.log(id, "charactercharactercharactercharacter");
  if (id) {
    const character = charactersData.find((char) => char.id === Number(id));
    console.log(character, "charactercharactercharacter")
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    return res.status(200).json(character);
  }

  const { page = 1, pageSize = 25 } = req.query;
  const startIndex = (Number(page) - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);
  const characters = charactersData.slice(startIndex, endIndex);

  res.status(200).json(characters);
}
