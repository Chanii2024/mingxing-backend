import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroImg from '../assets/Honoring the Craft/T-2.png';

const Hero = () => {
    const container = useRef();
    const headlineRef = useRef();

    useGSAP(() => {
        const chars = headlineRef.current.querySelectorAll('.char');

        gsap.fromTo(chars,
            {
                y: 100,
                opacity: 0,
                rotateX: -90
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.5,
                stagger: 0.05,
                ease: 'expo.out',
                delay: 0.5
            }
        );

        gsap.fromTo('.hero-image',
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, ease: 'power4.out' }
        );
    }, { scope: container });

    const text = "Artisanal Threads";

    return (
        <section ref={container} className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-cream">
            {/* 1. Image Layer - Background on mobile, Right side on desktop */}
            <div className="absolute inset-0 md:relative md:flex-1 md:order-2 h-full z-0">
                <div className="hero-image absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${HeroImg})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                </div>
            </div>

            {/* 2. Content Layer - Centered on mobile-bg, Left side on desktop */}
            <div className="relative flex-1 md:order-1 flex items-end md:items-center justify-center p-8 md:p-16 z-10 h-full pointer-events-none md:pointer-events-auto">
                <div className="max-w-xl w-full text-center md:text-left mb-24 md:mb-0">
                    <h1 ref={headlineRef} className="text-white md:text-charcoal text-5xl md:text-[120px] leading-[0.9] font-heading italic flex flex-wrap justify-center md:justify-start">
                        {text.split("").map((char, i) => (
                            <span key={i} className="char inline-block min-w-[0.2em]">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h1>
                    <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 gsap-reveal-up">
                        <div className="h-[1px] w-12 bg-charcoal/20 hidden md:block" />
                        <p className="text-white/70 md:text-charcoal/40 uppercase tracking-[0.4em] md:tracking-[0.3em] text-[9px] md:text-sm leading-relaxed">
                            Founded in Tradition <br className="md:hidden" />
                            <span className="hidden md:inline"> — </span>
                            <span className="text-white md:text-charcoal/40 block md:inline mt-1 md:mt-0">Crafted for Today</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 z-20">
                <span className="text-white md:text-charcoal text-[10px] uppercase tracking-[0.2em] font-medium">Explore</span>
                <div className="w-[1px] h-12 bg-white md:bg-charcoal animate-pulse" />
            </div>
        </section>
    );
};

export default Hero;
