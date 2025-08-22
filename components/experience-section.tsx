import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description:
        "Lead development of scalable web applications serving 100k+ users. Mentor junior developers and architect cloud-native solutions.",
      achievements: [
        "Reduced application load time by 40% through optimization",
        "Led a team of 5 developers on major product redesign",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
    {
      title: "Full-Stack Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      period: "2020 - 2022",
      description:
        "Developed and maintained multiple client projects using modern web technologies. Collaborated with design and product teams.",
      achievements: [
        "Built 15+ responsive web applications from scratch",
        "Integrated third-party APIs and payment systems",
        "Improved code coverage from 60% to 95%",
      ],
    },
    {
      title: "Junior Developer",
      company: "WebDev Agency",
      location: "Remote",
      period: "2019 - 2020",
      description:
        "Started career building websites and learning modern development practices. Focused on frontend development and user experience.",
      achievements: [
        "Completed 20+ client websites with 100% satisfaction",
        "Learned React, Node.js, and modern development tools",
        "Contributed to open-source projects",
      ],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      period: "2015 - 2019",
      details: "Graduated Magna Cum Laude with focus on Software Engineering and Data Structures",
    },
  ]

  const certifications = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer",
    "Scrum Master Certification",
  ]

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-primary text-sm font-medium mb-6 border-0 hover:glass transition-all duration-500 animate-glass-fade">
            💼 Professional Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 relative">
            Experience & Education
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto hover:text-foreground/90 transition-colors duration-300">
            My professional journey and continuous learning path in software development and technology leadership.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Work Experience</h3>
            {experiences.map((exp, index) => (
              <Card key={index} className="group p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border-0 glass-card animate-glass-scale" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
                <CardHeader className="p-0 mb-4 relative z-10">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{exp.title}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center text-primary font-medium group-hover:text-primary/90 transition-colors duration-300">{exp.company}</div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 group-hover:text-primary/70 transition-colors duration-300" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 group-hover:text-accent/70 transition-colors duration-300" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4 relative z-10">
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-2 text-sm group-hover:text-foreground/80 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:bg-accent transition-colors duration-300" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
              </Card>
            ))}
          </div>

          {/* Education & Certifications */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Education</h3>
              {education.map((edu, index) => (
                <Card key={index} className="group p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border-0 glass-card animate-glass-scale">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
                  <CardContent className="p-0 relative z-10">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{edu.degree}</h4>
                    <p className="text-primary font-medium mb-2 group-hover:text-primary/90 transition-colors duration-300">{edu.school}</p>
                    <p className="text-sm text-muted-foreground mb-3 group-hover:text-foreground/70 transition-colors duration-300">{edu.period}</p>
                    <p className="text-sm group-hover:text-foreground/80 transition-colors duration-300">{edu.details}</p>
                  </CardContent>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                </Card>
              ))}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Certifications</h3>
              <Card className="group p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border-0 glass-card animate-glass-scale" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
                <CardContent className="p-0 relative z-10">
                  <ul className="space-y-3">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-center gap-2 group-hover:text-foreground/80 transition-colors duration-300">
                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 group-hover:bg-accent/80 transition-colors duration-300" />
                        <span className="text-sm">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
