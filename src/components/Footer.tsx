import { Instagram, Youtube, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-gray-200 py-8">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1A1F2C] opacity-[0.02]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1A1F2C 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.1
        }} />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/threadgeniuss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyber-blue transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyber-blue transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyber-blue transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/privacy-policy"
                className="text-gray-600 hover:text-cyber-blue transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="/terms-of-service"
                className="text-gray-600 hover:text-cyber-blue transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} ThreadGenius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};