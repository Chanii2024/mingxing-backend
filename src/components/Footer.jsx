import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-charcoal text-cream py-16 md:py-24 px-6 md:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-8">
                {/* Brand Bio */}
                <div className="space-y-6 md:space-y-8">
                    <Link to="/" className="inline-block border border-cream px-5 py-2 md:px-6 md:py-3 hover:bg-cream hover:text-charcoal transition-all duration-300">
                        <h2 className="text-lg md:text-xl font-heading not-italic uppercase tracking-[0.3em]">Mingxing</h2>
                    </Link>

                    <p className="text-cream/50 text-xs md:text-sm leading-relaxed max-w-xs mt-4">
                        Wear The Light. Be The Star. Mingxing offers elevated essentials, where minimalist icons meet premium craftsmanship. We provide the canvas; you provide the light.
                    </p>

                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/mingxing_2000?igsh=cWdyd3JtNHNjd3pq&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-rose hover:border-rose transition-all duration-300">
                            <span className="text-[10px]">IG</span>
                        </a>
                        <a href="https://www.facebook.com/share/17xC39Vimz/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-rose hover:border-rose transition-all duration-300">
                            <span className="text-[10px]">FB</span>
                        </a>
                    </div>
                </div>

                {/* Collections */}
                <div className="space-y-8">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] text-rose font-medium">Collections</h4>
                    <ul className="space-y-4 text-sm text-cream/60">
                        <li><Link to="/tshirts" className="hover:text-cream transition-colors">Atelier T-Shirts</Link></li>
                        <li><Link to="/mugs" className="hover:text-cream transition-colors">Ceramic Mugs</Link></li>
                        <li><Link to="/tshirts" className="hover:text-cream transition-colors">Visual Diary</Link></li>
                    </ul>
                </div>


                {/* Information */}
                <div className="space-y-8">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] text-rose font-medium">Information</h4>
                    <ul className="space-y-4 text-sm text-cream/60">
                        <li><a href="#" className="hover:text-cream transition-colors">Our Story</a></li>
                        <li><a href="#" className="hover:text-cream transition-colors">Sustainability</a></li>
                        <li><a href="#" className="hover:text-cream transition-colors">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-cream transition-colors">Care Guide</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-8">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] text-rose font-medium">Get in Touch</h4>
                    <ul className="space-y-4 text-sm text-cream/60">
                        <li>Atelier: Surry Hills, Sydney</li>
                        <li>Email: atelier@mingxing.com</li>
                        <li>Phone: +94 70 516 8748</li>
                    </ul>
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-[10px] uppercase tracking-widest text-cream/40 italic">Appointments Only</p>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cream/30">
                        &copy; {new Date().getFullYear()} Mingxing Boutique. All Rights Reserved.
                    </p>
                </div>

                <div className="flex-1 flex justify-center items-center gap-6 md:gap-8 whitespace-nowrap">
                    <Link to="/privacy-policy" className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream transition-colors">Privacy Policy</Link>
                    <Link to="/refund-cancellation" className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream transition-colors">Refund & Cancellation</Link>
                    <Link to="/terms" className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-cream/40 hover:text-cream transition-colors">Terms of Service</Link>
                </div>

                <div className="flex-1 flex justify-center md:justify-end">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cream/30 flex items-center gap-2">
                        Powered By <span className="text-rose text-sm">♥</span> Chaniru Weerasinghe
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
