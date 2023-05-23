import { useEffect, useState } from 'react';
import Banner from "../../components/Banner";
import MyMangas from "../../components/MyMangas";

const Profile = ({ loggedUser }:any) => {
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/users/${loggedUser.refreshToken.userId}`, {
        headers: {
          'Authorization': `Bearer ${loggedUser.token}`,
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      setUserData(data);
    }

    if (loggedUser) {
      fetchUserData();
    }
  }, [loggedUser]); 

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full flex-col gap-5 bg-[#f6f8ff] p-6 rounded-xl">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12 shadow-sm shadow-[#5800FF] rounded-xl">
        <div className="col-span-full lg:!mb-0">
          <Banner userData={userData} />
        </div>
      </div>

      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12 shadow-sm shadow-[#5800FF] rounded-xl">
        <div className="col-span-full lg:!mb-0">
        <MyMangas userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
