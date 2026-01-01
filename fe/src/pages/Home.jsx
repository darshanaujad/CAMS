import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroSection from '../components/Home/HeroSection';
import Feature from '../components/Home/Feature';
import Benefits from '../components/Home/Benefits';
import Annoucements from '../components/Home/Annoucements';


export default function Home() {
  return (
    <>
     <NavBar/>
      <HeroSection/>
      <Feature/>
      <Benefits/>
      <Annoucements/>
      <Footer/>
    </>
     
    
  );
}