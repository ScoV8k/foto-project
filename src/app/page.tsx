import JoinCards from '@/components/JoinCards';
import NavigationBar from '@/components/NavigationBar';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <main className="main-layout">
      <NavigationBar />
      
      <div className="content-wrapper">
        <HeroSection />
        <JoinCards />
      </div>
    </main>
  );
}
