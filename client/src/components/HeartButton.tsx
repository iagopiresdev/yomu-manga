import { IoHeart, IoHeartOutline } from "react-icons/io5";
import HeartButtonProps from "../types/HeartButtonProps";


const HeartButton: React.FC<HeartButtonProps> = ({ heart, setHeart, getFullManga, position, mangaCompleto }) => {
  const handleHeartClick = async () => {
    if(!mangaCompleto || mangaCompleto.myanimelist_id !== position){
      await getFullManga();
    }
    setHeart(!heart);
  };

  return (
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
  );
};

export default HeartButton;
