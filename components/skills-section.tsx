import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 75 },
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 78 },
        { name: "GraphQL", level: 82 },
      ],
    },
    {
      title: "Tools & Others",
      icon: "🛠️",
      skills: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Jest", level: 85 },
        { name: "Figma", level: 70 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 text-accent text-sm font-medium mb-6 backdrop-blur-sm border border-accent/20 hover:border-accent/40 hover:bg-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:scale-105">
            💻 Technical Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 relative">
            Skills & Technologies
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-accent to-primary rounded-full opacity-60" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed hover:text-foreground/90 transition-colors duration-300">
            A comprehensive overview of my technical expertise and proficiency levels across different domains of software development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="group p-8 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 hover:rotate-1 border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
              <CardHeader className="p-0 mb-8 relative z-10">
                <div className="text-center">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 relative z-10">
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-3 group/skill">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground group-hover/skill:text-primary transition-colors duration-300">{skill.name}</span>
                        <span className="text-sm text-muted-foreground font-semibold group-hover/skill:text-foreground transition-colors duration-300">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-primary via-accent to-primary h-3 rounded-full transition-all duration-1000 ease-out hover:shadow-lg hover:shadow-primary/30 relative"
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
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
