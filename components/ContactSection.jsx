import { useState, useEffect } from "react";
import ContactButton from "./RotatingContactButton";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(null); // null, 'success', or 'error'
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const contactObserver = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsContactVisible(true);
      },
      { threshold: 0.1 }
    );
    const contactSection = document.getElementById('contact-section');
    if (contactSection) contactObserver.observe(contactSection);
    return () => contactObserver.disconnect();
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailStatus('error');
      return;
    }
    setEmailStatus('success');
    setEmail("");
    setTimeout(() => setEmailStatus(null), 3000);
  };

  return (
    <section id="contact-section" className="min-h-[85vh] pt-20 pb-0">
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Get in touch with me
        </h2>
        <div className="flex flex-col items-center">
          <div className="scale-75 mb-4">
            <ContactButton />
          </div>
          <div className="w-full flex items-center gap-4 mt-2">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>
          <form onSubmit={handleEmailSubmit} className="w-full mt-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 md:py-3 pr-20 md:pr-24 rounded-lg bg-white/10 border ${
                  emailStatus === 'error'
                    ? 'border-red-500'
                    : emailStatus === 'success'
                    ? 'border-green-500'
                    : 'border-white/20'
                } text-black placeholder-gray-500 focus:outline-none focus:border-[#3d5be0]`}
              />
              <button
                type="submit"
                className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 px-3 md:px-4 py-1 md:py-1.5 bg-[#3d5be0] text-white rounded-md font-semibold hover:bg-[#2d4bd0] transition-colors text-sm md:text-base"
              >
                Send
              </button>
            </div>
            {emailStatus === 'success' && (
              <div className="mt-2 text-sm text-green-600 animate-fade-in">
                Email sent successfully!
              </div>
            )}
            {emailStatus === 'error' && (
              <div className="mt-2 text-sm text-red-600 animate-fade-in">
                Please enter a valid email address.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
