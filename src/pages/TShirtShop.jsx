import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Collection from '../components/Collection';
import Craft from '../components/Craft';
import Gallery from '../components/Gallery';
import Concierge from '../components/Concierge';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

gsap.registerPlugin(ScrollTrigger);

function TShirtShop() {
    const container = useRef();
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = (product) => {
        const itemToAddToCart = {
            ...product,
            color: product.color || 'white',
            image: product.image || product.whiteImage
        };

        setCart(prev => {
            const existingItemIndex = prev.findIndex(item =>
                item.id === itemToAddToCart.id && item.color === itemToAddToCart.color
            );

            if (existingItemIndex > -1) {
                // Item exists with same color, show message instead of auto-incrementing
                showToast(`${product.name} (${itemToAddToCart.color}) is already in your cart. Adjust quantity there.`);
                return prev;
            } else {
                // New item (different ID or different color)
                const newItem = { ...itemToAddToCart, quantity: 1 };
                if (prev.length === 0) {
                    setIsCartOpen(true);
                } else {
                    showToast(`${product.name} (${itemToAddToCart.color}) added to collection`);
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

    const handleUpdateColor = (index, newColor) => {
        setCart(prev => {
            const newCart = [...prev];
            const item = newCart[index];

            // If already this color, do nothing
            if (item.color === newColor) return prev;

            // Check if swapping to this color creates a duplicate with another item
            const existingIdx = prev.findIndex((it, i) => i !== index && it.id === item.id && it.color === newColor);

            if (existingIdx > -1) {
                // Merge quantity into existing and remove current
                const mergedCart = [...prev];
                mergedCart[existingIdx] = {
                    ...mergedCart[existingIdx],
                    quantity: (mergedCart[existingIdx].quantity || 1) + (item.quantity || 1)
                };
                return mergedCart.filter((_, i) => i !== index);
            }

            // Otherwise just update color and image
            newCart[index] = {
                ...item,
                color: newColor,
                image: newColor === 'white' ? item.whiteImage : item.blackImage
            };
            return newCart;
        });
    };

    const handleDuplicate = (index) => {
        setCart(prev => {
            const item = prev[index];
            const oppositeColor = item.color === 'white' ? 'black' : 'white';
            const oppositeImage = oppositeColor === 'white' ? item.whiteImage : item.blackImage;

            const newItem = {
                ...item,
                color: oppositeColor,
                image: oppositeImage,
                quantity: 1
            };

            // Check if this color already exists to merge instead of duplicating
            const existingIdx = prev.findIndex(it => it.id === item.id && it.color === oppositeColor);
            if (existingIdx > -1) {
                const newCart = [...prev];
                newCart[existingIdx] = {
                    ...newCart[existingIdx],
                    quantity: (newCart[existingIdx].quantity || 1) + 1
                };
                return newCart;
            }

            const newCart = [...prev];
            newCart.splice(index + 1, 0, newItem);
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
                onUpdateColor={handleUpdateColor}
                onDuplicate={handleDuplicate}
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
                <Hero />
                <About />
                <Collection onAddToCart={handleAddToCart} />
                <Craft />
                <Gallery />
                <Concierge cart={cart} />
            </main>
            <Footer />
        </div>
    );
}

export default TShirtShop;
