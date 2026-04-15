import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CartDrawer = ({ isOpen, onClose, cart, onRemoveFromCart, onUpdateQuantity, onUpdateColor, onDuplicate, onProceed }) => {
    const drawerRef = useRef();
    const overlayRef = useRef();
    const contentRef = useRef();

    useGSAP(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const tl = gsap.timeline();
            tl.to(overlayRef.current, { opacity: 1, duration: 0.4, display: 'block' });
            tl.to(drawerRef.current, { x: 0, duration: 0.6, ease: 'power3.out' }, "-=0.2");
            tl.fromTo(contentRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
                "-=0.3"
            );
        } else {
            document.body.style.overflow = 'auto';
            const tl = gsap.timeline();
            tl.to(drawerRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' });
            tl.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none' }, "-=0.2");
        }
    }, [isOpen]);

    const total = cart.reduce((acc, item) => {
        const itemPrice = parseInt(item.price.replace('$', ''));
        return acc + (itemPrice * (item.quantity || 1));
    }, 0);

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                onClick={onClose}
                className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[100] hidden opacity-0"
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-cream z-[101] translate-x-full shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-charcoal/5 flex justify-between items-center bg-cream">
                    <h2 className="text-xl font-heading italic">Your Collection</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:rotate-90 transition-transform duration-300"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div ref={contentRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                            <svg className="mb-6" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                                <path d="M3 6h18M16 10a4 4 0 01-8 0" />
                            </svg>
                            <p className="uppercase tracking-[0.2em] text-xs">Your collection is empty</p>
                            <button
                                onClick={onClose}
                                className="mt-8 text-rose text-xs uppercase tracking-widest font-bold border-b border-rose pb-1"
                            >
                                Continue Browsing
                            </button>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.id}-${item.color}-${index}`} className="flex gap-4 md:gap-6 group">
                                <div className="w-20 md:w-24 aspect-[3/4] bg-charcoal/5 overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-[10px] uppercase tracking-widest text-rose font-medium block mb-1">
                                                    {item.category}{item.color ? ` — ${item.color}` : ''}
                                                </span>
                                                <h3 className="text-sm font-heading italic leading-tight">{item.name}</h3>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-medium block">{item.price}</span>
                                                {item.quantity > 1 && (
                                                    <span className="text-[10px] text-charcoal/40 block mt-1">Total: ${parseInt(item.price.replace('$', '')) * item.quantity}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Color Selection in Cart (Only for items with color) */}
                                        {item.color && (
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-[8px] uppercase tracking-widest text-charcoal/50 font-bold">Edition: <span className="text-charcoal">{item.color}</span></span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => onUpdateColor && onUpdateColor(index, 'white')}
                                                        className={`w-3.5 h-3.5 rounded-full border border-charcoal/20 transition-all ${item.color === 'white' ? 'ring-2 ring-rose ring-offset-2 border-rose' : 'hover:scale-110 hover:border-rose'}`}
                                                        style={{ backgroundColor: '#F8F8F8' }}
                                                        title="White Edition"
                                                    />
                                                    <button
                                                        onClick={() => onUpdateColor && onUpdateColor(index, 'black')}
                                                        className={`w-3.5 h-3.5 rounded-full border border-charcoal/20 transition-all ${item.color === 'black' ? 'ring-2 ring-rose ring-offset-2 border-rose' : 'hover:scale-110 hover:border-rose'}`}
                                                        style={{ backgroundColor: '#2D2D2D' }}
                                                        title="Black Edition"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center border border-charcoal/10">
                                            <button
                                                onClick={() => onUpdateQuantity && onUpdateQuantity(index, -1)}
                                                className="px-3 py-1 hover:bg-charcoal/5 transition-colors"
                                            >
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14" />
                                                </svg>
                                            </button>
                                            <span className="px-3 py-1 text-[10px] font-medium border-x border-charcoal/10 min-w-[32px] text-center">
                                                {item.quantity || 1}
                                            </span>
                                            <button
                                                onClick={() => onUpdateQuantity && onUpdateQuantity(index, 1)}
                                                className="px-3 py-1 hover:bg-charcoal/5 transition-colors"
                                            >
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 5v14M5 12h14" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {item.color && (
                                                <button
                                                    onClick={() => onDuplicate && onDuplicate(index)}
                                                    className="text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-rose transition-colors flex items-center gap-2"
                                                    title={`Add ${item.color === 'white' ? 'black' : 'white'} edition`}
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M12 5v14M5 12h14" />
                                                    </svg>
                                                    {item.color === 'white' ? 'Black' : 'White'}
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onRemoveFromCart(index)}
                                                className="text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-rose transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 md:p-8 bg-charcoal text-cream">
                        <div className="flex justify-between items-end mb-6 md:mb-8">
                            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Subtotal Selection</span>
                            <span className="text-2xl md:text-3xl font-heading italic text-rose">${total}</span>
                        </div>
                        <button
                            onClick={onProceed}
                            className="w-full py-5 md:py-6 px-4 bg-rose text-cream text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-cream hover:text-charcoal transition-all duration-500"
                        >
                            Proceed to Inquiry
                        </button>
                        <p className="mt-4 text-[8px] uppercase tracking-widest text-center opacity-30">
                            Shipping and taxes calculated at concierge checkout
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
