import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Christopher Rodriguez - Full Stack Developer Portfolio';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#030711',
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #ffffff0a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #ffffff0a 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                }}
            >
                {/* Glass Card Effect */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '40px 80px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 60,
                            fontWeight: 800,
                            background: 'linear-gradient(to right, #38B2AC, #3178C6)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            margin: 0,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Christopher Rodriguez
                    </h1>
                    <h2
                        style={{
                            fontSize: 40,
                            color: 'rgba(255, 255, 255, 0.9)',
                            margin: '20px 0',
                            fontWeight: 600,
                        }}
                    >
                        Full Stack Developer
                    </h2>
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            marginTop: '12px',
                        }}
                    >
                        {['Next.js', 'TypeScript', 'React', 'Tailwind CSS'].map((tech) => (
                            <div
                                key={tech}
                                style={{
                                    padding: '8px 24px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: 24,
                                    fontWeight: 500,
                                }}
                            >
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}