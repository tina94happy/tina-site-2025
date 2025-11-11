import { Typewriter } from 'react-simple-typewriter';
import { useLanguage } from '@/contexts/language-context';

export default function IntroText() {
  const { language } = useLanguage();
  
  const words = language === 'zh' 
    ? [
        "全端開發者",
        "資安工程師",
        "測試工程師",
        "DevOps工程師", 
        "科技愛好者！",
      ]
    : [
        "a Full-Stack Developer",
        "a Security Engineer",
        "a Test engineer",
        "a DevOps engineer",
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
