import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import T1 from '../assets/Honoring the Craft/T-1.png';
import T2 from '../assets/Honoring the Craft/T-2.png';
import T3 from '../assets/Honoring the Craft/T-3.png';
import T4 from '../assets/Honoring the Craft/T-4.png';
import T5 from '../assets/Honoring the Craft/T-5.png';
import T6 from '../assets/Honoring the Craft/T-6.png';
import T7 from '../assets/Honoring the Craft/T-7.png';
import T8 from '../assets/Honoring the Craft/T-8.png';
import T36 from '../assets/Honoring the Craft/T-36.png';
import T37 from '../assets/Honoring the Craft/T-37.png';
import T38 from '../assets/Honoring the Craft/T-38.png';
import T39 from '../assets/Honoring the Craft/T-39.png';
import T40 from '../assets/Honoring the Craft/T-40.png';
import T41 from '../assets/Honoring the Craft/T-41.png';
import T42 from '../assets/Honoring the Craft/T-42.png';
import T43 from '../assets/Honoring the Craft/T-43.png';
import T44 from '../assets/Honoring the Craft/T-44.png';
import T45 from '../assets/Honoring the Craft/T-45.png';

const Craft = () => {
    const container = useRef();
    const gridRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const crafts = [
        { title: "The Texture", desc: "Hand-finished surfaces with unique tactile character.", image: T38 },
        { title: "The Silk", desc: "Ethically harvested mulberry silk for unparalleled luster.", image: T1 },
        { title: "The Cotton", desc: "Long-staple organic cotton, double-combed for structure.", image: T2 },
        { title: "The Finish", desc: "Double-checked quality for a flawless final piece.", image: T41 },
        { title: "The Sewing", desc: "Single-needle tailoring with reinforced seams.", image: T3 },
        { title: "The Loom", desc: "Traditional weaving techniques meet modern precision.", image: T4 },
        { title: "The Dye", desc: "Natural pigments achieved through artisanal saturation.", image: T5 },
        { title: "The Cut", desc: "Architectural precision in every pattern placement.", image: T6 },
        { title: "The Stitch", desc: "Reinforced tension points for lifetime durability.", image: T7 },
        { title: "The Fiber", desc: "Selecting only the finest raw materials globally.", image: T8 },
        { title: "The Weave", desc: "Density engineered for specific silhouette retention.", image: T36 },
        { title: "The Pattern", desc: "Evolved geometry for a perfectly relaxed drape.", image: T37 },
        { title: "The Silhouette", desc: "Contemporary forms inspired by classical heritage.", image: T39 },
        { title: "The Detail", desc: "Hidden refinements that define true luxury.", image: T40 },
        { title: "The Soul", desc: "Infusing human character into every garment.", image: T42 },
        { title: "The Vision", desc: "Defining the future of artisanal lifestyle.", image: T43 },
        { title: "The Heritage", desc: "Preserving ancient techniques for the modern age.", image: T44 },
        { title: "The Essence", desc: "The pure expression of Mingxing aesthetics.", image: T45 }
    ];

    const totalPages = Math.ceil(crafts.length / itemsPerPage);
    const currentCrafts = crafts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePageChange = (direction) => {
        const tl = gsap.timeline({
            onComplete: () => {
                const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
                setCurrentPage(nextPage);
                window.scrollTo({ top: container.current.offsetTop - 80, behavior: 'smooth' });
            }
        });

        tl.to(gridRef.current.querySelectorAll('.gsap-craft-item'), {
            opacity: 0,
            x: direction === 'next' ? -30 : 30,
            stagger: 0.03,
            duration: 0.4,
            ease: 'power2.in'
        });
    };

    return (
        <section id="craft" ref={container} className="py-20 md:py-32 px-6 md:px-24 bg-cream overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24 gsap-reveal-up">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-rose font-medium block mb-4">The Process</span>
                    <h2 className="text-4xl md:text-7xl font-heading italic">Honoring the Craft</h2>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-24">
                    {currentCrafts.map((item, i) => {
                        const absoluteIndex = (currentPage * itemsPerPage) + i;
                        return (
                            <div
                                key={absoluteIndex}
                                className="group flex flex-col items-start gsap-reveal-up gsap-craft-item opacity-100"
                            >
                                <div className="relative w-full aspect-[3/4] overflow-hidden mb-8 bg-charcoal/5">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-charcoal/5 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />
                                    <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm px-3 py-1 flex items-center justify-center">
                                        <span className="text-[9px] uppercase tracking-widest font-medium text-charcoal/60">
                                            {(absoluteIndex + 1).toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-xl md:text-2xl font-heading italic mb-4">{item.title}</h3>
                                <p className="text-charcoal/60 leading-relaxed text-xs md:text-sm max-w-[280px]">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {totalPages > 1 && (
                    <div className="mt-16 md:mt-24 flex justify-center items-center gap-6 md:gap-12">
                        <button
                            onClick={() => handlePageChange('prev')}
                            disabled={currentPage === 0}
                            className={`group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${currentPage === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:text-rose'}`}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 border border-charcoal/10 rounded-full flex items-center justify-center group-hover:border-rose transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <span className="hidden md:inline">Previous</span>
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1 h-1 rounded-full transition-all duration-500 ${currentPage === i ? 'w-4 bg-rose' : 'bg-charcoal/20'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange('next')}
                            disabled={currentPage === totalPages - 1}
                            className={`group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${currentPage === totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:text-rose'}`}
                        >
                            <span className="hidden md:inline">Next</span>
                            <div className="w-10 h-10 md:w-12 md:h-12 border border-charcoal/10 rounded-full flex items-center justify-center group-hover:border-rose transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Craft;
