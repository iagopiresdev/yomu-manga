import { MdModeEditOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import Card from "../components/card";


const MyMangas = ({ userData }:any) => {
  const [mangas, setMangas] = useState([{}]);

  useEffect(() => {
    async function fetchUserMangas() {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/userMangas/${userData.id}`, {
        headers: {
          'Authorization': `Bearer ${userData.token}`,
          'Accept': 'application/json'
        },
      });
      const data = await response.json();
      setMangas(data);
    }
    fetchUserMangas();
  }, []);

  if (!mangas) {
    return <div>Loading...</div>;
  }

  return ( 
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Todos os seus Mangás
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Aqui você pode ver todos os seus mangás cadastrados, caso queira adicionar mais, use a barra de pesquisa no topo!
        </p>
      </div>
      {mangas.map((singleManga:any) => (
  singleManga.manga && (
    <div key={singleManga.id} className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
      <div className="flex items-center">
        <div className="">
          <img className="h-[200px] w-[900px] rounded-lg" src={singleManga.manga.image} alt="manga cover" />
        </div>
        <div className="ml-4">
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {singleManga.manga.title}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {singleManga.manga.description}
            <a
              className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
              href=" "
            >
              Veja mais
            </a>
          </p>
        </div>
      </div>
      <div className="flex items-center" >
        <div className="flex items-center flex-col">
          <p className="text-sm text-gray-600">{singleManga.manga.chapters}</p>
          <div className="ml-2">
            <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
              {singleManga.status}
            </span>
          </div>
        </div>
        <div className="ml-4 flex items-center justify-center text-gray-600 dark:text-white">
          <MdModeEditOutline />
        </div>
      </div>
    </div>
  )
))}
    </Card>
  );
};

export default MyMangas;
