import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Inside the component



interface Manga {
  title: string;
  image_url: string;
  synopsis: string;
}

interface Props {
  mangaName: string;
}


const MangaDetails = () => {
  const [manga, setManga] = useState<Manga | null>(null);
  const { mangaName } = useParams<{ mangaName: string }>();
  useEffect(() => {
    async function fetchManga() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/external-api/manga/${mangaName}`);
        const data = await response.json();
        setManga(data.results[0]);
      } catch (error) {
        console.log(error);
      } 
    }
    fetchManga();
  }, [mangaName]);

  if (!manga) return <div>Carregando...</div>

  return (
    <div>
      {manga && (
        <div>
          <h1>{manga.title}</h1>
          <img src={manga.image_url} alt={manga.title} />
          <p>{manga.synopsis}</p>
        </div>
      )}
    </div>

  )
}

export default MangaDetails
