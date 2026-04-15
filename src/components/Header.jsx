import { Link } from 'react-router-dom';

const Header = ({ cartCount, onOpenCart }) => {
    return (
        <header className="glass-header h-20 px-6 md:px-16 flex items-center justify-between">
            {/* Branding Logo (Left) */}
            <div className="flex-1 flex items-center">
                <Link to="/" className="w-8 h-8 md:w-10 md:h-10 border border-charcoal flex items-center justify-center font-heading italic text-lg md:text-xl hover:bg-charcoal hover:text-cream transition-all duration-300">
                    M
                </Link>
            </div>

            {/* Centered Name (Center) */}
            <div className="flex-1 flex justify-center text-center">
                <Link to="/">
                    <h1 className="text-xl md:text-3xl tracking-[0.2em] md:tracking-[0.4em] uppercase font-heading not-italic hover:opacity-60 transition-opacity">
                        Mingxing
                    </h1>
                </Link>
            </div>

            {/* Navigation (Right) */}
            <nav className="flex-1 flex justify-end items-center gap-4 md:gap-8">
                <ul className="hidden md:flex items-center gap-8">
                    <li><a href="#collection" className="nav-link">Collection</a></li>
                    <li><a href="#craft" className="nav-link">Craft</a></li>
                    <li><a href="#gallery" className="nav-link">Gallery</a></li>
                </ul>

                {/* Cart Icon */}
                <button
                    onClick={onOpenCart}
                    className="relative cursor-pointer group p-2 hover:bg-charcoal/5 rounded-full transition-all"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                        <path d="M3 6h18M16 10a4 4 0 01-8 0" />
                    </svg>
                    <span className="absolute top-0 right-0 bg-rose text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                        {cartCount}
                    </span>
                </button>
            </nav>
        </header>
    );
};

export default Header;
