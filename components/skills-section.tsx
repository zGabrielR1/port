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
    <section id="skills" className="py-20 bg-muted/10 relative">
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px]" />
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent/4 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-accent text-sm font-medium mb-6 border-0 animate-glass-fade">
            💻 Technical Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and proficiency levels across different domains of software development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="p-6 glass-subtle border-0 hover:glass-card transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 animate-glass-scale" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="p-0 mb-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
