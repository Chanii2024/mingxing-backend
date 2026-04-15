import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const getImageUrl = (color, index) => `/t-shirts/${color}/T-${index}.png`;

const productData = [
    {
        name: "Artisan White Tee",
        category: "Organic Cotton",
        price: "$110",
        fabric: "160 GSM, 100% Organic Cotton",
        description: "Pure organic cotton for daily comfort. This tee offers a breathable, lightweight feel that is perfect for any climate. Sustainability meets style in its most essential form."
    },
    {
        name: "Studio Charcoal Boxy",
        category: "Heavyweight",
        price: "$140",
        fabric: "300 GSM, Double-knit Jersey",
        description: "Structured fit in deep charcoal. Engineered for a modern silhouette that retains its shape. The heavyweight jersey provides a premium weight and feel."
    },
    {
        name: "Classic Silk-Cotton Tee",
        category: "Organic Cotton",
        price: "$120",
        fabric: "180 GSM, 70% Cotton 30% Silk",
        description: "A masterclass in understated luxury. This tee combines the breathability of premium organic cotton with the subtle luster and drape of artisanal silk. Designed for a tailored yet relaxed fit."
    },
    {
        name: "Heavyweight Studio Boxy",
        category: "Heavyweight",
        price: "$145",
        fabric: "320 GSM, Double-knit Jersey",
        description: "Engineered for structure. Our heavyweight jersey is double-knit to provide a dense, architectural drape that defines the silhouette. A contemporary staple for the modern wardrobe."
    },
    {
        name: "Imperial Red Limited",
        category: "Limited Edition",
        price: "$195",
        fabric: "Hand-finished seams, 24k Gold Threading",
        description: "A rare expression of heritage craftsmanship. Each piece is hand-finished by master artisans, featuring subtle 24k gold threading along the inner neckline and hem."
    },
    {
        name: "Architectural White",
        category: "Heavyweight",
        price: "$135",
        fabric: "240 GSM, Structure-retaining weave",
        description: "Precision in every thread. This piece uses a specialized weave designed to retain its architectural form even after multiple washes. Pure white pigment for a clean look."
    },
    {
        name: "Lotus Petal Soft",
        category: "Organic Cotton",
        price: "$110",
        fabric: "160 GSM, Enzyme washed for softness",
        description: "Feather-light and incredibly soft. Treated with a natural enzyme wash to achieve a texture reminiscent of lotus petals. Ideal for layering or as a standalone piece."
    },
    {
        name: "Dynasty Black Onyx",
        category: "Limited Edition",
        price: "$210",
        fabric: "Raw Silk Blend, Antique finish",
        description: "Deep, rich, and enigmatic. The Dynasty Black Onyx features a raw silk blend that results in a unique, slightly irregular texture full of character."
    },
    {
        name: "Mist Grey Essential",
        category: "Organic Cotton",
        price: "$115",
        fabric: "170 GSM, Fine-gauge Cotton",
        description: "Soft grey tones for a minimalist wardrobe. This essential tee is crafted from fine-gauge cotton, providing a smooth surface and comfortable fit."
    },
    {
        name: "Midnight Indigo",
        category: "Limited Edition",
        price: "$190",
        fabric: "Hand-dyed Indigo, Organic Blend",
        description: "Deep indigo dye with artisanal finish. Every garment is individually hand-dyed, creating a unique depth of color that ages beautifully over time."
    },
    {
        name: "Core Sand Heavy",
        category: "Heavyweight",
        price: "$140",
        fabric: "310 GSM, Bonded Texture",
        description: "Double-knit jersey for lasting structure. This core basic in a warm sand hue offers a substantial hand-feel and a clean, modern aesthetic."
    },
    {
        name: "Zen Moss Organic",
        category: "Organic Cotton",
        price: "$105",
        fabric: "155 GSM, Breathable Weave",
        description: "Earthly moss color in breathable fabric. Inspired by nature, this piece offers a calming palette and a lightweight feel for effortless style."
    },
    {
        name: "Urban Iron Boxy",
        category: "Heavyweight",
        price: "$150",
        fabric: "330 GSM, Industrial Jersey",
        description: "Durable and thick, perfect for layering. The Urban Iron Boxy is built to withstand the elements while maintaining a sharp, structured silhouette."
    },
    {
        name: "Celestial Gold",
        category: "Limited Edition",
        price: "$230",
        fabric: "Silk-Cotton with Gold Accents",
        description: "Special edition with gold-flecked weave. This luxurious piece catches the light subtly, offering a touch of opulence to a classic design."
    },
    {
        name: "Pebble Grey Soft",
        category: "Organic Cotton",
        price: "$110",
        fabric: "165 GSM, Sand-washed Cotton",
        description: "Lightweight and enzyme washed for a soft, lived-in feel. The pebble grey hue is versatile and timeless, perfect for any occasion."
    },
    {
        name: "Obsidian Matte",
        category: "Heavyweight",
        price: "$145",
        fabric: "320 GSM, Matte-finish Jersey",
        description: "Dense black jersey with a matte finish. This piece defines the modern streetwear aesthetic with its deep black tone and sharp lines."
    },
    {
        name: "Azure Silk-Cotton",
        category: "Organic Cotton",
        price: "$125",
        fabric: "180 GSM, 65% Cotton 35% Silk",
        description: "Vibrant sky blue in a soft silk blend. The natural sheen of silk enhances the azure color, creating a piece that stands out with elegance."
    },
    {
        name: "Rust Heritage",
        category: "Limited Edition",
        price: "$205",
        fabric: "Antique-washed Raw Silk",
        description: "Antique rust wash on heavyweight silk. This piece tells a story of tradition and time with its unique weathered finish and premium weight."
    },
    {
        name: "Signature Slub Navy",
        category: "Organic Cotton",
        price: "$115",
        fabric: "190 GSM, Slub-textured Organic Cotton",
        description: "The beauty of imperfection. Our slub cotton features a unique, tactile texture that catches the light and adds depth to any outfit."
    },
    {
        name: "Structure Grey Boxy",
        category: "Heavyweight",
        price: "$140",
        fabric: "300 GSM, Bonded Jersey",
        description: "A minimalist silhouette with maximum presence. This boxy fit t-shirt is crafted from bonded jersey to maintain its sharp, clean lines."
    },
    {
        name: "Nomad Sand Organic",
        category: "Organic Cotton",
        price: "$105",
        fabric: "160 GSM, Fine-gauge Cotton",
        description: "Inspired by the desert landscape. A fine-gauge, breathable cotton tee in a warm sand hue. The perfect companion for transitional weather."
    },
    {
        name: "Onyx Silk Blend",
        category: "Limited Edition",
        price: "$180",
        fabric: "60% Silk 40% Cotton",
        description: "Liquid luxury in fabric form. This silk-cotton blend offers a high-sheen finish and a cooling sensation against the skin."
    },
    {
        name: "Heritage Olive Heavy",
        category: "Heavyweight",
        price: "$150",
        fabric: "340 GSM, French Terry Reverse",
        description: "Weight that feels like armor. Our heaviest t-shirt yet, featuring a reverse-weave French terry for ultimate durability."
    },
    {
        name: "Celestial Blue Limited",
        category: "Limited Edition",
        price: "$225",
        fabric: "Organic Sea Island Cotton",
        description: "The pinnacle of cotton rarities. Sea Island cotton is known for its extra-long fibers and silk-like softness. Small batch production."
    },
    {
        name: "Ivory Pillar",
        category: "Heavyweight",
        price: "$135",
        fabric: "280 GSM, Double-knit Cotton",
        description: "Architectural fit in pristine ivory. A piece designed to provide structure and stability, creating a pillar of style in your wardrobe."
    },
    {
        name: "Dawn Peach Organic",
        category: "Organic Cotton",
        price: "$115",
        fabric: "160 GSM, Combed Organic Cotton",
        description: "Soft morning hues in fine-gauge cotton. This gentle peach tone brings a sense of serenity and freshness to your daily attire."
    },
    {
        name: "Twilight Slate",
        category: "Limited Edition",
        price: "$195",
        fabric: "60% Cotton 40% Tech-Silk",
        description: "Dark slate grey with a subtle metallic sheen. A fusion of natural fibers and contemporary performance silk for the modern explorer."
    },
    {
        name: "Forest Peak Heavy",
        category: "Heavyweight",
        price: "$155",
        fabric: "350 GSM, Heavyweight Twill Jersey",
        description: "Rugged forest green for outdoor structure. Built for the peak, this heavyweight tee offers unparalleled durability and warmth."
    },
    {
        name: "Bone White Studio",
        category: "Organic Cotton",
        price: "$120",
        fabric: "190 GSM, Premium Slub Organic",
        description: "Off-white essential with a clean drape. The bone white hue offers a sophisticated alternative to pure white, with a subtle texture."
    },
    {
        name: "Crimson Legacy",
        category: "Limited Edition",
        price: "$240",
        fabric: "100% Raw Silk, Natural Dyes",
        description: "Deep crimson red, hand-dyed perfection. A legacy piece that embodies the passion of traditional craftsmanship and rich, natural pigments."
    },
    {
        name: "Amber Sun Organic",
        category: "Organic Cotton",
        price: "$110",
        fabric: "165 GSM, Sunflower-treated Cotton",
        description: "Warm amber tones for a cozy feel. This piece is finished with a natural softener to provide a sun-kissed sensation against the skin."
    },
    {
        name: "Stone Grey Rock",
        category: "Heavyweight",
        price: "$145",
        fabric: "320 GSM, Stone-washed Jersey",
        description: "Hard-wearing jersey with a stone-wash texture. Like the mountains themselves, this piece is built to endure and grow more beautiful with time."
    },
    {
        name: "Mist Blue Limited",
        category: "Limited Edition",
        price: "$215",
        fabric: "80% Sea Island Cotton 20% Silk",
        description: "Icy blue silk-cotton with refined detail. A limited expression of cool elegance, combining the world's finest cotton with pure silk."
    },
    {
        name: "Sage Garden Tee",
        category: "Organic Cotton",
        price: "$115",
        fabric: "170 GSM, Organic Hemp-Cotton Blend",
        description: "Soothing sage green in premium organic cotton. Blended with hemp for added durability and a unique, earthy texture."
    },
    {
        name: "Iron-Clad Heavy",
        category: "Heavyweight",
        price: "$150",
        fabric: "360 GSM, Ultra-heavy Jersey",
        description: "Our toughest weave for maximum longevity. This is the foundation of a permanent wardrobe, designed to last decades, not seasons."
    },
    {
        name: "Sovereign Black",
        category: "Limited Edition",
        price: "$250",
        fabric: "100% Mulberry Silk, Midnight Finish",
        description: "Exclusive masterpiece in the purest black silk. The Sovereign Black represents the absolute peak of our artisanal capabilities."
    },
    {
        name: "Ethereal Cloud",
        category: "Organic Cotton",
        price: "$118",
        fabric: "175 GSM, Supima Cotton",
        description: "Light as a cloud, durable as heritage. Made with the world's finest Supima cotton for an exceptionally smooth feel and lasting color."
    },
    {
        name: "Deep Earth Slate",
        category: "Heavyweight",
        price: "$148",
        fabric: "315 GSM, Compact Jersey",
        description: "Earthy tones with a modern edge. Our compact jersey provides a clean surface and a structured fit that works for any silhouette."
    },
    {
        name: "Heritage Gold Limited",
        category: "Limited Edition",
        price: "$245",
        fabric: "Egyptian Giza Cotton, Gold Embroidery",
        description: "The gold standard of luxury. Featuring intricate hand-embroidery with genuine gold-wrapped threads for a truly regal experience."
    },
    {
        name: "Lunar Mist White",
        category: "Organic Cotton",
        price: "$112",
        fabric: "162 GSM, Mercerized Cotton",
        description: "A subtle lunar glow in every fiber. Mercerized for strength and a sophisticated sheen, this white tee is a staple of evolved style."
    },
    {
        name: "Tectonic Black",
        category: "Heavyweight",
        price: "$152",
        fabric: "345 GSM, Interlock Weave",
        description: "Strength in simplicity. The interlock weave creates a dense fabric that feels substantial and looks incredibly sharp."
    },
    {
        name: "Royal Purple Silk",
        category: "Limited Edition",
        price: "$235",
        fabric: "Artisanal Silk-Cotton Jacquard",
        description: "Woven for royalty. Our custom jacquard pattern provides depth and texture to a rich purple hue that stands the test of time."
    },
    {
        name: "Oceanic Depth Navy",
        category: "Organic Cotton",
        price: "$116",
        fabric: "185 GSM, Long-staple Cotton",
        description: "Deep as the ocean, soft as the breeze. This navy essential uses long-staple cotton for a premium hand-feel and superior durability."
    },
    {
        name: "Titanium Grey Core",
        category: "Heavyweight",
        price: "$142",
        fabric: "305 GSM, Ribbed Texture",
        description: "A core piece with industrial strength. The subtle ribbed texture adds visual interest to a classic grey boxy fit."
    },
    {
        name: "Imperial Emerald",
        category: "Limited Edition",
        price: "$228",
        fabric: "Bamboo-Silk Blend",
        description: "Eco-luxury defined. The vibrant emerald green is achieved with natural dyes, paired with a bamboo-silk blend for a liquid-like drape."
    },
    {
        name: "Zenith White Studio",
        category: "Organic Cotton",
        price: "$122",
        fabric: "195 GSM, Combed Organic Cotton",
        description: "The peak of essential design. Our Zenith White features a slightly heavier organic cotton for a crisp, professional look."
    }
];

