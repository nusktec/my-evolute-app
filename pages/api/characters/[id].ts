
import data from '../evo-task-data.json'; // Assuming you have the data stored in a JSON file

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}


export default function handler(req: any, res: any) {
    const { id } = req.query;
  
    if (!id) {
      return res.status(400).json({ error: 'Missing ID parameter' });
    }
  
    const character = data.find((item) => item.id === parseInt(id));
  
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
  
    return res.status(200).json(character);
  }