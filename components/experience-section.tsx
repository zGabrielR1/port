"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Award, Briefcase } from "lucide-react"
import { ShaderBackground } from "@/components/ui/shader-background"

export function ExperienceSection() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
    <section id="experience" className="py-20 bg-black relative overflow-hidden">
      {/* Subtle Shader Background */}
      <ShaderBackground 
        intensity={0.06} 
        speed={0.4} 
        complexity={5}
        className="opacity-30"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center px-6 py-3 rounded-full glassmorphism text-white text-sm font-medium mb-4 transition-all duration-700 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Professional Journey
          </div>
          <h2 
            className={`text-3xl sm:text-4xl font-bold text-white mb-4 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Experience & Education
          </h2>
          <p 
            className={`text-lg text-white/80 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            My professional journey and continuous learning path in software development and technology leadership.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <h3 
              className={`text-2xl font-bold text-white mb-6 transition-all duration-700 delay-400 ${
                visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              Work Experience
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-400 opacity-60" />
              
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`relative glassmorphism p-6 mb-6 ml-16 rounded-xl transition-all duration-700 hover:scale-102 group ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ animationDelay: `${500 + index * 200}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[4.25rem] top-8 w-4 h-4 bg-blue-400 rounded-full border-4 border-black group-hover:bg-purple-400 transition-colors duration-300" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">{exp.title}</h4>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-white/70 shrink-0">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/90 mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-3 text-sm text-white/80">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-8">
            <div 
              className={`transition-all duration-700 delay-600 ${
                visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
              {education.map((edu, index) => (
                <div key={index} className="glassmorphism p-6 rounded-xl hover:scale-105 transition-all duration-300 group">
                  <h4 className="font-semibold text-lg mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">{edu.degree}</h4>
                  <p className="text-blue-400 font-medium mb-2">{edu.school}</p>
                  <p className="text-sm text-white/70 mb-3">{edu.period}</p>
                  <p className="text-sm text-white/80">{edu.details}</p>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            <div 
              className={`transition-all duration-700 delay-700 ${
                visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Certifications</h3>
              <div className="glassmorphism p-6 rounded-xl hover:scale-105 transition-all duration-300 group">
                <ul className="space-y-4">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/90 hover:text-white transition-colors duration-200">
                      <Award className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm">{cert}</span>
                    </li>
                  ))}
                </ul>
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
