import Card from "../components/card";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MyMangas = ({ mangas }: any) => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  if (!mangas) {
    return <div>Loading...</div>;
  }

  const toggleSynopsis = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  useEffect(() => {
    const mdViewport = window.matchMedia("(min-width: 768px)");

    if (mdViewport.matches) {
      const mangaIds = mangas.map((manga: any) => manga.id);
      setExpandedIds(mangaIds);
    }
  }, [mangas]);

  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          All Your Mangas
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Here you can see all your registered mangas. If you want to add more, use the search bar at the top!
        </p>
      </div>
      {mangas.map(
        (singleManga: any) =>
          singleManga.manga && (
            <div
              key={singleManga.id}
              className="mt-3 p-4 flex flex-col md:flex-row w-full items-center justify-between rounded-2xl bg-white shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
            >
              <div className="flex sm:justify-between mb-4 sm:mb-0 flex-col md:flex-row">
                <img
                  className="max-h-[500px] md:h-60 md:max-w-[250px] rounded-lg object-fill"
                  src={singleManga.manga.image}
                  alt="manga cover"
                />
                <div className="ml-4">
                  <p className="text-base font-medium text-navy-700 dark:text-white text-center">
                    {singleManga.manga.title}
                  </p>
                  <AnimatePresence>
                    {expandedIds.includes(singleManga.id) && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-sm text-center"
                      >
                        {singleManga.manga.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-center">
                    {expandedIds.includes(singleManga.id) ? (
                      <button
                        onClick={() => toggleSynopsis(singleManga.id)}
                        className="ml-1 font-medium text-light-text-accent text-xs focus:outline-none text-center"
                      >
                        Read Less
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleSynopsis(singleManga.id)}
                        className="ml-1 font-medium text-brand-500 text-light-text-accent dark:text-white text-xs focus:outline-none"
                      >
                        Read More
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-center flex-col p-6 text-center">
                    <p className="text-md text-gray-600 items-center">
                      {singleManga.manga.chapters}
                    </p>
                    <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
                      {singleManga.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </Card>
  );
};

export default MyMangas;
