import { Instagram, Youtube, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-[#0A0F1E] border-t border-cyber-blue/20 py-8">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0A0F1E]/90 to-blue-900/20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 100%, rgba(56, 189, 248, 0.05) 0%, transparent 50%)`
          }}
        />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/thread_genius"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyber-blue transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyber-blue transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyber-blue transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/privacy-policy"
                className="text-slate-400 hover:text-cyber-blue transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="/terms-of-service"
                className="text-slate-400 hover:text-cyber-blue transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} ThreadGenius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};