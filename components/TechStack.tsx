"use client";

interface TechBadge {
    name: string;
    className: string;
}

const TECH_STACK: TechBadge[] = [
    {
        name: "React",
        className: "bg-[#0070F3]/10 text-[#0070F3] border-[#0070F3]/20 hover:bg-[#0070F3]/15 dark:bg-[#0070F3]/10 dark:text-[#0070F3] dark:border-[#0070F3]/20 dark:hover:bg-[#0070F3]/15"
    },
    {
        name: "Next.js",
        className: "bg-[#0070F3]/10 text-[#0070F3] border-[#0070F3]/20 hover:bg-[#0070F3]/15 dark:bg-[#0070F3]/10 dark:text-[#0070F3] dark:border-[#0070F3]/20 dark:hover:bg-[#0070F3]/15"
    },
    {
        name: "TypeScript",
        className: "bg-[#3178C6]/10 text-[#3178C6] border-[#3178C6]/20 hover:bg-[#3178C6]/15 dark:bg-[#3178C6]/10 dark:text-[#3178C6] dark:border-[#3178C6]/20 dark:hover:bg-[#3178C6]/15"
    },
    {
        name: "Tailwind",
        className: "bg-[#38B2AC]/10 text-[#38B2AC] border-[#38B2AC]/20 hover:bg-[#38B2AC]/15 dark:bg-[#38B2AC]/10 dark:text-[#38B2AC] dark:border-[#38B2AC]/20 dark:hover:bg-[#38B2AC]/15"
    },
    {
        name: "Shadcn UI",
        className: "bg-[#8A2BE2]/10 text-[#8A2BE2] border-[#8A2BE2]/20 hover:bg-[#8A2BE2]/15 dark:bg-[#8A2BE2]/10 dark:text-[#8A2BE2] dark:border-[#8A2BE2]/20 dark:hover:bg-[#8A2BE2]/15"
    },
    {
        name: "REST APIs",
        className: "bg-[#FF4D94]/10 text-[#FF4D94] border-[#FF4D94]/20 hover:bg-[#FF4D94]/15 dark:bg-[#FF4D94]/10 dark:text-[#FF4D94] dark:border-[#FF4D94]/20 dark:hover:bg-[#FF4D94]/15"
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