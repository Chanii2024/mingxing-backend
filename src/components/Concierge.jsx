import React, { useState } from 'react';

const Concierge = ({ cart }) => {
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        const payload = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            cart: cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity || 1,
                productId: item.id,
                color: item.color
            }))
        };

        // Show "Sent" after 2 seconds regardless — the email processes in background
        setTimeout(() => {
            setStatus("We've received your inquiry ✓ Our team will be reaching out to you within 24 hours. For more details, contact us at +94 70 516 8748.");
            setFormData({ name: '', email: '', message: '' });
        }, 2000);

        // Fire and forget — backend handles the rest
        fetch('https://mingxing-backend-production.up.railway.app/api/inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).catch(error => {
            console.error('Error:', error);
            setStatus('Failed to send. Please ensure backend is running.');
        });
    };

    return (
        <section id="concierge" className="py-20 md:py-32 px-6 md:px-24 bg-cream border-t border-charcoal/5">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16 md:mb-24 gsap-reveal-up">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-rose font-medium block mb-4">Concierge</span>
                    <h2 className="text-4xl md:text-7xl font-heading italic mb-6">Direct Inquiry</h2>
                    <p className="text-charcoal/60 max-w-lg mx-auto italic font-serif text-sm md:text-base">
                        Have a bespoke request or need assistance with your selection? Our concierge is here to curate your experience.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-12 gsap-reveal-up">
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-40 font-bold">Full Name</label>
                        <input
                            required
                            type="text"
                            placeholder="Your Name"
                            className="bg-transparent border-b border-charcoal/10 py-4 focus:outline-none focus:border-rose transition-colors font-body placeholder:opacity-20"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-40 font-bold">Email Address</label>
                        <input
                            required
                            type="email"
                            placeholder="email@example.com"
                            className="bg-transparent border-b border-charcoal/10 py-4 focus:outline-none focus:border-rose transition-colors font-body placeholder:opacity-20"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2 flex flex-col">
                        <label className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-40 font-bold">Message / Special Requests</label>
                        <textarea
                            rows="4"
                            placeholder="Tell us about your needs..."
                            className="bg-transparent border-b border-charcoal/10 py-4 focus:outline-none focus:border-rose transition-colors font-body resize-none placeholder:opacity-20"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2 mt-12">
                        <button type="submit" className="w-full py-6 bg-charcoal text-cream text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-rose transition-all duration-500 shadow-xl">
                            Send Inquiry
                        </button>
                        {status && (
                            <div className="mt-8 border border-rose/30 bg-rose/5 px-8 py-6 flex flex-col items-center gap-3 text-center animate-fade-in">
                                <div className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EBB3B2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <p className="text-[11px] uppercase tracking-[0.3em] text-charcoal font-bold">Inquiry Received</p>
                                <p className="text-[11px] text-charcoal/50 tracking-wider leading-relaxed max-w-sm">
                                    Our team will be reaching out to you within <span className="text-charcoal font-semibold">24 hours</span>.
                                </p>
                                <a href="tel:+94705168748" className="mt-1 text-[10px] uppercase tracking-[0.25em] text-rose border-b border-rose/40 pb-0.5 hover:border-rose transition-all">
                                    +94 70 516 8748
                                </a>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Concierge;
