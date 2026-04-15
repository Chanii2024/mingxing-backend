import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
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
                    <h1 className="text-5xl md:text-7xl font-heading italic text-charcoal mb-6">Privacy Policy</h1>
                    <p className="text-xs text-charcoal/40 uppercase tracking-widest">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-16">

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">1. Information We Collect</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed mb-4">
                                We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes personal identifiers and contact information essential for our service delivery.
                            </p>
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                We also automatically collect certain technical information when you browse our site, ensuring a seamless and localized experience.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">2. How We Use Info</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                We use the information we collect to fulfill your orders, communicate with you, process payments softly and securely, and improve our services and your overall experience at Mingxing Boutique.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">3. Information Sharing</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                We do not share your personal information with third parties except as necessary to provide our services, such as shipping providers, or as required by law.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">4. Security Measures</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. We value the trust you place in our Atelier. However, no data transmission over the internet can be guaranteed to be completely secure.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">5. Contact Us</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact our concierge at <a href="mailto:atelier@mingxing.com" className="text-rose hover:underline transition-all">atelier@mingxing.com</a>.
                            </p>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
