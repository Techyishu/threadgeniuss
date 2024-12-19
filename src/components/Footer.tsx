import { Instagram, Youtube, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
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
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} ThreadGenius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};