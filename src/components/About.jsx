import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import T16 from '../assets/T-Shirt-White/T-16.png';
import T17 from '../assets/T-Shirt-White/T-17.png';
import T18 from '../assets/T-Shirt-White/T-18.png';

const About = () => {
    const container = useRef();
    const image1 = useRef();
    const image2 = useRef();
    const image3 = useRef();

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Desktop Parallax
            gsap.to(image1.current, {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to(image2.current, {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to(image3.current, {
                y: -60,
                ease: 'none',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

        mm.add("(max-width: 767px)", () => {
            // Mobile Parallax - Reduced to prevent overlap
            gsap.to(image1.current, {
                y: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to(image2.current, {
                y: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative pt-42 pb-20 md:py-32 px-6 md:px-24 bg-cream overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20 items-center">

                {/* Parallax Image Grid */}
                <div className="flex-1 relative h-[800px] md:h-[600px] w-full max-w-[500px] mb-12 md:mb-0 scale-90 md:scale-100 mt-10 md:mt-0">
                    {/* Image 1 - China Roots */}
                    <div
                        ref={image1}
                        className="absolute top-16 md:top-0 left-0 w-[70%] h-[380px] md:w-2/3 md:h-[400px] bg-cover bg-center shadow-2xl z-20"
                        style={{ backgroundImage: `url(${T16})` }}
                    />

                    {/* Image 2 - Sydney Design */}
                    <div
                        ref={image2}
                        className="absolute bottom-[-250px] md:bottom-0 right-0 w-[70%] h-[380px] md:w-2/3 md:h-[400px] bg-cover bg-center shadow-2xl z-10"
                        style={{ backgroundImage: `url(${T17})` }}
                    />

                    {/* Image 3 - Craft Detail */}
                    <div
                        ref={image3}
                        className="absolute top-1/4 left-1/4 w-1/2 h-[280px] md:h-[300px] bg-cover bg-center shadow-2xl z-30 border-[6px] md:border-[12px] border-cream"
                        style={{ backgroundImage: `url(${T18})` }}
                    />
                </div>

                {/* Brand Bio Content */}
                <div className="flex-1 gsap-reveal-up text-center md:text-left mt-80 md:mt-0">
                    <span className="text-4xl font-heading italic text-rose mb-4 block">"</span>
                    <h2 className="text-3xl md:text-5xl font-heading italic mb-6 leading-tight">
                        Wear The Light. <br />
                        <span className="not-italic font-light">Be The Star.</span>
                    </h2>
                    <div className="space-y-6 text-charcoal/80 leading-relaxed font-body">
                        <p className="text-base md:text-lg">
                            Mingxing represents the Bright Star—a beacon of clarity and effortless brilliance. We embody this celestial essence through a collection of elevated essentials, where minimalist icons meet the premium weight of organic cotton. Each piece is a curated canvas, designed to illuminate your daily wardrobe with quiet sophistication.
                        </p>
                        <p className="text-sm md:text-base">
                            Our philosophy is rooted in luminous simplicity: the belief that the most striking style is born from the cleanest lines. We celebrate the tactile poetry of a perfect silhouette and the refined luxury of a garment crafted to endure. At Mingxing, we provide the canvas; you provide the light.
                        </p>
                    </div>

                    <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center md:justify-start gap-4 md:gap-6">
                        <div className="h-[1px] w-12 bg-charcoal/20 hidden md:block" />
                        <span className="uppercase tracking-widest text-[10px] md:text-xs font-medium opacity-60">The Essence</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
