import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => {
    const container = useRef();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        gsap.fromTo('.gsap-header',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
        );

        gsap.fromTo('.gsap-section',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.4
            }
        );
    }, { scope: container });

    return (
        <div ref={container} className="min-h-screen bg-cream selection:bg-rose/30 flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-32 px-6 md:px-12 max-w-5xl mx-auto w-full">

                <div className="gsap-header mb-24 text-center md:text-left border-b border-charcoal/10 pb-16">
                    <span className="text-rose text-[10px] uppercase tracking-[0.4em] font-medium block mb-4">Legal</span>
                    <h1 className="text-5xl md:text-7xl font-heading italic text-charcoal mb-6">Terms of Service</h1>
                    <p className="text-xs text-charcoal/40 uppercase tracking-widest">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-16">

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">1. Acceptance of Terms</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                By accessing and using our website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our site or purchasing our products.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">2. Products & Pricing</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                We strive to display our products, aesthetics, and prices as accurately as possible. However, occasional errors may occur. We reserve the right to correct any errors and to change or update information or cancel orders if any information is inaccurate.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">3. Intellectual Property</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                All content on this site, including text, typography, graphics, logos, images, audio clips, digital downloads, and data compilations, is the distinct property of Mingxing Boutique or its content suppliers and is protected by international copyright laws.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">4. User Conduct</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                You agree to use the site only for lawful purposes and in a way that respects the sanctuary of our digital space. Any interaction that infringes the rights of, restricts, or inhibits anyone else's use and enjoyment of the site is strictly prohibited.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">5. Liability Limitations</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                Mingxing Boutique shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the site or any products secured through our boutique.
                            </p>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
