import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, BookOpen, MessageCircle, ClipboardList, Heart, Mail, ArrowRight, LogIn, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import confetti from 'canvas-confetti';

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Setup intersection observer for scroll animations
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [animatedSections]);

  const triggerFireworks = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Left side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      
      // Right side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleEmailSubmit = async () => {
    setIsSubmitting(true);
    
    const data = new URLSearchParams({
      'form-name': 'waitlist',
      email: email.trim()
    });

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString()
      });
      
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      
      // Trigger fireworks
      triggerFireworks();
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // Could add error handling here if needed
    }
  };

  const features = [
    {
      title: "AI-generering af forløb & materiale",
      description: "SkoleMate genererer lektionsplaner og undervisningsmateriale med få klik – tilpasset skolens rammer og den enkelte elevs behov.",
      icon: <BookOpen className="w-8 h-8" />,
      bullets: [
        "Ledelse: rammesætning og indblik → overblik & kvalitet",
        "Lærer: Mindre copy/paste, mere af alt det der giver mening", 
        "Elever: målrettet interaktiv undervisning → højere engagement og bedre læring"
      ],
      layout: "image-left",
      image: "/lovable-uploads/9db86486-cfa7-403e-a45b-3bf68a233bc1.png"
    },
    {
      title: "integreret AI-chatbot med skolens info",
      description: "Én chatbot – tæt integreret med skolens retningslinjer, dagligdag og værdier. Den hjælper både elever, lærere og ledelse med at finde svar hurtigt.",
      icon: <MessageCircle className="w-8 h-8" />,
      bullets: [
        "Bedre opstart for elever",
        "Formidler kultur & politikker",
        "Svar på regler, faglige spørgsmål",
        "Trivsel & inklusion for elever"
      ],
      layout: "image-right",
      image: "/lovable-uploads/9db3cda9-9df3-415d-861c-97bbb5a5e6e5.png"
    },
    {
      title: "Kommunikation & opgavestyring",
      description: "SkoleMate samler beskeder, opgaver og struktur ét sted. Intuitivt for elever – effektivt for lærere – værdifuldt for ledelse.",
      icon: <ClipboardList className="w-8 h-8" />,
      bullets: [
        "Ledelse får unikt indblik med data",
        "Lærere udsender opgaver i ét flow",
        "Elever får klar struktur & feedback"
      ],
      layout: "image-left",
      image: "/lovable-uploads/73b53312-7252-4594-be0e-2ae28a8bc10d.png"
    },
    {
      title: "Inklusionsværktøjer (AI)",
      description: "AI-værktøjer tilpasser materiale og læringsstil til elever med fx ordblindhed, ADHD eller autisme – uden ekstra arbejde for læreren.",
      icon: <Heart className="w-8 h-8" />,
      bullets: [
        "Differentieret læring for alle",
        "AI-støtte til ADHD, autisme og dysleksi",
        "Øget læringsudbytte & selvværd"
      ],
      layout: "image-right",
      image: "/lovable-uploads/c95715b1-bc38-48e1-87f9-a0f8116eba3d.png"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Hidden form for Netlify registration */}
      <form name="waitlist" netlify netlify-honeypot="bot-field" hidden>
        <input type="email" name="email" />
      </form>

      {/* Login Button - Fixed Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <a
          href="https://app.skolemate.dk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <LogIn className="mr-2 w-4 h-4" />
          Login
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 inline-block">
            <div className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight">
              SkoleMate
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            AI-platformen til fremtidens skole
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            AI i praksis – samlet i én platform, udviklet til efterskoler, frie fagskoler og specialskoler.
          </p>
          
          {/* Email Signup Form - Updated for JavaScript submission */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                id="waitlist-email"
                placeholder="Din email adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting || isSubmitted}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 disabled:opacity-50"
              />
              <Button
                id="waitlist-btn"
                type="button"
                onClick={handleEmailSubmit}
                disabled={isSubmitting || isSubmitted || !email}
                className={`
                  px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform shadow-lg hover:shadow-xl
                  ${isSubmitted 
                    ? 'bg-green-600 hover:bg-green-600 scale-105' 
                    : isSubmitting 
                      ? 'bg-gray-600 hover:bg-gray-600' 
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105'
                  }
                  text-white
                `}
              >
                {isSubmitted ? (
                  <div className="flex items-center animate-in fade-in-0 zoom-in-95 duration-300">
                    <Check className="w-5 h-5 mr-2" />
                    Tilmeldt!
                  </div>
                ) : isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Tilmelder...
                  </div>
                ) : (
                  'Skriv dig op på venteliste'
                )}
              </Button>
            </div>
          </div>
          
          {/* Waitlist description */}
          <p className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto">
            Skriv dig op på ventelisten, og vær en af de første til at prøve SkoleMate. Vi holder dig løbende opdateret.
          </p>
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
          {features.map((feature, index) => (
            <section 
              key={index} 
              className="feature-section relative opacity-0 transform translate-y-12 scale-95 transition-all duration-700"
              data-section-id={`feature-${index}`}
            >
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
                          <h3 className="text-2xl sm:text-3xl font-bold mb-2">{feature.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">{feature.description}</p>
                      
                      <ul className="space-y-4">
                        {feature.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                            <span className="text-gray-300 text-lg leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`${feature.layout === 'image-right' ? 'lg:col-start-1' : ''}`}>
                    <div className="relative">
                      {feature.image ? (
                        <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-80 bg-gradient-to-br from-blue-500/20 to-green-400/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                          <div className="text-6xl opacity-50">{feature.icon}</div>
                        </div>
                      )}
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
            </section>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section id="kontakt" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-400/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Klar til at opleve SkoleMate?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Få en personlig demo og se forskellen på egen skole.
          </p>
          <a
            href="mailto:info@aiklar.dk"
            className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25"
          >
            <Mail className="mr-3 w-6 h-6" />
            Kontakt os
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <a 
              href="https://aiklar.dk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <img 
                src="/lovable-uploads/ee644135-8145-4e97-8a09-dab655b25d72.png" 
                alt="AiKlar" 
                className="h-8"
              />
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
    </div>
  );
};

export default Index;
