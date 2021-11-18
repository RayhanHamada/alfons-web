import { AboutSection } from '@/layouts/home/AboutSection';
import { TestimonySection } from '@/layouts/home/TestimonySection';
import { WelcomeSection } from '@/layouts/home/WelcomeSection';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <WelcomeSection />
      <TestimonySection />
      <AboutSection />
    </>
  );
};

export default Home;
