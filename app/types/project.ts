export interface ProjectImage {
    url: string;
    alt: string;
    caption: string;
}

export interface Technology {
    name: string;
    color: string;
}

export interface ProjectFeature {
    title: string;
    description: string;
}

export interface Project {
    id: number;
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    coverImage: string;
    images: ProjectImage[];
    tags: string[];
    technologies: Technology[];
    features: ProjectFeature[];
    challenges: string[];
    learnings: string[];
    link: string;
    github: string;
    date: string;
}