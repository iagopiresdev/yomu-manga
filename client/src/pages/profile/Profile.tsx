import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import MyMangas from "../../components/MyMangas";

const Profile = ({ loggedUser }: any) => {
  const [userData, setUserData] = useState<{ id: string | number } | null>(
    null
  );
  const [mangas, setMangas] = useState<any>([]);
  //add loading state using skeleton loader later
  const [isLoadingMangas, setIsLoadingMangas] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [loggedUser]);

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
    setIsLoadingMangas(true);
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
      setMangas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMangas(false);
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
      if (data && data.id) {
        getUserMangas(data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full flex-col gap-5 bg-[#f6f8ff] p-6 rounded-xl">
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
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12 shadow-sm shadow-[#5800FF] rounded-xl">
        <div className="col-span-full lg:!mb-0"></div>
      </div>
    </div>
  );
};

export default Profile;
