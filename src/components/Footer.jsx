import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const socials = [
  { Icon: Github,   href: 'https://adityapurigithub.com',   label: 'GitHub'   },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/aditya-p-a92771202',  label: 'LinkedIn' },
  { Icon: Mail,     href: 'mailto:adityapuri85@gmail.com', label: 'Email'   },
];

export default function Footer() {
  return (
    <footer className="relative py-8 border-t border-white/[0.06] overflow-hidden">
      {/* Subtle glass surface */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl" />
      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left — name */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()}{' '}
          <span className="text-gradient font-semibold">Aditya Puri</span>
        </p>

        {/* Center — made with */}
        <p className="hidden text-gray-600 text-xs flex items-center gap-1">
          Made with <Heart size={12} className="text-accent inline" /> and React
        </p>

        {/* Right — socials */}
        <div className="flex gap-3">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="p-2 text-gray-600 hover:text-primary-400 transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
