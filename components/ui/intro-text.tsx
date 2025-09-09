import { Typewriter } from 'react-simple-typewriter';

export default function IntroText() {
  return (
    <Typewriter
      words={[
        "a software engineer",
        "a web developer",
        "a tech enthusiast!",
      ]}
      loop={0}
      cursor
      cursorStyle="|"
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={2000}
    />
  );
}
