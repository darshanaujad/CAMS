import react from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Feature from '../components/Feature';
import Benefits from '../components/Benefits';
import Annoucements from '../components/Annoucements';


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