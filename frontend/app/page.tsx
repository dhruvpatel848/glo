import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </>
  );
}
