
  <script>
        // COMPLETE LAAM JAVASCRIPT - FULLY FUNCTIONAL

        // Products Data (Real LAAM products)
        const products = [
            { id: 1, name: "Noor Jahan Embroidered Kurta", brand: "Zeen", price: 289, originalPrice: 359, image: "👗" },
            { id: 2, name: "Royal Silk Saree", brand: "Sana Safinaz", price: 499, originalPrice: 599, image: "🧣" },
            { id: 3, name: "Crystal Embroidered Lehenga", brand: "Nishat Linen", price: 899, originalPrice: 1099, image: "👰" },
            { id: 4, name: "Velvet Winter Kurta", brand: "Khaadi", price: 199, originalPrice: 249, image: "❄️" },
            { id: 5, name: "Bridal Sharara Set", brand: "Baroque", price: 1299, originalPrice: 1599, image: "💃" },
            { id: 6, name: "Floral Printed Lawn", brand: "Junaid Jamshed", price: 89, originalPrice: 119, image: "🌸" },
            { id: 7, name: "Embroidered Abaya", brand: "Zeen Woman", price: 249, originalPrice: 299, image: "🧕" },
            { id: 8, name: "Luxury Velvet Dupatta", brand: "Maria B", price: 179, originalPrice: 219, image: "🧵" },
        ];

        let cart = JSON.parse(localStorage.getItem('laamCart')) || [];

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            updateCartCount();
            setupEventListeners();
        });

        function renderProducts(filter = '') {
            const grid = document.getElementById('productsGrid');
            const filteredProducts = filter ? 
                products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : 
                products;

            grid.innerHTML = filteredProducts.map(product => `
                <div class="product-card">
                    <div class="product-image">${product.image}</div>
                    <div class="product-content">
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">
                            $${product.price}
                            <span class="original-price">$${product.originalPrice}</span>
                        </div>
                        <button onclick="addToCart(${product.id})" 
                                style="margin-top: 15px; width: 100%; padding: 12px; background: #ee5a52; color: white; border: none; border-radius: 8px; cursor: pointer;">
                            Add to Bag
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('laamCart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }

        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = count;
        }

        function setupEventListeners() {
            // Search
            document.getElementById('searchInput').addEventListener('input', (e) => {
                renderProducts(e.target.value);
            });

            // Cart toggle
            document.getElementById('cartBtn').addEventListener('click', toggleCart);
            document.getElementById('closeCart').addEventListener('click', toggleCart);
        }

        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            sidebar.classList.toggle('open');
            renderCart();
        }

        function renderCart() {
            const cartItems = document.getElementById('cartItems');
            const cartEmpty = document.getElementById('cartEmpty');

            if (cart.length === 0) {
                cartItems.style.display = 'none';
                cartEmpty.style.display = 'block';
                return;
            }

            cartEmpty.style.display = 'none';
            cartItems.style.display = 'block';
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="" alt="${item.name}">
                    <div style="flex: 1;">
                        <h4>${item.name}</h4>
                        <p>$${item.price}</p>
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background: none; border: none; font-size: 20px; color: #999;">✕</button>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartItems.innerHTML += `
                <div style="padding: 25px; border-top: 1px solid #eee; background: #f8f9fa;">
                    <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 20px;">
                        <span>Total</span>
                        <span>$${total}</span>
                    </div>
                    <button style="width: 100%; padding: 15px; background: #ee5a52; color: white; border: none; border-radius: 8px; font-size: 16px; margin-top: 15px;">
                        Checkout
                    </button>
                </div>
            `;
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== productId);
                }
                localStorage.setItem('laamCart', JSON.stringify(cart));
                updateCartCount();
                renderCart();
            }
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('laamCart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }
    </script>
