import { useState } from "react";
import avatar from "../assets/img/avatars/avatarAnime1.jpeg";
import banner from "../assets/img/profile/banner.jpg";
import { MdModeEditOutline } from "react-icons/md";
import Card from "./card";
import CardMenu from "./card/CardMenuBanner";

const Banner = ({ userData, updateUser, mangas }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userData.name);
  const [newUsername, setNewUsername] = useState(userData.username);
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleUpdateUser = () => {
    if (isEditing) {
      if (editingField === "name") {
        updateUser(newName, "name");
      } else if (editingField === "username") {
        updateUser(newUsername, "username");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleFieldChange = (field: string) => {
    setEditingField(field);
    setIsEditing(true);
  };

  const mangaAmount = mangas.length;
  const totalChapters = mangas.reduce((total: any, manga: any) => {
    const chapterCount = manga.manga.chapters;
    return chapterCount !== "Unknown" ? total + parseInt(chapterCount) : total;
  }, 0);

  const totalVolumes = mangas.reduce((total: any, manga: any) => {
    const volumeCount = manga.manga.volumes;
    return volumeCount !== "Unknown" ? total + parseInt(volumeCount) : total;
  }, 0);

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{
          backgroundImage: `url(${userData.banner ? userData.banner : banner})`,
        }}
      >
        <div className="ml-auto">
          <CardMenu onFieldChange={handleFieldChange} />
        </div>
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>

      {/* Name and Username */}
      <div className="mt-16 flex flex-col items-center">
        {isEditing && editingField === "username" ? (
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="text-xl font-bold text-navy-700 dark:text-black"
          />
        ) : (
          <h4 className="text-xl font-bold text-navy-700 dark:text-black">
            {userData.username}
          </h4>
        )}

        {isEditing && editingField === "name" ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="text-base font-normal text-gray-600"
          />
        ) : (
          <p className="text-base font-normal text-gray-600">{userData.name}</p>
        )}
      </div>

      {/* Edit Profile */}
      {isEditing && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleUpdateUser}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-navy-700 rounded-md hover:bg-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <MdModeEditOutline className="mr-2" />
            {"Save Changes"}
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {mangaAmount}
          </p>
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
