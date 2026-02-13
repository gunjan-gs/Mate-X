"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Logo } from "@/components/brand/logo"

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl relative overflow-hidden">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
      <div className="container mx-auto px-6 py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand Column (Wider) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
              The intelligent workspace for high-performing students. 
              Built to replace your calendar, to-do list, and focus timer.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://github.com/gunjan-gs" icon={Github} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/gunjansoni27/" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="mailto:gunjansoni27official@gmail.com" icon={Mail} label="Email" />
            </div>
          </div>
          
          {/* Links Columns */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground tracking-wider uppercase">Product</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><button onClick={() => scrollTo("features")} className="hover:text-indigo-400 transition-colors text-left">Features</button></li>
              <li><button onClick={() => scrollTo("pricing")} className="hover:text-indigo-400 transition-colors text-left">Pricing</button></li>
              <li><button onClick={() => scrollTo("testimonials")} className="hover:text-indigo-400 transition-colors text-left">Wall of Love</button></li>
              <li><Link href="/changelog" className="hover:text-indigo-400 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mate-X Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  All Systems Operational
              </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
    return (
        <Link 
            href={href} 
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-indigo-400 text-muted-foreground transition-all duration-300 border border-transparent hover:border-white/10"
            aria-label={label}
        >
            <Icon className="h-5 w-5" />
        </Link>
    )
}
