import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const mugProducts = [
    {
        id: 101,
        name: "Ceramic Dynasty Mug",
        category: "Hand-thrown",
        price: "$45",
        fabric: "Matte finish, 12oz, Heat-retaining clay",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fbed3b?q=80&w=1000&auto=format&fit=crop",
        featured: true
    },
    {
        id: 102,
        name: "Minimalist Stone Cup",
        category: "Studio Edition",
        price: "$38",
        fabric: "Surry Hills Sandstone texture",
        image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1000&auto=format&fit=crop",
        featured: false
    },
    {
        id: 103,
        name: "Imperial Gold-Rim Set",
        category: "Limited Edition",
        price: "$85",
        fabric: "Fine Porcelain, 24k gold",
        image: "https://images.unsplash.com/photo-1544991583-5335694bf13b?q=80&w=1000&auto=format&fit=crop",
        featured: false
    },
    {
        id: 104,
        name: "Shadow Glaze Bowl",
        category: "Hand-thrown",
        price: "$52",
        fabric: "Reactive glaze, Obsidian finish",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1000&auto=format&fit=crop",
        featured: true
    },
    {
        id: 105,
        name: "Wabi-Sabi Tea Bowl",
        category: "Limited Edition",
        price: "$65",
        fabric: "Crackle glaze, Traditional firing",
        image: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?q=80&w=1000&auto=format&fit=crop",
        featured: false
    }
];

const mugCategories = ["All", "Hand-thrown", "Studio Edition", "Limited Edition"];

const CollectionMugs = ({ onAddToCart }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const container = useRef();

    const filteredProducts = activeCategory === "All"
        ? mugProducts
        : mugProducts.filter(p => p.category === activeCategory);

    useGSAP(() => {
        gsap.from('.product-card', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container.current,
                start: 'top 80%',
            }
        });
    }, { scope: container, dependencies: [activeCategory] });

    return (
        <section id="collection" ref={container} className="py-32 px-8 md:px-24 bg-cream min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* New Minimal Header */}
                <div className="flex flex-col mb-24 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-rose font-medium mb-4">The Catalog</span>
                    <h2 className="text-6xl md:text-8xl font-heading italic mb-12">The Vessel Selection</h2>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-b border-charcoal/5 py-8">
                        {mugCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-300 relative group ${activeCategory === cat ? 'text-charcoal' : 'text-charcoal/30 hover:text-charcoal'
                                    }`}
                            >
                                {cat}
                                <span className={`absolute -bottom-1 left-0 h-[1px] bg-rose transition-all duration-500 ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Alternating Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
                    {filteredProducts.map((product, index) => {
                        const isWide = index % 3 === 0; // Every 3rd item is wider for visual rhythm
                        const colSpan = isWide ? 'md:col-span-8' : 'md:col-span-4';
                        const height = isWide ? 'aspect-[16/9]' : 'aspect-[4/5]';

                        return (
                            <div
                                key={product.id}
                                className={`product-card group ${colSpan} flex flex-col`}
                            >
                                {/* Image Container with Custom Reveal */}
                                <div className={`relative ${height} overflow-hidden bg-charcoal/5`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                                    />

                                    {/* Minimal Border Link */}
                                    <div className="absolute inset-0 border border-charcoal/0 group-hover:border-charcoal/10 transition-all duration-700 m-4" />

                                    {/* Floating Add Trigger */}
                                    <button
                                        onClick={() => onAddToCart(product)}
                                        className="absolute bottom-8 right-8 w-14 h-14 bg-cream text-charcoal rounded-full flex items-center justify-center shadow-2xl translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-charcoal hover:text-cream"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Product Metadata - Editorial Style */}
                                <div className="mt-8 flex justify-between items-end border-l border-rose/20 pl-6">
                                    <div>
                                        <span className="text-[90px] font-heading italic leading-none absolute opacity-[0.03] -translate-y-12 -translate-x-4 pointer-events-none select-none">
                                            {index + 1}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-rose font-medium block mb-2">{product.category}</span>
                                        <h3 className="text-2xl font-heading italic text-charcoal">{product.name}</h3>
                                        <p className="text-[10px] uppercase tracking-widest text-charcoal/40 mt-2 font-body">{product.fabric}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xl font-heading italic text-charcoal">{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CollectionMugs;
