import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Users, Zap } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            👨‍💻 Get to know me
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate software developer with expertise in modern web technologies and a love for creating innovative
            solutions that make a real impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 5 years of experience in software development, I specialize in building scalable web
                applications using cutting-edge technologies. My journey began with a Computer Science degree and has
                evolved through continuous learning and hands-on experience with diverse projects.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm passionate about writing clean, maintainable code and staying up-to-date with the latest industry
                trends. When I'm not coding, you'll find me contributing to open-source projects, mentoring junior
                developers, or exploring new technologies.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">What drives me:</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                  Problem Solver
                </span>
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-colors">
                  Team Player
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                  Continuous Learner
                </span>
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-colors">
                  Innovation Focused
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Clean Code</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Writing maintainable and scalable code that stands the test of time
                </p>
              </CardContent>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Innovation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Creative solutions to complex problems using modern approaches
                </p>
              </CardContent>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Collaboration</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Working effectively in team environments and cross-functional projects
                </p>
              </CardContent>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Performance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Optimizing for speed, efficiency, and exceptional user experiences
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
