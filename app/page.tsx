// app/page.tsx
import { MapPin, Download, Github, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { TechStack } from "@/components/TechStack";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/app/data/projects";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main className="w-full pt-8">
        <section id="hero" className="relative pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="relative border-border/40 bg-background/60 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/0 to-secondary/20 pointer-events-none" />
              <div className="absolute -inset-[1000px] bg-background/30 backdrop-blur-[2px] pointer-events-none" />

              <div className="relative">
                <CardHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="inline-block">
                        <span className="text-sm font-medium bg-primary/20 text-primary px-3 py-1 rounded-full">
                          Frontend Developer
                        </span>
                      </div>
                      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-relaxed bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent pb-1">
                        Christopher Rodriguez
                      </h1>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>Greensboro, NC, USA</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="max-w-2xl relative">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-1/2 bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
                    <div className="pl-4 border-l border-primary/20">
                      <p className="text-lg text-foreground/90 leading-relaxed">
                        Passionate about crafting exceptional web experiences through modern, accessible applications.
                        With expertise in React and Next.js, I transform complex challenges into elegant, user-centric solutions.
                      </p>
                    </div>
                  </div>

                  <div className="tech-stack-container">
                    <TechStack />
                  </div>

                  <div className="flex justify-center pt-2">
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="group gap-2 hover:bg-primary/5"
                    >
                      <a href="/Christopher-Rodriguez-CV.pdf" download>
                        <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                        Download Resume
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        <section id="projects" className="relative pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="group relative border-border/40 bg-background/60 backdrop-blur-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/0 to-secondary/10 pointer-events-none" />
                  <Link href={`/projects/${project.slug}`} className="block">
                    <CardHeader>
                      <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          className="object-cover select-none"
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/90 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech.name}
                            variant="secondary"
                            className="text-sm py-1 px-3"
                            style={{
                              backgroundColor: `${tech.color}15`,
                              color: tech.color,
                            }}
                          >
                            {tech.name}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                  <CardFooter className="flex gap-4">
                    <Button variant="outline" size="sm" className="group/btn" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" />
                        Source Code
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="group/btn" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" />
                        Live Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
