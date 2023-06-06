import { motion } from 'framer-motion';
import Card from './'; 

interface MessageCardProps {
  message: string;
  type: 'error' | 'success';
}

function MessageCard({ message, type }: MessageCardProps) {
  const baseStyle = 'absolute bottom-0 left-0 m-4 p-4 text-white text-sm';
  const typeStyle = 'bg-red-400';

  return (
    <motion.div
      className={`fixed bottom-0 left-0 m-4 p-4`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <Card extra={`${baseStyle} ${typeStyle}`}>
        <p>{message}</p>
      </Card>
    </motion.div>
  );
}

export default MessageCard;
