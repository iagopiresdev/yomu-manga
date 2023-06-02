import { useState, useEffect } from "react";
import avatar from "../assets/img/avatars/avatarAnime1.jpeg";
import banner from "../assets/img/profile/banner.jpg";
import Card from "./card";

const Banner = ( {userData}:any ) => {
  const [mangas, setMangas] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserMangas();
  }
  , []);

  const getUserMangas = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/userMangas/${userData.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setMangas(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(mangas);

  const mangaAmount = userData.mangas.length;
  const totalChapters = mangas.reduce((total:any, manga:any) => {
    const chapterCount = manga.manga.chapters;
    if (chapterCount !== 'Unknown') {
      return total + parseInt(chapterCount);
    } else {
      return total;
    }
  }, 0);

  const totalVolumes = mangas.reduce((total:any, manga:any) => {
    const volumeCount = manga.manga.volumes;
    if (volumeCount !== 'Unknown') {
      return total + parseInt(volumeCount);
    } else {
      return total;
    }
  }, 0);

  console.log(userData)

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-black">
          {userData.username}
        </h4>
        <p className="text-base font-normal text-gray-600">{userData.name}</p>
      </div>

      {/* Random numbers, but I'll add some functions to get the amount of mangas a user has and etc...*/}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">{mangaAmount ? mangaAmount : 0}</p>
          <p className="text-sm font-normal text-gray-600">Mangas</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {totalChapters}
          </p>
          <p className="text-sm font-normal text-gray-600">Chapters</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {totalVolumes}
          </p>
          <p className="text-sm font-normal text-gray-600">Volumes</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
