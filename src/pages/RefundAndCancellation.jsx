import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RefundAndCancellation = () => {
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
                    <h1 className="text-5xl md:text-7xl font-heading italic text-charcoal mb-6">Refund & Cancellation</h1>
                    <p className="text-xs text-charcoal/40 uppercase tracking-widest">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-16">

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">1. Order Cancellations</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                Orders can be cancelled within 24 hours of placement without any charges. If you wish to cancel an order, please contact us immediately at <a href="mailto:atelier@mingxing.com" className="text-rose hover:underline transition-all">atelier@mingxing.com</a>. After 24 hours, the order may have already been processed and shipped.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">2. Returns</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed mb-4">
                                We want you to be completely satisfied with your purchase. We accept returns for unworn and unwashed items within 14 days of delivery.
                            </p>
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                All items must be in their original condition, with tags attached and securely placed in their original artisanal packaging.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">3. Refunds</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                Once we receive and inspect your returned piece, we will notify you of the approval or rejection of your refund. If approved, the refund will be automatically applied to your original method of payment within 5-7 business days.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">4. Non-Refundable Items</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                Please note that custom-made items, exclusive releases, intimate goods, and gift cards are final sale and cannot be returned or refunded.
                            </p>
                        </div>
                    </section>

                    <div className="gsap-section w-full h-[1px] bg-charcoal/10"></div>

                    <section className="gsap-section flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-charcoal">5. Shipping Costs</h2>
                        </div>
                        <div className="w-full md:w-2/3">
                            <p className="text-charcoal/70 text-sm leading-relaxed">
                                You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your total.
                            </p>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundAndCancellation;
