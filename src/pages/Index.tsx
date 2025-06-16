
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, BookOpen, MessageCircle, ClipboardList, Heart, Mail, ArrowRight, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Setup intersection observer for scroll animations
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    // Observe all feature sections
    const sections = document.querySelectorAll('.feature-section');
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log('Email submitted:', email);
    // You can add toast notification or other feedback here
    setEmail('');
  };

  const features = [
    {
      title: "AI-generering af forløb & materiale",
      icon: <BookOpen className="w-8 h-8" />,
      bullets: [
        "Ledelse: rammer for ensretning → overblik & kvalitet",
        "Lærere: differentieret materiale → mere tid til elever", 
        "Elever: interaktiv undervisning → højere engagement"
      ],
      layout: "image-left"
    },
    {
      title: "AI-chatbot med skolens info",
      icon: <MessageCircle className="w-8 h-8" />,
      bullets: [
        "Formidler kultur & politikker",
        "Svar på regler, faglige spørgsmål",
        "Trivsel & inklusion for elever"
      ],
      layout: "image-right"
    },
    {
      title: "Kommunikation & opgavestyring",
      icon: <ClipboardList className="w-8 h-8" />,
      bullets: [
        "Ledelse ser trivsel i realtid",
        "Lærere udsender opgaver i ét flow",
        "Elever får klar struktur & feedback"
      ],
      layout: "image-left"
    },
    {
      title: "Inklusionsværktøjer (AI)",
      icon: <Heart className="w-8 h-8" />,
      bullets: [
        "Differentieret læring for alle",
        "AI-støtte til ADHD, autisme og dysleksi",
        "Øget læringsudbytte & selvværd"
      ],
      layout: "image-right"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
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
            Én platform – tilpasset ledelse, lærere og elever
          </p>
          
          {/* Email Signup Form */}
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-16">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Din email adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Skriv dig op på venteliste
              </Button>
            </div>
          </form>
        </div>
        
        {/* Scroll indicator - moved to bottom center without overlapping */}
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
            <section key={index} className={`feature-section opacity-0 transition-all duration-1000 ${feature.layout === 'image-left' ? 'translate-x-12' : '-translate-x-12'}`}>
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

                  {/* Image placeholder */}
                  <div className={`${feature.layout === 'image-right' ? 'lg:col-start-1' : ''}`}>
                    <div className="relative">
                      <div className="w-full h-80 bg-gradient-to-br from-blue-500/20 to-green-400/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                        <div className="text-6xl opacity-50">{feature.icon}</div>
                      </div>
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
            href="mailto:info@skolemate.dk"
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
          <div className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text text-2xl font-bold mb-4">
            SkoleMate
          </div>
          <p className="text-gray-400">© 2024 SkoleMate. Alle rettigheder forbeholdes.</p>
        </div>
      </footer>

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateX(0) !important;
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
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
