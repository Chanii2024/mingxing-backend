import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroMugs = () => {
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

    const text = "Stoneware Rituals";

    return (
        <section ref={container} className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-cream">
            {/* Left Content */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-16 z-10">
                <div className="max-w-xl">
                    <h1 ref={headlineRef} className="text-64px md:text-[100px] leading-[0.9] font-heading italic flex flex-wrap">
                        {text.split("").map((char, i) => (
                            <span key={i} className="char inline-block min-w-[0.2em]">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h1>
                    <p className="mt-8 text-charcoal/60 uppercase tracking-[0.3em] text-sm gsap-reveal-up">
                        Ancestral Firing — Modern Forms
                    </p>
                </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 h-1/2 md:h-full relative overflow-hidden">
                <div className="hero-image absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2070&auto=format&fit=crop')` }}>
                    <div className="absolute inset-0 bg-charcoal/5" />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                <div className="w-[1px] h-12 bg-charcoal animate-pulse" />
            </div>
        </section>
    );
};

export default HeroMugs;
