import { Project } from '@/app/types/project';

export const projects: Project[] = [
    {
        id: 1,
        slug: 'portfolio',
        title: 'Portfolio',
        description: 'A modern, animated portfolio website built with Next.js 14, featuring interactive UI components and smooth animations.',
        longDescription: 'A completely redesigned portfolio website that showcases modern web development practices and creative UI/UX design. Built with Next.js 14 and featuring interactive animations, dynamic project pages, and a beautiful dark/light theme system. The site demonstrates technical excellence through its use of React Server Components, TypeScript, and modern styling techniques.',
        coverImage: '/projects/portfolio.png',
        images: [
            {
                url: '/projects/portfolio.png',
                alt: 'Portfolio Website Homepage',
                caption: 'Modern homepage with animated background elements and interactive UI'
            }
        ],
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
        technologies: [
            { name: 'Next.js 14', color: '#0070F3' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'Tailwind CSS', color: '#38B2AC' },
            { name: 'Shadcn UI', color: '#8A2BE2' },
            { name: 'Radix UI', color: '#FF4D94' },
            { name: 'Lucide Icons', color: '#9333EA' },
            { name: 'Zod', color: '#4F46E5' }
        ],
        features: [
            {
                title: 'Interactive Animations',
                description: 'Custom animated backgrounds with floating icons and shooting stars'
            },
            {
                title: 'Modern UI Components',
                description: 'Beautifully designed UI using Shadcn UI and Radix primitives'
            },
            {
                title: 'Dynamic Project Pages',
                description: 'Detailed project showcases with rich content and responsive layouts'
            },
            {
                title: 'Form Integration',
                description: 'Contact form with Formspree integration and Zod validation'
            },
            {
                title: 'Optimized Performance',
                description: 'React Server Components and optimized client-side animations'
            },
            {
                title: 'Responsive Design',
                description: 'Fully responsive layout with optimal viewing on all devices'
            }
        ],
        challenges: [
            'Creating performant canvas-based animations that work smoothly across devices',
            'Implementing a responsive design that maintains visual appeal and animation performance',
            'Optimizing animation performance during scroll events',
            'Building reusable UI components with consistent styling and behavior',
            'Ensuring accessibility while maintaining complex interactive elements'
        ],
        learnings: [
            'Advanced canvas animation techniques and optimization',
            'React Server Components and Next.js 14 app router patterns',
            'Component composition with Shadcn UI and Radix',
            'Performance optimization for animated elements',
            'Modern TypeScript patterns and best practices',
            'Form validation and handling with Zod and Formspree'
        ],
        link: 'https://portfolio-v2-tradesy30.vercel.app/',
        github: 'https://github.com/Tradesy30/Portfolio',
        date: '2024-03'
    },
    {
        id: 2,
        slug: 'task-management-app',
        title: 'Task Management App',
        description: 'A full-stack task management application with real-time updates and collaborative features.',
        longDescription: 'A comprehensive task management solution that helps teams organize and track their projects efficiently. Features include real-time updates, collaborative workspaces, and detailed analytics.',
        coverImage: '/projects/portfolio.png',
        images: [
            {
                url: '/projects/portfolio.png',
                alt: 'Task Management App Dashboard',
                caption: 'Interactive dashboard with task analytics'
            }
        ],
        tags: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
        technologies: [
            { name: 'React', color: '#0070F3' },
            { name: 'Node.js', color: '#84CC16' },
            { name: 'MongoDB', color: '#4ADE80' },
            { name: 'Socket.io', color: '#E879F9' },
            { name: 'Express', color: '#94A3B8' },
            { name: 'Chart.js', color: '#F472B6' }
        ],
        features: [
            {
                title: 'Real-time Collaboration',
                description: 'Live updates and collaborative editing using WebSocket technology'
            },
            {
                title: 'Task Analytics',
                description: 'Detailed insights and progress tracking with interactive charts'
            },
            {
                title: 'Smart Categories',
                description: 'AI-powered task categorization and priority suggestions'
            },
            {
                title: 'Team Management',
                description: 'Role-based access control and team workspace organization'
            }
        ],
        challenges: [
            'Implementing real-time synchronization across multiple clients',
            'Designing an efficient database schema for complex task relationships',
            'Building a scalable WebSocket architecture',
            'Optimizing performance for large datasets'
        ],
        learnings: [
            'WebSocket implementation best practices',
            'MongoDB schema design and optimization',
            'State management in real-time applications',
            'Building scalable Node.js backend services'
        ],
        link: 'https://task-management-demo.vercel.app',
        github: 'https://github.com/Tradesy30/task-management',
        date: '2024-01'
    }
];