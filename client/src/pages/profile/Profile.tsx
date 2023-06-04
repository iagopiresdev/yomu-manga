import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import MyMangas from "../../components/MyMangas";
import AiAssistant from "../../components/AiAssistant";

const Profile = ({ loggedUser }: any) => {
  const [userData, setUserData] = useState<{ id: string | number } | null>(null);
  const [mangas, setMangas] = useState<any>([]);
  const [mangaData, setMangaData] = useState<any>([]);
  const [mangaTitles, setMangaTitles] = useState<any>([]);

  //add loading state using skeleton loader later
  //const [isLoadingMangas, setIsLoadingMangas] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_HOST}/users/${
        loggedUser.refreshToken.userId
      }`,
      {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    setUserData(data);
    if (data && data.id) {
      getUserMangas(data.id);
    }
  };

  const getUserMangas = async (userId: string) => {
    //setIsLoadingMangas(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/userMangas/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMangaData(data.map((item : any) => item.manga.title));
      setMangas(data);
      setTimeout(() => {
        getMangaListRecommendation();
      }, 500);

    } catch (error) {
      console.error(error);
    } finally {
      //setIsLoadingMangas(false);
    }
  };

  const updateUser = async (newValue: string, field: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/users/${userData?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedUser.token}`,
          },
          body: JSON.stringify({
            [field]: newValue,
          }),
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };
    
  const getMangaListRecommendation = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/aiAssistant/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedUser.token}`,
          },
          body: JSON.stringify({
            mangas: mangaData,
          }),
        }
      );
      const data = await response.json();
      setMangaTitles(data.choices[0].message.content);
    } catch (error) {
      console.error(error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex w-full flex-col gap-5 bg-[#f6f8ff] p-6 rounded-xl">
      {/* AI Assistant */}
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12 shadow-sm shadow-[#5800FF] rounded-xl">
        <div className="col-span-full lg:!mb-0">
          <AiAssistant text={mangaTitles}/>
        </div>
      </div>
      {/* Banner */}
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12 shadow-sm shadow-[#5800FF] rounded-xl">
        <div className="col-span-full lg:!mb-0">
          <Banner
            userData={userData}
            loggedUser={loggedUser.token}
            updateUser={updateUser}
            mangas={mangas}
          />
        </div>
      </div>
      {/* MyMangas */}
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12 shadow-sm shadow-[#5800FF] rounded-xl">
        <div className="col-span-full lg:!mb-0">
          <MyMangas mangas={mangas} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
