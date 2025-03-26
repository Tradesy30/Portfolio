"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ThemeToggle";

const navItems = [
    { name: "About", href: "#hero" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : ""
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 relative">
                    {/* Left Side - Logo */}
                    <div className="flex-shrink-0">
                        <span className="font-bold text-xl">CR</span>
                    </div>

                    {/* Center - Title (Visible on both Desktop and Mobile) */}
                    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
                        Portfolio
                    </h1>

                    {/* Right Side - Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                variant="ghost"
                                onClick={() => scrollToSection(item.href)}
                                className="text-foreground/70 hover:text-foreground"
                            >
                                {item.name}
                            </Button>
                        ))}
                        <ModeToggle />
                    </div>

                    {/* Right Side - Mobile Navigation */}
                    <div className="md:hidden flex items-center gap-2">
                        <ModeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-background/80 backdrop-blur-lg rounded-lg">
                            {navItems.map((item) => (
                                <Button
                                    key={item.name}
                                    variant="ghost"
                                    onClick={() => scrollToSection(item.href)}
                                    className="w-full text-left justify-start text-foreground/70 hover:text-foreground"
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
