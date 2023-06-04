import { useState, useEffect } from 'react';
import { motion, useAnimationControls } from "framer-motion";
import Card from "../components/card";
import eyes from "../assets/ai-eyes.webp";

function AiAssistant(props :any) {
  const [regularText, setRegularText] = useState("");
  const [highlightedText, setHighlightedText] = useState<string[]>([]);
  const fullText = props.text;
  const controls = useAnimationControls();

  useEffect(() => {
    
    if (typeof fullText === "string") {
    //const matches = [...fullText.matchAll(/"(.*?)"/g)];
    const regex = /"(.*?)"/g;
    const highlighted = [...fullText.matchAll(regex)].map(match => match[1]);
    const regular = fullText.replace(regex, '').trim();
    let currentRegularText = "";
    let currentHighlightedText :any = [];
    controls.start({ scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } });

    const intervalId = setInterval(() => {
      if (currentRegularText.length < regular.length) {
        currentRegularText += regular[currentRegularText.length];
        setRegularText(currentRegularText);
      } else if (currentHighlightedText.length < highlighted.length) {
        currentHighlightedText.push(highlighted[currentHighlightedText.length]);
        setHighlightedText([...currentHighlightedText]);
      } else {
        controls.stop();
        clearInterval(intervalId);
      }
    }, 80); 

    return () => {
      controls.stop();
      clearInterval(intervalId);
    }
}
  }, [fullText, controls]);

  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className=" w-full flex place-items-center">
        <motion.img 
          src={eyes} 
          alt="eyes" 
          className=" h-20 w-20 rounded-full" 
          animate={controls}
        />
        <h4 className="text-xl font-bold text-navy-700 dark:text-white ml-6">
          {regularText}
          {highlightedText.map((text, index) => 
            <span key={index} className="text-[#5800FF]">"{text}"</span>
          )}
        </h4>
      </div>
    </Card>
  );
}

export default AiAssistant;
