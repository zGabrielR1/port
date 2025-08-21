export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="font-bold text-xl text-primary">Gabriel Renostro</div>
          <p className="text-muted-foreground">Full-Stack Developer & Software Engineer</p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-primary transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#experience" className="hover:text-primary transition-colors">
              Experience
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">© 2024 Gabriel Renostro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
