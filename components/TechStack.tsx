"use client";

interface TechBadge {
    name: string;
    className: string;
}

const TECH_STACK: TechBadge[] = [
    {
        name: "React",
        className: "bg-sky-500/10 text-sky-500 border-sky-500/20 hover:bg-sky-500/15 dark:bg-sky-400/10 dark:text-sky-400 dark:border-sky-400/20 dark:hover:bg-sky-400/15"
    },
    {
        name: "Next.js",
        className: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20 hover:bg-indigo-500/15 dark:bg-indigo-400/10 dark:text-indigo-400 dark:border-indigo-400/20 dark:hover:bg-indigo-400/15"
    },
    {
        name: "TypeScript",
        className: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20 hover:bg-cyan-500/15 dark:bg-cyan-400/10 dark:text-cyan-400 dark:border-cyan-400/20 dark:hover:bg-cyan-400/15"
    },
    {
        name: "Tailwind",
        className: "bg-teal-500/10 text-teal-500 border-teal-500/20 hover:bg-teal-500/15 dark:bg-teal-400/10 dark:text-teal-400 dark:border-teal-400/20 dark:hover:bg-teal-400/15"
    },
    {
        name: "Shadcn UI",
        className: "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/15 dark:bg-rose-400/10 dark:text-rose-400 dark:border-rose-400/20 dark:hover:bg-rose-400/15"
    },
    {
        name: "REST APIs",
        className: "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/15 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/20 dark:hover:bg-amber-400/15"
    }
];

export function TechStack() {
    return (
        <div className="relative w-full overflow-hidden py-2">
            <div className="tech-scroll flex">
                {/* First set of badges */}
                <div className="flex gap-3 sm:gap-4 pr-3 sm:pr-4">
                    {TECH_STACK.map((tech, index) => (
                        <span
                            key={`original-${index}`}
                            className={`
                                shrink-0
                                px-2.5 py-1 sm:px-3 sm:py-1.5
                                text-sm sm:text-base
                                rounded-full font-medium
                                border transition-colors duration-200
                                ${tech.className}
                            `}
                        >
                            {tech.name}
                        </span>
                    ))}
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex gap-3 sm:gap-4 pr-3 sm:pr-4" aria-hidden="true">
                    {TECH_STACK.map((tech, index) => (
                        <span
                            key={`duplicate-${index}`}
                            className={`
                                shrink-0
                                px-2.5 py-1 sm:px-3 sm:py-1.5
                                text-sm sm:text-base
                                rounded-full font-medium
                                border transition-colors duration-200
                                ${tech.className}
                            `}
                        >
                            {tech.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}