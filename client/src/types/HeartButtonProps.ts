export default interface HeartButtonProps {
    heart: boolean;
    setHeart: React.Dispatch<React.SetStateAction<boolean>>;
    getFullManga: () => Promise<void>;
    position: number;
    mangaCompleto: any | null;
  }