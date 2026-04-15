import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TShirt from '../assets/Honoring the Craft/T-38.png';

const categories = [
    { id: 'tshirts', name: 'T-Shirts', path: '/tshirts', image: TShirt },
    {
        id: 'mugs',
        name: 'Mug Collection',
        path: '#',
        comingSoon: true,
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                <path d="M17 8h1a4 4 0 110 8h-1" />
                <path d="M3 8v8a4 4 0 004 4h6a4 4 0 004-4V8H3z" />
                <path d="M3 4h14v4H3z" />
            </svg>
        )
    },
    {
        id: 'cards',
        name: 'Artisan Cards',
        path: '#',
        comingSoon: true,
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                <rect x="3" y="5" width="18" height="14" rx="1" />
                <path d="M3 9h18" />
                <path d="M8 15h.01" />
            </svg>
        )
    },
    {
        id: 'pencils',
        name: 'Pencils',
        path: '#',
        comingSoon: true,
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                <path d="M15 5l4 4" />
            </svg>
        )
    },
];

const Landing = () => {
    const container = useRef();
    const navRef = useRef();
    const [hoveredCategory, setHoveredCategory] = useState(null);

    React.useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            document.body.style.overflow = 'hidden';
            document.body.style.overscrollBehavior = 'none';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.overscrollBehavior = '';
        };
    }, []);

    useGSAP(() => {
        const isMobile = window.innerWidth < 768;
        const tl = gsap.timeline();

        tl.from('.brand-title', {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        })
            .from('.nav-item', {
                y: isMobile ? 0 : 30, // No move on mobile
                opacity: 0,
                duration: 1,
                stagger: isMobile ? 0 : 0.15,
                ease: "power3.out"
            }, "-=1");

        // Subtle background pulse
        gsap.to('.bg-accent', {
            scale: 1.1,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: container });

    return (
        <div ref={container} className="fixed inset-0 md:relative h-screen h-[100dvh] w-full bg-cream overflow-hidden flex flex-col justify-center md:justify-end font-heading italic overscroll-none touch-none">
            {/* Background Decorative Element */}
            <div className="bg-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-rose/5 blur-[120px] -z-10" />

            {/* Top Center Brand Title */}
            <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center w-full px-4">
                <h1 className="brand-title text-3xl md:text-5xl uppercase tracking-[0.4em] font-heading not-italic text-charcoal text-center">
                    Mingxing
                </h1>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-charcoal/40 mt-3 md:mt-4 font-body not-italic text-center">
                    Bright Star
                </span>
            </div>

            {/* Subtle Text - Center on Mobile */}
            <div className="absolute top-32 md:top-40 left-1/2 -translate-x-1/2 md:left-28 md:translate-x-0 pointer-events-none z-0 w-full flex justify-center md:justify-start">
                <h1 className="brand-title text-xl md:text-2xl uppercase tracking-[0.6em] font-heading not-italic text-charcoal/[0.5] select-none">
                    Discover
                </h1>
            </div>

            {/* Main Navigation Row - Grounded Position */}
            <nav
                ref={navRef}
                className="relative z-20 flex flex-row items-end justify-start md:justify-between px-6 md:px-24 pb-20 md:pb-8 w-full gap-4 md:gap-8 overflow-x-auto md:overflow-visible scrollbar-hide touch-pan-x translate-y-16 md:translate-y-0"
            >
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        to={cat.path}
                        onMouseEnter={() => setHoveredCategory(cat.id)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        className="nav-item group relative flex-shrink-0 md:flex-1 w-[280px] md:w-auto md:min-w-0 flex flex-col items-center"
                    >
                        {/* Always Visible Preview Image / Placeholder */}
                        <div className={`relative mb-6 md:mb-8 w-full aspect-[4/5] max-w-[320px] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform will-change-transform
                            ${hoveredCategory === cat.id ? 'md:scale-105' : 'scale-100'}`}>
                            {cat.image ? (
                                <div className={`w-full h-full bg-contain bg-center bg-no-repeat transition-all duration-700 ease-out
                                    ${hoveredCategory === cat.id ? 'md:brightness-110' : 'brightness-100'}`}
                                    style={{ backgroundImage: `url(${cat.image})` }} />
                            ) : cat.icon ? (
                                <div className={`w-full h-full bg-charcoal/5 border border-charcoal/10 flex flex-col items-center justify-center gap-4 transition-all duration-700 ease-out
                                    ${hoveredCategory === cat.id ? 'md:opacity-100 opacity-100 text-charcoal/80' : 'opacity-40 text-charcoal/40'}`}>
                                    <div className={`transition-transform duration-700 ${hoveredCategory === cat.id ? '-translate-y-2' : ''}`}>
                                        {cat.icon}
                                    </div>
                                    <div className={`absolute bottom-1/3 text-[9px] uppercase tracking-[0.3em] font-medium transition-all duration-500
                                        ${hoveredCategory === cat.id ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                        Coming Soon
                                    </div>
                                </div>
                            ) : (
                                <div className={`w-full h-full bg-charcoal/5 border border-charcoal/10 flex items-center justify-center transition-all duration-700 ease-out
                                    ${hoveredCategory === cat.id ? 'md:opacity-100' : 'opacity-20'}`}>
                                    <div className="w-8 h-[1px] bg-charcoal/20" />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center text-center px-1">
                            <span className={`text-[10px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] mb-2 md:mb-3 font-body not-italic transition-all duration-700 ease-out
                                ${hoveredCategory === cat.id ? 'opacity-40 translate-y-0' : 'opacity-40 md:opacity-0 translate-y-0 md:translate-y-2'}`}>
                                {cat.comingSoon ? 'Soon' : 'Catalogue'}
                            </span>
                            <div className="flex flex-col items-center gap-1 md:gap-2">
                                <h2 className={`text-lg md:text-2xl tracking-tight transition-all duration-700 ease-out whitespace-nowrap
                                    ${hoveredCategory === cat.id ? 'text-charcoal' : 'text-charcoal/70 md:text-charcoal/30'}`}>
                                    {cat.name}
                                </h2>
                                <div className={`h-[1px] bg-charcoal/20 transition-all duration-700 ease-out
                                    ${hoveredCategory === cat.id ? 'w-8 md:w-12' : 'w-0'}`} />
                            </div>
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Footer / Vertical Details */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-32 md:right-12 md:left-auto md:translate-x-0 md:-translate-y-1/2 md:rotate-90 md:origin-right w-full flex justify-center md:justify-end pointer-events-auto">
                <p className="text-[11px] md:text-[14px] uppercase tracking-[0.8em] md:tracking-[1em] text-charcoal/70 md:text-charcoal/30 not-italic whitespace-nowrap hover:text-charcoal/60 hover:tracking-[1.1em] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-default">
                    Timeless Silence
                </p>
            </div>
        </div>
    );
};

export default Landing;

