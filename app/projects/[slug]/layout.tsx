import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Project Details | Christopher Rodriguez',
    description: 'Detailed view of my project work and technical implementations.',
};

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}