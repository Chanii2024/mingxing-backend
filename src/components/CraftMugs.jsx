import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CraftMugs = () => {
    const container = useRef();

    useGSAP(() => {
        const sections = gsap.utils.toArray('.craft-section');

        sections.forEach((section) => {
            const img = section.querySelector('.craft-img');
            const content = section.querySelector('.craft-content');

            // Image Mask Scale Effect
            gsap.fromTo(img,
                { scale: 1.3 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

            // Text Parallax
            gsap.fromTo(content,
                { y: 100, opacity: 0 },
                {
                    y: -100,
                    opacity: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 1
                    }
                }
            );
        });
    }, { scope: container });

    const craftSteps = [
        {
            title: "The Earth",
            subtitle: "Mineral Sourcing",
            desc: "We harvest raw stoneware clay from high-mineral deposits, ensuring a structural strength that rings like a bell when tapped.",
            image: "https://images.unsplash.com/photo-1590605103416-230704277b05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            layout: "left"
        },
        {
            title: "The Wheel",
            subtitle: "Hand-Thrown Soul",
            desc: "Each vessel is centered by hand on a manual wheel. The subtle variation in weight and wall thickness is the mark of a living object.",
            image: "https://plus.unsplash.com/premium_photo-1677458718671-f8bd7ba82556?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            layout: "right"
        },
        {
            title: "The Fire",
            subtitle: "1280°C Reduction",
            desc: "In the heart of the kiln, the reduction of oxygen creates unique glaze variations—metallic flashes and deep 'bloom' textures that can never be repeated.",
            image: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=1500&auto=format&fit=crop",
            layout: "left"
        }
    ];


    return (
        <section ref={container} className="bg-charcoal py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 md:px-24 mb-32">
                <span className="text-rose text-[10px] uppercase tracking-[0.5em] mb-4 block font-medium opacity-60">The Process</span>
                <h2 className="text-5xl md:text-7xl font-heading italic text-cream leading-tight">Alchemy of Clay.</h2>
            </div>

            <div className="space-y-64">
                {craftSteps.map((step, i) => (
                    <div
                        key={i}
                        className={`craft-section relative flex flex-col ${step.layout === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-32 px-8 md:px-24`}
                    >
                        {/* Image Frame (The Lens) */}
                        <div className="w-full md:w-3/5 aspect-[16/10] overflow-hidden relative group">
                            <img
                                src={step.image}
                                alt={step.title}
                                className="craft-img absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-all duration-700" />
                        </div>

                        {/* Floating Content */}
                        <div className="craft-content w-full md:w-2/5 z-10 md:px-12">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-rose font-medium block mb-6">{step.subtitle}</span>
                            <h3 className="text-4xl md:text-5xl font-heading italic text-cream mb-8">{step.title}</h3>
                            <div className="h-[1px] w-16 bg-rose/30 mb-8" />
                            <p className="text-cream/50 leading-relaxed font-body max-w-sm">
                                {step.desc}
                            </p>
                        </div>


                        {/* Large Background Index Number */}
                        <div className={`absolute top-1/2 -translate-y-1/2 ${step.layout === 'right' ? 'left-40' : 'right-40'} opacity-[0.03] pointer-events-none select-none`}>
                            <span className="text-[25vw] font-heading italic text-cream leading-none">
                                {i + 1}
                            </span>
                        </div>
                    </div>

                ))}
            </div>

            {/* Bottom Concluding Note */}
            <div className="mt-64 text-center px-8">
                <div className="h-[40vh] w-[1px] bg-gradient-to-b from-rose/0 via-rose/30 to-rose/0 mx-auto" />
                <p className="text-cream/30 text-[10px] uppercase tracking-[0.6em] mt-24">Every vessel a story.</p>
            </div>
        </section>
    );
};

export default CraftMugs;
