import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Concierge from '../components/Concierge';
import CollectionMugs from '../components/CollectionMugs';
import CraftMugs from '../components/CraftMugs';
import GalleryMugs from '../components/GalleryMugs';


import HeroMugs from '../components/HeroMugs';
import AboutMugs from '../components/AboutMugs';

gsap.registerPlugin(ScrollTrigger);

function MugShop() {
    const container = useRef();
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = (product) => {
        setCart(prev => {
            const existingItemIndex = prev.findIndex(item => item.id === product.id);
            if (existingItemIndex > -1) {
                showToast(`${product.name} is already in your cart. Adjust quantity there.`);
                return prev;
            } else {
                const newItem = { ...product, quantity: 1 };
                if (prev.length === 0) {
                    setIsCartOpen(true);
                } else {
                    showToast(`${product.name} added to collection`);
                }
                return [...prev, newItem];
            }
        });
    };

    const showToast = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleRemoveFromCart = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const updateQuantity = (index, delta) => {
        setCart(prev => {
            const newCart = [...prev];
            const item = newCart[index];
            const newQuantity = (item.quantity || 1) + delta;

            if (newQuantity < 1) {
                return prev.filter((_, i) => i !== index);
            }

            newCart[index] = { ...item, quantity: newQuantity };
            return newCart;
        });
    };

    useGSAP(() => {
        const elements = gsap.utils.toArray('.gsap-reveal-up');
        elements.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }, { scope: container });

    const handleProceedToInquiry = () => {
        setIsCartOpen(false);
        document.getElementById('concierge')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div ref={container} className="min-h-screen bg-cream selection:bg-rose/30">
            <Header cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={updateQuantity}
                onProceed={handleProceedToInquiry}
            />

            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-24 right-6 z-[200] bg-charcoal text-cream px-6 py-4 shadow-2xl flex items-center gap-4 animate-toast-in">
                    <div className="w-2 h-2 rounded-full bg-rose animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium">{notification}</span>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="ml-4 text-rose text-[9px] uppercase tracking-widest border-b border-rose pb-0.5 hover:text-white hover:border-white transition-all"
                    >
                        View Cart
                    </button>
                </div>
            )}

            <main>
                <HeroMugs />
                <AboutMugs />



                <CollectionMugs onAddToCart={handleAddToCart} />
                <CraftMugs />
                <GalleryMugs />


                <Concierge cart={cart} onRemoveFromCart={handleRemoveFromCart} />
            </main>

            <Footer />
        </div>
    );
}

export default MugShop;
