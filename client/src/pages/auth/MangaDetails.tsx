import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MangaCard from "../../components/card/MangaCard";
import Navbar from "../../components/navbar/Navbar";

interface Manga {
  title: string;
  image: string;
  description: string;
  myanimelist_url: string;
  myanimelist_id: number;
  id: number;
}

const MangaDetails = ({ user }: any) => {
  const [manga, setManga] = useState<Manga[] | null>(null);
  const { mangaName } = useParams<{ mangaName: string }>();
  const userId = user.refreshToken.userId;

  console.log(user);

  const fetchManga = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/mangas/search/${mangaName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setManga(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchManga();
  }, [mangaName]);

  if (!manga) return <div>Carregando...</div>;

  return (
    <>
      <Navbar brandText="manga-details" />
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        {manga?.map((mangaItem, index) => (
          <div
            key={index}
            className="!z-5 relative rounded-[20px] bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white undefined"
          >
            
            <MangaCard
              userId={userId}
              title={mangaItem.title}
              author={mangaItem.description}
              image={mangaItem.image}
              price={mangaItem.myanimelist_id}
              position={index}
              mangaId={mangaItem.id}
            />
            
          </div>
        ))}
      </div>
    </>
  );
};

export default MangaDetails;
