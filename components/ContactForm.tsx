"use client";

import { useForm } from "@formspree/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

if (!process.env.NEXT_PUBLIC_FORMSPREE_ID) {
    throw new Error("NEXT_PUBLIC_FORMSPREE_ID is not defined in environment variables");
}

const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID as string);
    const { toast } = useToast();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };

        try {
            // Validate form data
            await contactFormSchema.parse(data);

            // Submit form
            await handleSubmit(e);

            // Show success toast
            toast({
                title: "Message sent successfully! 🎉",
                description: "Thank you for reaching out. I&apos;ll get back to you soon.",
                className: "bg-green-500/10 border-green-500/20 text-green-500",
                action: (
                    <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                    </div>
                ),
            });

            // Reset form
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Show validation error toast
                toast({
                    title: "Invalid form data",
                    description: error.errors[0].message,
                    variant: "destructive",
                });
            } else {
                // Show general error toast
                toast({
                    title: "Error",
                    description: "Failed to send message. Please try again.",
                    variant: "destructive",
                });
            }
        }
    };

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
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Textarea
                                name="message"
                                placeholder="Your Message"
                                required
                                className="min-h-[120px] bg-background/50"
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                disabled={state.submitting}
                                className={`group/btn gap-2 transition-colors ${state.submitting ? 'bg-primary/20' : 'hover:bg-primary/5'}`}
                            >
                                <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                {state.submitting ? "Sending..." : "Send Message"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </div>
        </Card>
    );
}