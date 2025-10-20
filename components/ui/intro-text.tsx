import { Typewriter } from 'react-simple-typewriter';
import { useLanguage } from '@/contexts/language-context';

export default function IntroText() {
  const { language } = useLanguage();
  
  const words = language === 'zh' 
    ? [
        "軟體工程師",
        "網頁開發者", 
        "科技愛好者！",
      ]
    : [
        "a software engineer",
        "a web developer",
        "a tech enthusiast!",
      ];

  return (
    <Typewriter
      words={words}
      loop={0}
      cursor
      cursorStyle="|"
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={2000}
    />
  );
}
