import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Card from ".";

interface Manga {
  title: string;
  picture_url: string;
  description: string;
  myanimelist_url: string;
  myanimelist_id: number;
}

interface MangaCardProps {
  image: string;
  title: string;
  author: string;
  position: number;
  price: string | number;
}

const MangaCard: React.FC<MangaCardProps> = ({ title, author, price, image, position }) => {
  const [heart, setHeart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [mangaCompleto, setMangaCompleto] = useState<Manga | null>(null);

  const getMangaCompleto = async () => {
    // Return early if the manga is already in state
    if (mangaCompleto && mangaCompleto.myanimelist_id === position) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://myanimelist.p.rapidapi.com/manga/${position}`, {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': '0838ccfca8msh687352810d27af4p143c39jsnb917a452cc41',
          'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
        }
      });
      const data = await response.json();
      setMangaCompleto(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const setMangaUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/mangas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //send userId and mangaId as a JSON
        body: JSON.stringify({
          userId: 'userId', // replace with actual userId
          mangaId: mangaCompleto?.myanimelist_id // replace with actual mangaId
        })
      });
    }catch (error) {
      console.error(error);
    }
  };


  const handleHeartClick = async () => {
    if(!mangaCompleto || mangaCompleto.myanimelist_id !== position){
      await getMangaCompleto();
    }
    setHeart(!heart);
    
    
    //create manga when user clicks heart
    try {
      if (heart) {
        // heart was off, now it's on -> POST request

        const response = await fetch(`${import.meta.env.VITE_API_HOST}/mangas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          //send manga as a JSON
          body: JSON.stringify({ mangaCompleto })
        });
        
        //if manga already exists, 
        if (!response.ok) {
          console.log();
          throw new Error('POST request failed');
        }
      } 
      
      
      
      
      
      
      
      else {
        // heart was on, now it's off -> DELETE request
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/your-api-endpoint`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: 'userId', // replace with actual userId
            mangaId: mangaCompleto?.myanimelist_id // replace with actual mangaId
          })
        });
  
        if (!response.ok) {
          throw new Error('DELETE request failed');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white`}
    >
      <div className="h-full w-full">
        <div className="relative w-full rounded-xl">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={handleHeartClick}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
              {heart ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-brand-500" />
              )}
            </div>
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {title}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              By {author}{" "}
            </p>
          </div>

          <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {/*bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))*/}
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Ranking: {price}
            </p>
          </div>
          <Card>
    </Card>
        </div>
      </div>
    </Card>
  );
};

export default MangaCard;
