import { Instagram, Youtube, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-cyber-darker border-t border-cyber-blue/20 py-12">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-neon-grid bg-[length:50px_50px] opacity-5" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-dark to-cyber-darker" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <a
              href="https://twitter.com/threadgeniuss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-blue/60 hover:text-cyber-blue transition-colors duration-300 hover:shadow-neon"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-blue/60 hover:text-cyber-blue transition-colors duration-300 hover:shadow-neon"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-blue/60 hover:text-cyber-blue transition-colors duration-300 hover:shadow-neon"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/privacy-policy"
              className="text-cyber-blue/60 hover:text-cyber-blue transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <span className="text-cyber-blue/20">|</span>
            <a
              href="/terms-of-service"
              className="text-cyber-blue/60 hover:text-cyber-blue transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>

          <p className="text-cyber-blue/60 text-sm">
            © {new Date().getFullYear()} ThreadGenius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};