const products = productData.map((data, index) => ({
    id: index + 1,
    ...data,
    blackImage: getImageUrl('black', index + 1),
    whiteImage: getImageUrl('white', index + 1),
    image: getImageUrl('white', index + 1)
}));

const categories = ["All", "Organic Cotton", "Heavyweight", "Limited Edition"];

const ProductImage = ({ blackImage, whiteImage }) => {
    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Show White by default, hide on group-hover */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out opacity-100 group-hover:opacity-0 group-hover:scale-105"
                style={{ backgroundImage: `url(${whiteImage})` }}
            />
            {/* Hide Black by default, show on group-hover */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                style={{ backgroundImage: `url(${blackImage})` }}
            />
        </div>
    );
};

const Collection = ({ onAddToCart }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState('white');
    const [view, setView] = useState('grid');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const containerRef = useRef(null);
    const gridRef = useRef(null);
    const detailsRef = useRef(null);

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handleCategoryChange = (cat) => {
        const tl = gsap.timeline({
            onComplete: () => {
                setActiveCategory(cat);
                setCurrentPage(0);
                window.scrollTo({ top: containerRef.current.offsetTop - 80, behavior: 'smooth' });
            }
        });
        tl.to(gridRef.current.querySelectorAll('.gsap-card'), {
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power2.in'
        });
    };

    const handlePageChange = (direction) => {
        const tl = gsap.timeline({
            onComplete: () => {
                const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
                setCurrentPage(nextPage);
                window.scrollTo({ top: containerRef.current.offsetTop - 80, behavior: 'smooth' });
            }
        });

        tl.to(gridRef.current.querySelectorAll('.gsap-card'), {
            opacity: 0,
            x: direction === 'next' ? -30 : 30,
            stagger: 0.03,
            duration: 0.4,
            ease: 'power2.in'
        });
    };

    const handleProductClick = (product) => {
        const tl = gsap.timeline({
            onComplete: () => {
                setSelectedProduct(product);
                setSelectedColor('white');
                setView('details');
                window.scrollTo({ top: containerRef.current.offsetTop - 80, behavior: 'instant' });
            }
        });

        const cards = gridRef.current?.querySelectorAll('.gsap-card');
        const header = gridRef.current?.querySelector('.gsap-header');

        if (cards?.length) {
            tl.to(cards, {
                opacity: 0,
                y: -30,
                stagger: 0.03,
                duration: 0.4,
                ease: 'power2.in'
            });
        }
        if (header) {
            tl.to(header, { opacity: 0, duration: 0.3 }, "-=0.2");
        }
    };

    const handleBackClick = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                setSelectedProduct(null);
                setView('grid');
                window.scrollTo({ top: containerRef.current.offsetTop - 80, behavior: 'smooth' });
            }
        });

        if (detailsRef.current) {
            tl.to(detailsRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.4,
                ease: 'power2.in'
            });
        } else {
            setSelectedProduct(null);
            setView('grid');
        }
    };

    useGSAP(() => {
        if (view === 'grid' && gridRef.current) {
            gsap.killTweensOf([".gsap-header", ".gsap-card"]);
            gsap.fromTo(gridRef.current.querySelector('.gsap-header'),
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );
            gsap.fromTo(gridRef.current.querySelectorAll('.gsap-card'),
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power4.out' }
            );
        }

        if (view === 'details' && detailsRef.current) {
            const tl = gsap.timeline();
            tl.fromTo(detailsRef.current.querySelector('.gsap-back'),
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5 }
            );
            tl.fromTo(detailsRef.current.querySelector('.gsap-image'),
                { opacity: 0, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
                "-=0.3"
            );
            tl.fromTo(detailsRef.current.querySelectorAll('.gsap-detail-item'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
                "-=0.7"
            );
        }
    }, { scope: containerRef, dependencies: [view, currentPage, activeCategory] });

    return (
        <section id="collection" ref={containerRef} className="py-20 md:py-32 px-6 md:px-24 bg-cream min-h-screen">
            <div className="max-w-7xl mx-auto">
                {view === 'grid' ? (
                    <div ref={gridRef} key="grid-view">
                        <div className="gsap-header flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-heading italic mb-4">The Artisanal Collection</h2>
                                <p className="text-charcoal/60 max-w-md text-sm md:text-base">Curated essentials that blend timeless heritage with modern structural design.</p>
                            </div>

                            <div className="flex flex-nowrap overflow-x-auto md:flex-wrap gap-6 md:gap-8 pb-4 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`text-[10px] md:text-xs uppercase tracking-widest pb-2 transition-all duration-300 border-b-2 whitespace-nowrap ${activeCategory === cat ? 'border-charcoal text-charcoal' : 'border-transparent text-charcoal/40 hover:text-charcoal'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 md:gap-y-20 min-h-0 md:min-h-[1000px]">
                            {currentProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="gsap-card group relative cursor-pointer"
                                    onClick={() => handleProductClick(product)}
                                >
                                    <div className="relative aspect-[1654/2339] overflow-hidden bg-charcoal/5">
                                        <ProductImage
                                            blackImage={product.blackImage}
                                            whiteImage={product.whiteImage}
                                        />



                                        <div className="absolute inset-x-0 bottom-0 bg-cream/95 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out hidden md:block">
                                            <span className="text-[10px] uppercase tracking-widest text-charcoal/40 block mb-2">Fabric Notes</span>
                                            <p className="text-sm font-medium leading-relaxed">{product.fabric}</p>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onAddToCart(product);
                                            }}
                                            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-cream text-charcoal rounded-full flex items-center justify-center shadow-xl md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-charcoal hover:text-cream z-20"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mt-6 md:mt-8 flex justify-between items-start">
                                        <div>
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-rose font-medium block mb-2">{product.category}</span>
                                            <h3 className="text-lg md:text-xl font-heading italic">{product.name}</h3>
                                        </div>
                                        <span className="font-medium text-sm pt-3 md:pt-4">{product.price}</span>
                                    </div>
                                    <p className="text-charcoal/40 text-[10px] uppercase tracking-widest mt-2 md:hidden">{product.fabric}</p>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-16 md:mt-20 flex justify-center items-center gap-6 md:gap-12">
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
                ) : (
                    <div ref={detailsRef} key="details-view">
                        <button
                            onClick={handleBackClick}
                            className="gsap-back flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-charcoal/60 hover:text-charcoal transition-colors mb-12 md:mb-16"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back to collection
                        </button>

                        <div className="flex flex-col lg:flex-row gap-12 md:gap-24">
                            <div className="gsap-image flex-1">
                                <div className="aspect-[1654/2339] bg-charcoal/5 overflow-hidden relative">
                                    <img
                                        src={selectedColor === 'white' ? selectedProduct?.whiteImage : selectedProduct?.blackImage}
                                        alt={selectedProduct?.name}
                                        className="w-full h-full object-cover transition-opacity duration-500"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-center">
                                <div className="max-w-md w-full">
                                    <span className="gsap-detail-item text-[10px] uppercase tracking-[0.3em] text-rose font-medium block mb-4 md:mb-6">{selectedProduct?.category}</span>
                                    <h2 className="gsap-detail-item text-4xl md:text-6xl font-heading italic mb-6 md:mb-8 leading-[1.1]">{selectedProduct?.name}</h2>
                                    <p className="gsap-detail-item text-xl md:text-2xl font-medium mb-8 md:mb-12">{selectedProduct?.price}</p>

                                    <div className="space-y-8 md:space-y-12">
                                        <div className="gsap-detail-item">
                                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-3 md:mb-4 font-bold">The Story</h4>
                                            <p className="text-charcoal/80 leading-relaxed text-base md:text-lg italic font-serif">
                                                {selectedProduct?.description}
                                            </p>
                                        </div>

                                        <div className="gsap-detail-item border-b border-charcoal/10 pb-8">
                                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-4 font-bold">Select Color</h4>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => setSelectedColor('white')}
                                                    className={`w-8 h-8 rounded-full border border-charcoal/20 transition-all ${selectedColor === 'white' ? 'ring-2 ring-rose ring-offset-2 border-rose' : 'hover:scale-110 hover:border-rose'}`}
                                                    style={{ backgroundColor: '#F8F8F8' }}
                                                    title="White Edition"
                                                />
                                                <button
                                                    onClick={() => setSelectedColor('black')}
                                                    className={`w-8 h-8 rounded-full border border-charcoal/20 transition-all ${selectedColor === 'black' ? 'ring-2 ring-rose ring-offset-2 border-rose' : 'hover:scale-110 hover:border-rose'}`}
                                                    style={{ backgroundColor: '#2D2D2D' }}
                                                    title="Black Edition"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => selectedProduct && onAddToCart({ ...selectedProduct, color: selectedColor, image: selectedColor === 'white' ? selectedProduct.whiteImage : selectedProduct.blackImage })}
                                            className="gsap-detail-item w-full py-5 md:py-6 px-8 bg-charcoal text-cream text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-rose transition-all duration-500 flex items-center justify-center gap-4 group"
                                        >
                                            Add to Collection
                                            <svg className="group-hover:translate-x-2 transition-transform duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Collection;
