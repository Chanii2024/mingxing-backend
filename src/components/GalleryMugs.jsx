import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GalleryMugs = () => {
    const sectionRef = useRef();
    const triggerRef = useRef();

    const diaryEntries = [
        {
            title: "Morning Light",
            lighting: "Soft East Sun",
            pairing: "Silver Needle White Tea",
            image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=1200&auto=format&fit=crop"
        },
        {
            title: "The Architect",
            lighting: "Blue Hour Drift",
            pairing: "Dark Roasted Oolong",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
        },
        {
            title: "Quiet Rain",
            lighting: "Gloomy Ambient",
            pairing: "Jasmine Dragon Pearls",
            image: "https://images.unsplash.com/photo-1544787210-28219487c603?q=80&w=1200&auto=format&fit=crop"
        },
        {
            title: "Studio Still",
            lighting: "Artificial Focus",
            pairing: "Matcha Ceremonial Grade",
            image: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?q=80&w=1200&auto=format&fit=crop"
        }
    ];

    useGSAP(() => {
        const totalSlides = diaryEntries.length + 1;

        gsap.to(sectionRef.current, {
            xPercent: -(100 * (totalSlides - 1) / totalSlides),
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                end: () => `+=${window.innerWidth * (totalSlides - 1)}`,
                invalidateOnRefresh: true,
            }
        });
    }, { scope: triggerRef });

    return (
        <section id="gallery" ref={triggerRef} className="overflow-hidden bg-cream">
            <div
                ref={sectionRef}
                className="flex h-screen"
                style={{ width: `${(diaryEntries.length + 1) * 100}vw` }}
            >
                {diaryEntries.map((entry, i) => (
                    <div key={i} className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center p-12 md:p-32 group overflow-hidden">
                        {/* Frame Style 1 (Inset with Borders) */}
                        <div className="relative w-full h-full max-w-6xl overflow-hidden border border-charcoal/5">
                            <img
                                src={entry.image}
                                alt={entry.title}
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110"
                            />

                            {/* Visual Diary Metadata - Mug Specific */}
                            <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-charcoal/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                <div className="max-w-4xl">
                                    <span className="text-rose text-[10px] uppercase tracking-[0.4em] mb-4 block font-medium">Vessel Diary No. {i + 1}</span>
                                    <h3 className="text-cream text-5xl md:text-7xl font-heading italic mb-8">{entry.title}</h3>

                                    <div className="flex gap-16 text-cream/80 border-t border-cream/20 pt-8">
                                        <div>
                                            <span className="text-[10px] uppercase tracking-widest block mb-2 opacity-50">Lighting Condition</span>
                                            <p className="text-xs uppercase tracking-widest">{entry.lighting}</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase tracking-widest block mb-2 opacity-50">Suggested Pairing</span>
                                            <p className="text-xs uppercase tracking-widest">{entry.pairing}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide Number Accent */}
                        <div className="absolute -bottom-20 -left-20 pointer-events-none select-none">
                            <span className="text-[40vh] font-heading italic text-charcoal/[0.02]">0{i + 1}</span>
                        </div>
                    </div>
                ))}

                {/* Final Concluding Slide */}
                <div className="h-screen w-screen flex-shrink-0 bg-cream flex flex-col items-center justify-center text-center px-12 relative overflow-hidden">
                    {/* Background Texture Accent */}
                    <div className="absolute top-0 right-0 p-32 opacity-[0.05]">
                        <span className="text-[20vw] font-heading italic leading-none whitespace-nowrap">The End</span>
                    </div>

                    <div className="max-w-4xl mx-auto flex flex-col items-center z-10">
                        <span className="text-rose text-[10px] uppercase tracking-[0.6em] mb-12 block font-medium opacity-80">Still Life Diary</span>
                        <h2 className="text-cream mix-blend-difference text-6xl md:text-8xl font-heading italic mb-16 leading-[1.1]">
                            Elegance in <br />
                            <span className="not-italic font-light opacity-50 text-5xl md:text-7xl">Functional Form.</span>
                        </h2>
                        <div className="h-[1px] w-48 bg-charcoal/10 mb-16" />
                        <p className="text-charcoal/30 text-[10px] uppercase tracking-[0.4em] font-light">
                            Continue to concierge
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GalleryMugs;
