
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Send, Check } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append('access_key', '2607e893-a84f-48d1-a4e8-bb0c77c50937');
    formPayload.append('name', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('message', formData.message);
    formPayload.append('subject', 'Ny henvendelse fra SkoleMate');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload
      });

      const data = await response.json();

      if (data.success) {
        console.log('Form submitted successfully');
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setIsSubmitting(false);
          setIsSubmitted(false);
        }, 3000);
      } else {
        console.error('Form submission failed:', data);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-400/20"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Mail className="w-8 h-8 text-green-400" />
          <h2 className="text-4xl sm:text-5xl font-bold">
            Kontakt os
          </h2>
        </div>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Få en personlig demo og se forskellen på egen skole.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Navn</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting || isSubmitted}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 disabled:opacity-50"
                  placeholder="Dit navn"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting || isSubmitted}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 disabled:opacity-50"
                  placeholder="din@email.dk"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">Besked</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting || isSubmitted}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 disabled:opacity-50 min-h-[120px]"
                placeholder="Fortæl os om jeres skole og hvordan SkoleMate kan hjælpe jer..."
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting || isSubmitted || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
              className={`
                w-full px-12 py-6 rounded-2xl font-bold text-lg transition-all duration-300 transform shadow-2xl hover:shadow-green-500/25
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
                <div className="flex items-center justify-center animate-in fade-in-0 zoom-in-95 duration-300">
                  <Check className="w-6 h-6 mr-3" />
                  Besked sendt!
                </div>
              ) : isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sender besked...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Send className="w-6 h-6 mr-3" />
                  Send besked
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
