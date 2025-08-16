function addToCart(name, price, image) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1, image });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart!`);
    }

     function loadCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItems = document.getElementById('cart-items');
        let total = 0;
        cartItems.innerHTML = '';

        cart.forEach((item, index) => {
            let div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <div class="item-info">${item.name} (x${item.quantity}) - $${item.price * item.quantity}</div>
                <div class="buttons">
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <button class="remove" onclick="removeItem(${index})">Remove</button>
                </div>
            `;
            cartItems.appendChild(div);
            total += item.price * item.quantity;
        });

        document.getElementById('total-price').textContent = total;
    }

    function changeQuantity(index, amount) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart[index].quantity += amount;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Remove if quantity hits 0
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    function checkout() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Successful purchase!");
        localStorage.removeItem('cart');
        loadCart();
    }

    loadCart();