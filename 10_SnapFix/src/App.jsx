import { Suspense, lazy } from 'react';
import { Loader } from './Components/Loader';
import { ScrollProgress } from './Components/ScrollProgress';
import { Navbar } from './Components/Navbar';

// Lazy load components
const Header = lazy(() => import('./Components/Header'));
const HeroSection = lazy(() => import('./Components/HeroSection'));
const FeaturedServices = lazy(() => import('./Components/FeaturedServices'));
const WhyChooseUs = lazy(() => import('./Components/WhyChooseUs'));
const Testimonials = lazy(() => import('./Components/Testimonials'));
const Footer = lazy(() => import('./Components/Footer'));
const Schema = lazy(() => import('./Components/Schema'));

export const App = () => {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      <Suspense fallback={<Loader />}>
        <Header />
        <main className="min-h-screen">
          <HeroSection />
          <FeaturedServices />
          <WhyChooseUs />
          <Testimonials />
        </main>
        <Footer />
        <Schema />
      </Suspense>
    </>
  );
};

export default App;