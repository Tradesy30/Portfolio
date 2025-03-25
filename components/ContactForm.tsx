"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React from "react";

if (!process.env.NEXT_PUBLIC_FORMSPREE_ID) {
    throw new Error("NEXT_PUBLIC_FORMSPREE_ID is not defined in environment variables");
}

export default function ContactForm() {
    const [state, handleSubmit] = useForm("mzzegnry");
    const { toast } = useToast();
    const formRef = React.useRef<HTMLFormElement>(null);

    React.useEffect(() => {
        if (state.succeeded) {
            toast({
                title: "Message sent successfully! 🎉",
                description: "Thank you for reaching out. I'll get back to you soon.",
                className: "bg-green-500/10 border-green-500/20 text-green-500",
                action: (
                    <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                    </div>
                ),
            });

            if (formRef.current) {
                formRef.current.reset();
            }
        }
    }, [state.succeeded, toast]);

    return (
        <Card className="group relative border-border/40 bg-background/60 backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/0 to-secondary/10 pointer-events-none" />
            <div className="absolute -inset-[1000px] bg-background/30 backdrop-blur-[2px] pointer-events-none" />
            <div className="relative">
                <CardHeader className="space-y-6">
                    <div className="space-y-4">
                        <div className="inline-block">
                            <span className="inline-flex items-center gap-2 text-base font-medium bg-primary/20 text-primary px-4 py-1.5 rounded-full transition-transform hover:scale-[1.02] hover:bg-primary/25">
                                <Mail className="w-4 h-4" />
                                Contact Me
                            </span>
                        </div>
                        <div className="max-w-2xl relative">
                            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-1/2 bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
                            <div className="pl-4 border-l border-primary/20">
                                <p className="text-lg text-foreground/90 leading-relaxed">
                                    Have a question or want to work together? I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="bg-background/50"
                                autoComplete="name"
                            />
                            <ValidationError
                                prefix="Name"
                                field="name"
                                errors={state.errors}
                                className="text-sm text-destructive"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                className="bg-background/50"
                                autoComplete="email"
                            />
                            <ValidationError
                                prefix="Email"
                                field="email"
                                errors={state.errors}
                                className="text-sm text-destructive"
                            />
                        </div>
                        <div className="space-y-2">
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Your Message"
                                required
                                className="min-h-[120px] bg-background/50"
                            />
                            <ValidationError
                                prefix="Message"
                                field="message"
                                errors={state.errors}
                                className="text-sm text-destructive"
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                variant="ghost"
                                disabled={state.submitting}
                                className="bg-primary/20 text-primary hover:bg-primary/25 transition-transform hover:scale-[1.02]"
                            >
                                {state.submitting ? "Sending..." : "Send Message"}
                            </Button>
                            <ValidationError
                                errors={state.errors}
                                className="mt-2 text-sm text-destructive"
                            />
                        </div>
                    </form>
                </CardContent>
            </div>
        </Card>
    );
}