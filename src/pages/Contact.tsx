import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, MapPin, Loader2, Github, Linkedin, Facebook, Instagram } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: typeof errors = {};
    
    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!validateMessage(formData.message)) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // EmailJS credentials
      const serviceId = 'service_33hggme';
      const templateIdOwner = 'template_tr5sgir';
      const templateIdUser = 'template_hf8ujcu';
      const publicKey = 'IQdWh9pIj4-OkLp7m';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: 'Contact Form Submission',
        message: formData.message
      };

      // Send message to owner
      await emailjs.send(
        serviceId,
        templateIdOwner,
        templateParams,
        publicKey
      );

      // Send auto-reply to user
      await emailjs.send(
        serviceId,
        templateIdUser,
        templateParams,
        publicKey
      );

      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible."
      });
      
      setFormData({ name: '', email: '', message: '' });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message', {
        description: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/sayeesx" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/msayees/" },
    { name: "X", icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ), url: "https://x.com/sayeesck" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/sayees__/?hl=en" },
    { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
    { name: "Reddit", icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ), url: "https://www.reddit.com/user/shelfish/" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      {/* Content */}
      <div className="flex-1 px-6 py-16 pt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="cursor-pointer -ml-4 text-white hover:bg-white hover:text-black"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            <div className="space-y-6">
              <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white">
                Get In Touch
              </h1>
              <div className="h-1 w-20 bg-white" />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
                  Have a project in mind or just want to chat? Feel free to reach out.
                  I'm always open to discussing new opportunities and collaborations.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <Mail className="h-4 w-4 md:h-5 md:w-5 mt-1 text-white" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-white">Email</p>
                      <a
                        href="mailto:sayees@mail.com"
                        className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                      >
                        sayees@mail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 mt-1 text-white" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-white">Location</p>
                      <p className="text-xs md:text-sm text-gray-400">
                        Available for remote work worldwide
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="pt-4">
                  <p className="text-sm md:text-base font-medium text-white mb-4">Connect with me</p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-all cursor-pointer"
                          aria-label={social.name}
                        >
                          <IconComponent />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    disabled={isSubmitting}
                    className={`bg-black border-gray-700 text-white placeholder:text-gray-500 ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    disabled={isSubmitting}
                    className={`bg-black border-gray-700 text-white placeholder:text-gray-500 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    disabled={isSubmitting}
                    className={`bg-black border-gray-700 text-white placeholder:text-gray-500 ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full cursor-pointer bg-white hover:bg-gray-200 text-black font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}