import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutMugs = () => {
    const container = useRef();
    const section1 = useRef();
    const section2 = useRef();

    useGSAP(() => {
        // Subtle Reveal for Content
        gsap.from('.reveal-item', {
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.2,
            scrollTrigger: {
                trigger: container.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        // Floating Image Parallax
        gsap.to('.floating-img', {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative py-32 px-8 md:px-24 bg-cream overflow-hidden">
            {/* Background Text Accent */}
            <div className="absolute top-20 right-0 pointer-events-none opacity-[0.03] select-none">
                <span className="text-[30vw] font-heading italic leading-none whitespace-nowrap">Ceramics</span>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                {/* Visual Side (Left) - Taking 7 columns */}
                <div className="lg:col-span-7 relative">
                    <div className="relative aspect-[4/5] md:aspect-video overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2070&auto=format&fit=crop"
                            alt="Artisanal Pottery"
                            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
                        />
                    </div>

                    {/* Floating Detail Image */}
                    <div className="floating-img absolute -bottom-12 -right-12 w-1/3 aspect-square shadow-2xl z-20 border-[8px] border-cream hidden md:block">
                        <img
                            src="https://images.unsplash.com/photo-1514228742587-6b1558fbed3b?q=80&w=1000&auto=format&fit=crop"
                            alt="Glaze Detail"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content Side (Right) - Taking 5 columns */}
                <div className="lg:col-span-5 space-y-12 z-10">
                    <div className="reveal-item">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-rose font-medium block mb-6">The Philosophy</span>
                        <h2 className="text-5xl md:text-6xl font-heading italic leading-[1.1]">
                            Formed by <br />
                            <span className="not-italic font-light opacity-40">Stillness.</span>
                        </h2>
                    </div>

                    <div className="reveal-item space-y-8 text-charcoal/70 leading-relaxed font-body">
                        <p className="text-xl italic font-heading text-charcoal opacity-90 border-l-2 border-rose/30 pl-6">
                            "Earth becomes vessel, fire becomes character. Our ceramics are an invitation to slow down."
                        </p>
                        <p>
                            Mingxing Ceramics are hand-thrown in small batches. Each piece carries the subtle thumbprints of the maker and the unique 'soul' granted by the kiln's unpredictable flames.
                        </p>
                        <p>
                            We believe that a mug is more than a container; it is the physical architecture of a morning ritual. It must be weighted for comfort and textured for the soul.
                        </p>
                    </div>

                    <div className="reveal-item pt-8">
                        <a href="#collection" className="group inline-flex items-center gap-6">
                            <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Discover The Earth</span>
                            <div className="w-12 h-[1px] bg-charcoal group-hover:w-20 transition-all duration-500" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMugs;
