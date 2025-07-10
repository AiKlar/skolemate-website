import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, BookOpen, MessageCircle, ClipboardList, Heart, Mail, ArrowRight, LogIn, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import ContactForm from '@/components/ContactForm';
import confetti from 'canvas-confetti';

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set());
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Setup intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId && !animatedSections.has(sectionId)) {
            entry.target.classList.add('animate-feature-pop');
            setAnimatedSections(prev => new Set(prev).add(sectionId));
          }
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all feature sections
    const sections = document.querySelectorAll('.feature-section');
    sections.forEach(section => {
      observerRef.current?.observe(section);
    });
    return () => {
      observerRef.current?.disconnect();
    };
  }, [animatedSections]);

  // Track carousel active slide
  useEffect(() => {
    if (!carouselApi) return;
    const updateActiveSlide = () => {
      setActiveSlide(carouselApi.selectedScrollSnap());
    };
    carouselApi.on('select', updateActiveSlide);
    updateActiveSlide(); // Set initial active slide

    return () => {
      carouselApi.off('select', updateActiveSlide);
    };
  }, [carouselApi]);

  const triggerFireworks = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0
    };
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);

      // Left side
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        }
      });

      // Right side
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        }
      });
    }, 250);
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) return;
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('fields[email]', email.trim());
    formData.append('ml-submit', '1');
    formData.append('anticsrf', 'true');
    try {
      const response = await fetch('https://assets.mailerlite.com/jsonp/1455812/forms/157482125464962296/subscribe', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // MailerLite handles CORS differently
      });
      console.log('Email submitted to MailerLite:', email);
      setIsSubmitted(true);

      // Trigger fireworks
      triggerFireworks();

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting to MailerLite:', error);
      setIsSubmitting(false);
      // Could add error handling here if needed
    }
  };

  const features = [{
    title: "Lærens højre hånd i forberedelse og undervisning",
    description: "Generering af forløb og materiale",
    icon: <BookOpen className="w-8 h-8" />,
    bullets: [
      "Generér hele forløb eller enkeltopgaver på få sekunder - Fra temaforløb til enkeltlektioner – SkoleMate skaber undervisningsindholdet for dig med udgangspunkt i dine valg om fag, niveau og læringsmål.",
      "Inddrag skolens værdier og praksisnære emner - Integrér trivsel, fællesskab, elevindragelse og praktik i undervisningen – uden ekstra forberedelsestid.",
      "Tilpasset elevernes behov – automatisk - SkoleMate differentierer indholdet efter læringsstil, fagligt niveau og behov – og sikrer samtidig faglig validering med faglige mål og pædagogisk retning.",
      "Et opgør med den klassiske lektionsplan - Smart modulopbygget interface gør det let at justere, kombinere og tilpasse – skabt til virkeligheden."
    ],
    layout: "image-left",
    image: "/lovable-uploads/e8a6f097-5019-4bda-855b-5d919a8e6256.png"
  }, {
    title: "Elevens foretrukne AI-assistent i fag, fritid og fællesskab",
    description: "SkoleMate er tæt integreret i jeres skolekultur og giver eleverne hjælp til opgaver, praksisforløb, samværsregler og trivsel. Tilpasset skolens værdier og pædagogik.",
    icon: <MessageCircle className="w-8 h-8" />,
    bullets: [
      "En god start på skoleåret - Optimerer overgangen til efterskoleliv for alle elever med interaktivt opstartforløb",
      "Faghjælp på elevens niveau - Svarer på faglige spørgsmål uden at give løsninger – støtter elevens egen tænkning og udvikling.",
      "Støtte i hverdagen på skolen - Hjælper med praktiske spørgsmål som måltider, samværsregler, rengøring og skemandringar.",
      "Formidler skolens kultur og værdier - Forklarer skolens retningslinjer, traditioner og holdninger på en inkluderende og forståelig måde.",
      "Trivsel og selvhjælp - Giver elever adgang til råd om trivsel, konflikthåndtering og hvordan man søger hjælp – på deres egne præmisser."
    ],
    layout: "image-right",
    image: "/lovable-uploads/3c38a539-d455-45e3-acc9-6f947b15959c.png"
  }, {
    title: "SkoleMateRialer – bygget af jer, til jer",
    description: "Med SkoleMate får du adgang til et levende og voksende materialebibliotek hvor undervisere deler det bedste fra deres AI-genererede undervisningsforløb og opgaver. Det er videndeling i praksis, styrket af AI og bygget på det fællesskab, som SkoleMate skaber på tværs af skoler.",
    icon: <ClipboardList className="w-8 h-8" />,
    bullets: ["Alle undervisere, der bruger platformen, bidrager automatisk til biblioteket – og du får adgang til det hele.", "Find inspiration, tilpas eksisterende indhold, eller genbrug færdige forløb med få klik.", "Spar tid, og styrk fagligheden gennem kollektiv intelligens og erfaringsdeling."],
    layout: "image-left",
    image: "/lovable-uploads/55e8b1fa-23d1-42df-a5f9-aa2ecc88542b.png"
  }, {
    title: "Inklusionsværktøjer (AI)",
    description: "AI-værktøjer tilpasser materiale og læringsstil til elever med fx ordblindhed, ADHD eller autisme – uden ekstra arbejde for læreren.",
    icon: <Heart className="w-8 h-8" />,
    bullets: ["Differentieret læring for alle", "AI-støtte til ADHD, autisme og dysleksi", "Øget læringsudbytte & trivsel"],
    layout: "image-right",
    image: "/lovable-uploads/8b1d29bb-b75e-44e4-8319-d384fbd59673.png"
  }];

  const carouselImages = [{
    src: "/lovable-uploads/665e1814-19d9-4ee1-a4f7-759c7bb7575a.png",
    alt: "Generering af forløb og materiale"
  }, {
    src: "/lovable-uploads/418ce7f5-4190-4b81-9133-6c49a30d801b.png",
    alt: "Elevens foretrukne digitale assistent"
  }, {
    src: "/lovable-uploads/d4b1c8d4-2a61-4e64-823b-24e6d97cc1ec.png",
    alt: "Intelligente inklusions værktøjer"
  }];

  return <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Hidden form for Netlify registration */}
      <form name="waitlist" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="email" name="email" />
      </form>

      {/* Login Button - Responsive positioning */}
      <div className="fixed top-6 right-6 z-50 lg:block hidden">
        <a href="https://app.skolemate.dk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
          <LogIn className="mr-2 w-4 h-4" />
          Login
        </a>
      </div>

      {/* Login Button - Mobile (bottom right) */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden block">
        <a href="https://app.skolemate.dk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
          <LogIn className="mr-2 w-4 h-4" />
          Login
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 inline-block">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="relative">
                {/* Northern Lights Glow Effect */}
                <div className="absolute inset-0 rounded-full aurora-glow"></div>
                <img src="/lovable-uploads/586954e4-2ecc-42b5-a6e5-4600bd722db7.png" alt="SkoleMate Logo" className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight">
                SkoleMate
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Hele skolens AI-assistent
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">Ikke bare en Chatbot - men en intelligent AI-platform målrettet lærere, elever og ledelse på efterskoler og frie fagskoler – hvor læring, fællesskab og praksis mødes</p>
          
          {/* Waitlist description - moved above form and shortened */}
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Skriv dig på ventelisten og vær blandt de første til at prøve SkoleMate
          </p>
          
          {/* Email Signup Form - Updated for MailerLite */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input type="email" id="waitlist-email" name="fields[email]" placeholder="Din email adresse" value={email} onChange={e => setEmail(e.target.value)} required disabled={isSubmitting || isSubmitted} className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 disabled:opacity-50" />
              <Button id="waitlist-btn" type="button" onClick={handleEmailSubmit} disabled={isSubmitting || isSubmitted || !email.trim()} className={`
                  px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform shadow-lg hover:shadow-xl
                  ${isSubmitted ? 'bg-green-600 hover:bg-green-600 scale-105' : isSubmitting ? 'bg-gray-600 hover:bg-gray-600' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105'}
                  text-white
                `}>
                {isSubmitted ? <div className="flex items-center animate-in fade-in-0 zoom-in-95 duration-300">
                    <Check className="w-5 h-5 mr-2" />
                    Tilmeldt!
                  </div> : isSubmitting ? <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Tilmelder...
                  </div> : 'Skriv dig op på venteliste'}
              </Button>
            </div>
          </div>

          {/* Danish Flag and Text */}
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Danish Flag */}
              <div className="flex flex-col items-center gap-2">
                <img src="/lovable-uploads/f0ee8ef2-e794-41ab-a8e9-bb5cab1dbc0a.png" alt="Danmarks flag" className="w-32 h-24 object-contain" />
                <p className="text-sm text-gray-400 font-medium text-center uppercase">
                  Udviklet til skoler i Danmark
                </p>
              </div>
              
              {/* EU Flag */}
              <div className="flex flex-col items-center gap-2">
                <img src="/lovable-uploads/e5081200-479b-4cd2-b3c3-5216f84a0155.png" alt="EU flag" className="w-32 h-24 object-contain" />
                <p className="text-sm text-gray-400 font-medium text-center uppercase">
                  Overholder datasikkerhed og GDPR
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - centered with timeline */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central Timeline */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-green-400 h-full hidden lg:block timeline-line"></div>
        
        {/* Features Sections */}
        <div className="space-y-32 py-32">
          {features.map((feature, index) => <section key={index} className="feature-section relative opacity-0 transform translate-y-12 scale-95 transition-all duration-700" data-section-id={`feature-${index}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${feature.layout === 'image-right' ? 'lg:grid-flow-col-dense' : ''}`}>
                  
                  {/* Content */}
                  <div className={`${feature.layout === 'image-right' ? 'lg:col-start-2' : ''}`}>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50">
                      <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-green-400 p-3 rounded-2xl mr-4">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold mb-2 leading-relaxed">{feature.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">{feature.description}</p>
                      
                      <ul className="space-y-4">
                        {feature.bullets.map((bullet, i) => <li key={i} className="flex items-start">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                            <span className="text-gray-300 text-lg leading-relaxed">
                              {index === 0 ? (
                                // Special formatting for the first feature with checkmarks and green highlights
                                <>
                                  <Check className="inline w-4 h-4 mr-2" style={{ color: '#77F2A1' }} />
                                  {bullet.split(' - ').map((part, partIndex) => (
                                    partIndex === 0 ? (
                                      <span key={partIndex} style={{ color: '#77F2A1' }} className="font-semibold">
                                        {part}
                                      </span>
                                    ) : (
                                      <span key={partIndex}> - {part}</span>
                                    )
                                  ))}
                                </>
                              ) : index === 1 ? (
                                // Special formatting for the second feature with checkmarks and green highlights
                                <>
                                  <Check className="inline w-4 h-4 mr-2" style={{ color: '#77F2A1' }} />
                                  {bullet.split(' - ').map((part, partIndex) => (
                                    partIndex === 0 ? (
                                      <span key={partIndex} style={{ color: '#77F2A1' }} className="font-semibold">
                                        {part}
                                      </span>
                                    ) : (
                                      <span key={partIndex}> - {part}</span>
                                    )
                                  ))}
                                </>
                              ) : (
                                bullet
                              )}
                            </span>
                          </li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`${feature.layout === 'image-right' ? 'lg:col-start-1' : ''}`}>
                    <div className="relative">
                      {feature.image ? <div className="w-full">
                          <img src={feature.image} alt={feature.title} className="w-full h-auto object-contain" />
                        </div> : <div className="w-full h-80 bg-gradient-to-br from-blue-500/20 to-green-400/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                          <div className="text-6xl opacity-50">{feature.icon}</div>
                        </div>}
                      {/* Floating elements for visual interest */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-400/30 rounded-full blur-sm"></div>
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/30 rounded-full blur-md"></div>
                    </div>
                  </div>
                </div>

                {/* Timeline node for desktop */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                  <div className="w-6 h-6 bg-green-400 rounded-full border-4 border-slate-900 shadow-lg timeline-node"></div>
                </div>
              </div>
            </section>)}
        </div>
      </div>

      {/* Carousel Section */}
      <section className="py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            Nogle af SkoleMate's features
          </h2>
          
          <div className="relative py-8">
            <Carousel setApi={setCarouselApi} opts={{
            align: "center",
            loop: true,
            slidesToScroll: 1
          }} className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {carouselImages.map((image, index) => <CarouselItem key={index} className="pl-2 md:pl-4 basis-11/12 md:basis-4/5 lg:basis-1/2">
                    <div className="p-2 md:p-4">
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-2 md:p-4 shadow-2xl border border-gray-700/50 h-full">
                        <img src={image.src} alt={image.alt} className="w-full h-auto object-contain rounded-2xl" />
                      </div>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="bg-gray-800/80 border-gray-700/50 text-white hover:bg-gray-700/80 -left-4 md:-left-12 h-8 w-8 md:h-12 md:w-12" />
              <CarouselNext className="bg-gray-800/80 border-gray-700/50 text-white hover:bg-gray-700/80 -right-4 md:-right-12 h-8 w-8 md:h-12 md:w-12" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Replace the old CTA section */}
      <ContactForm />

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <a href="https://aiklar.dk" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
              <img src="/lovable-uploads/ee644135-8145-4e97-8a09-dab655b25d72.png" alt="AiKlar" className="h-8" />
            </a>
          </div>
          <p className="text-gray-400">SkoleMate er udviklet af <a href="https://aiklar.dk" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">AiKlar</a> © 2025. Alle rettigheder forbeholdes.</p>
        </div>
      </footer>

      <style>{`
        .animate-feature-pop {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        
        .timeline-line {
          background: linear-gradient(to bottom, #4F76F6, #77F2A1);
        }
        
        .timeline-node {
          animation: pulse 2s infinite;
        }
        
        .aurora-glow {
          background: conic-gradient(
            from 0deg at 50% 50%,
            #00ff88,
            #0066ff,
            #6600ff,
            #ff0066,
            #ff6600,
            #ffff00,
            #00ff88
          );
          animation: aurora-rotate 8s linear infinite;
          filter: blur(20px);
          opacity: 0.6;
          transform: scale(1.5);
        }
        
        @keyframes aurora-rotate {
          0% {
            transform: scale(1.5) rotate(0deg);
            filter: blur(20px) hue-rotate(0deg);
          }
          25% {
            transform: scale(1.7) rotate(90deg);
            filter: blur(25px) hue-rotate(90deg);
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            filter: blur(20px) hue-rotate(180deg);
          }
          75% {
            transform: scale(1.8) rotate(270deg);
            filter: blur(30px) hue-rotate(270deg);
          }
          100% {
            transform: scale(1.5) rotate(360deg);
            filter: blur(20px) hue-rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(119, 242, 161, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(119, 242, 161, 0);
          }
        }
        
        @media (max-width: 1024px) {
          .feature-section {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
          }
        }
      `}</style>
    </div>;
};

export default Index;
