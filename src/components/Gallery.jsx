import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import T39 from '../assets/Honoring the Craft/T-39.png';
import T41 from '../assets/Honoring the Craft/T-41.png';
import T42 from '../assets/Honoring the Craft/T-42.png';
import T37 from '../assets/Honoring the Craft/T-37.png';
const Gallery = () => {
    const sectionRef = useRef();
    const triggerRef = useRef();

    const diaryEntries = [
        {
            title: "Sweet Solitude",
            location: "Patisserie Archive",
            setting: "Indulgent Softness",
            image: T39
        },
        {
            title: "Emerald Affection",
            location: "Modern Sanctuary",
            setting: "Vibrant Stillness",
            image: T41
        },
        {
            title: "The Tea Ceremony",
            location: "Heritage Loft",
            setting: "Pensive Brew",
            image: T42
        },
        {
            title: "Floral Manuscript",
            location: "Nature Atelier",
            setting: "Organic Rhythm",
            image: T37
        }
    ];

    useGSAP(() => {
        const totalSlides = diaryEntries.length + 1; // 4 images + 1 text slide

        gsap.to(sectionRef.current, {
            // Using xPercent on the container itself
            // To show the 5th slide (index 4), we move -80% of the 5-slide container
            xPercent: -(100 * (totalSlides - 1) / totalSlides),
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                // End exactly when the horizontal translation finishes (4 screen widths)
                end: () => `+=${window.innerWidth * (totalSlides - 1)}`,
                invalidateOnRefresh: true,
            }
        });
    }, { scope: triggerRef });

    return (
        <section id="gallery" ref={triggerRef} className="overflow-hidden bg-charcoal">
            {/* Explicit width: totalSlides * 100vw */}
            <div
                ref={sectionRef}
                className="flex h-screen"
                style={{ width: `${(diaryEntries.length + 1) * 100}vw` }}
            >
                {diaryEntries.map((entry, i) => (
                    <div key={i} className="relative h-screen w-screen flex-shrink-0 group overflow-hidden">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                            style={{ backgroundImage: `url(${entry.image})` }}
                        >
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        {/* Metadata Hover Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-t from-charcoal/80 to-transparent">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto">
                                <div>
                                    <span className="text-rose text-[10px] uppercase tracking-[0.4em] mb-2 block font-medium">Visual Diary No. {i + 1}</span>
                                    <h3 className="text-cream text-4xl md:text-7xl font-heading italic">{entry.title}</h3>
                                </div>
                                <div className="flex gap-8 md:gap-12 text-cream/60">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest block mb-1">Location</span>
                                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-cream">{entry.location}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest block mb-1">Setting</span>
                                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-cream">{entry.setting}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Centered Large Index */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-white/5 text-[30vh] md:text-[40vh] font-heading italic">{i + 1}</span>
                        </div>
                    </div>
                ))}

                {/* Final Concluding Slide */}
                <div className="h-screen w-screen flex-shrink-0 bg-charcoal flex flex-col items-center justify-center text-center px-12">
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        <span className="text-rose text-[10px] uppercase tracking-[0.6em] mb-12 block font-medium opacity-80">Visual Diary</span>
                        <h2 className="text-cream text-5xl md:text-8xl font-heading italic mb-16 leading-[1.1]">
                            Defined by <br />
                            <span className="not-italic font-light opacity-50 text-4xl md:text-7xl">Timeless Silence.</span>
                        </h2>
                        <div className="h-[1px] w-48 bg-cream/10 mb-16" />
                        <p className="text-cream/30 text-[10px] uppercase tracking-[0.4em] font-light">
                            Continue to concierge
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
