// Cart functionality
let cart = [];

// Modal handling
const modal = document.getElementById('bookingModal');
const bookNowBtns = document.querySelectorAll('#bookNowBtn, #heroBookBtn, .book-service, #ndisEnquiry');
const closeModal = document.querySelector('.close');

bookNowBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.dataset.service || '';
        if (service) {
            document.getElementById('serviceSelect').value = service;
        }
        modal.style.display = 'block';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Booking form submission
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Booking submission:', data);
    
    // In production, connect to Calendly, Formspree, or your backend
    alert('Thank you for your booking request! We\'ll contact you within 24 hours to confirm your session.');
    modal.style.display = 'none';
    e.target.reset();
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Contact form submission:', data);
    
    // In production, connect to Formspree, Resend, or email service
    alert('Thank you for your enquiry! We\'ll get back to you soon.');
    e.target.reset();
});

// Shopping cart
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const product = btn.dataset.product;
        const price = parseFloat(btn.dataset.price);
        
        cart.push({ product, price });
        updateCart();
        
        btn.textContent = 'Added!';
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
        }, 1000);
    });
});

function updateCart() {
    cartCount.textContent = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
    checkoutBtn.disabled = cart.length === 0;
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    console.log('Checkout cart:', cart);
    
    // In production, integrate Stripe checkout:
    // 1. Create Stripe checkout session with cart items
    // 2. Redirect to Stripe hosted checkout
    // Example:
    // stripe.redirectToCheckout({ sessionId: 'sess_xxx' });
    
    alert(`Proceeding to checkout for ${cart.length} item(s) - Total: $${cartTotal.textContent}\n\nStripe integration can be added here for real payments.`);
    
    // Clear cart after checkout
    cart = [];
    updateCart();
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
