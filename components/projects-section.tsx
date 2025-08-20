import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Weather Analytics Dashboard",
      description:
        "A data visualization dashboard that displays weather patterns and analytics using real-time weather API data.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media Platform",
      description:
        "A modern social networking platform with real-time messaging, content sharing, and advanced privacy controls.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["React Native", "GraphQL", "AWS", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            🚀 Featured Projects
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 relative">
            Featured Projects
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work and personal projects that demonstrate my technical skills and creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group relative overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full text-sm font-medium hover:from-primary/20 hover:to-primary/10 hover:scale-105 transition-all duration-300 border border-primary/20 hover:border-primary/30">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group/btn">
                    <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent hover:bg-accent/10 hover:border-accent/30 hover:scale-105 transition-all duration-300 group/btn">
                    <Github className="mr-2 h-4 w-4 group-hover/btn:scale-110 group-hover/btn:text-accent transition-all duration-300" />
                    Code
                  </Button>
                </div>
              </CardContent>

              {/* Hover accent elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
