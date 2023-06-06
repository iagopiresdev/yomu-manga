export default interface UserProps {
    token: string;
    refreshToken: {
      userId: string;
    };
}

