import { notFound } from "next/navigation";
import { projects } from "@/app/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
    params: {
        slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default function ProjectPage({ params }: Props) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Back Button */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="group gap-2 hover:bg-primary/5"
                        asChild
                    >
                        <Link href="/#projects">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Projects
                        </Link>
                    </Button>
                </div>

                {/* Project Header */}
                <Card className="relative border-border/40 bg-background/60 backdrop-blur-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/0 to-secondary/20 pointer-events-none" />
                    <div className="absolute -inset-[1000px] bg-background/30 backdrop-blur-[2px] pointer-events-none" />
                    <div className="relative">
                        <CardContent className="p-6 md:p-8">
                            <div className="space-y-8">
                                {/* Title and Description */}
                                <div className="space-y-4">
                                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-primary via-foreground to-primary bg-clip-text text-transparent">
                                        {project.title}
                                    </h1>
                                    <p className="text-lg text-foreground/90 leading-relaxed max-w-3xl">
                                        {project.longDescription}
                                    </p>
                                </div>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
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
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <Button asChild variant="outline" size="lg" className="group/btn">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-5 h-5 mr-2 transition-transform group-hover/btn:scale-110" />
                                            View Source
                                        </a>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="group/btn">
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-5 h-5 mr-2 transition-transform group-hover/btn:scale-110" />
                                            Live Demo
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Features */}
                    <Card className="relative border-border/40 bg-background/60 backdrop-blur-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/0 to-secondary/20 pointer-events-none" />
                        <div className="absolute -inset-[1000px] bg-background/30 backdrop-blur-[2px] pointer-events-none" />
                        <div className="relative">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    Key Features
                                </h2>
                                <div className="space-y-6">
                                    {project.features.map((feature) => (
                                        <div key={feature.title} className="space-y-2">
                                            <h3 className="font-medium text-lg text-foreground/90">
                                                {feature.title}
                                            </h3>
                                            <p className="text-foreground/70 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </div>
                    </Card>

                    {/* Challenges */}
                    <Card className="relative border-border/40 bg-background/60 backdrop-blur-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/0 to-secondary/20 pointer-events-none" />
                        <div className="absolute -inset-[1000px] bg-background/30 backdrop-blur-[2px] pointer-events-none" />
                        <div className="relative">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    Challenges
                                </h2>
                                <ul className="space-y-3 text-foreground/70 list-disc list-inside marker:text-primary">
                                    {project.challenges.map((challenge) => (
                                        <li key={challenge} className="leading-relaxed">
                                            {challenge}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </div>
                    </Card>

                    {/* Learnings */}
                    <Card className="relative border-border/40 bg-background/60 backdrop-blur-xl overflow-hidden md:col-span-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/0 to-secondary/20 pointer-events-none" />
                        <div className="absolute -inset-[1000px] bg-background/30 backdrop-blur-[2px] pointer-events-none" />
                        <div className="relative">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    Key Learnings
                                </h2>
                                <ul className="space-y-3 text-foreground/70 list-disc list-inside marker:text-primary">
                                    {project.learnings.map((learning) => (
                                        <li key={learning} className="leading-relaxed">
                                            {learning}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </div>
                    </Card>
                </div>

                {/* Project Gallery */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Project Gallery
                    </h2>
                    <div className="grid grid-cols-1 gap-8">
                        {project.images.map((image) => (
                            <div
                                key={image.url}
                                className="relative aspect-video overflow-hidden rounded-lg border border-border/40 bg-background/60 backdrop-blur-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/0 to-secondary/20 pointer-events-none z-10" />
                                <div className="absolute -inset-[1000px] bg-background/30 backdrop-blur-[2px] pointer-events-none z-10" />
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover z-0"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-4 z-20">
                                    <p className="text-sm text-foreground/90">{image.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}