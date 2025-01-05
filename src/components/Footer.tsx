import { Instagram, Youtube, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-cyber-darker border-t border-cyber-blue/20 py-8">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(51, 195, 240, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/threadgeniuss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyber-blue transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyber-blue transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyber-blue transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-cyber-blue transition-colors font-rajdhani"
              >
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="/terms-of-service"
                className="text-gray-400 hover:text-cyber-blue transition-colors font-rajdhani"
              >
                Terms of Service
              </a>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-rajdhani">
            © {new Date().getFullYear()} ThreadGenius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};