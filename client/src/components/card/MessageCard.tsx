import { motion } from 'framer-motion';
import Card from '.'; 

interface MessageCardProps {
  message: string;
}

function MessageCard({ message }: MessageCardProps) {
  const baseStyle = 'm-4 p-4 text-red-500 text-md bg-transparent';
  const typeStyle = 'inherit';

  return (
    <motion.div
      className={`p-4 items-center text-center justify-center flex absolute left-0 right-0 margin-auto`}
      initial={{ y: 400, opacity: 0 }}
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
