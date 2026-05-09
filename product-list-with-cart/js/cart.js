import { productsData } from './products.js';

export let cart = [];

export function addToCart(product) {
	const existingProduct = cart.find(item => item.id === product.id);
	if (existingProduct) {
		existingProduct.quantity++;
		updateCartItem(existingProduct);
		updateQuantityDisplay(product.id, existingProduct.quantity);
	} else {
		const cartItem = createCartItem(product);
		cart.push({ ...product, element: cartItem });
		document.querySelector('.product_cart').appendChild(cartItem);
	}
	const imageContainer = product.button.closest('.order__image_container');
	imageContainer.classList.add('active');
	product.button.classList.add('active');
	toggleQuantityControls(product.id, true);
	updateCartTotals();
}

export function createCartItem(product) {
	const cartItem = document.createElement('li');
	cartItem.classList.add('product_cart_details');
	cartItem.innerHTML = `
		<h4 class="product_cart_name">${product.name}</h4>
		<div class="price_li">
			<div class="product_cart_details_list">
				<p class="product_cart_quantity">
					<span>${product.quantity}x</span>
				</p>
				<p class="product_cart_price">@ $${product.price.toFixed(2)}</p>
				<p class="product_cart_item_total_price">
					<span>$${(product.price * product.quantity).toFixed(2)}</span>
				</p>
			</div>
			<button class="remove-item-btn" data-id="${product.id}">
				<img src="../assets/images/icon-remove-item.svg" alt="Remove" />
			</button>
		</div>
	`;
	const removeBtn = cartItem.querySelector('.remove-item-btn');
	removeBtn.addEventListener('click', () => {
		removeFromCart(product.id);
	});
	return cartItem;
}

export function updateCartItem(product) {
	const cartItem = cart.find(item => item.id === product.id).element;
	const quantitySpan = cartItem.querySelector('.product_cart_quantity span');
	const totalSpan = cartItem.querySelector(
		'.product_cart_item_total_price span',
	);
	quantitySpan.textContent = `${product.quantity}x`;
	totalSpan.textContent = `$${(product.price * product.quantity).toFixed(2)}`;
}

export function updateQuantityDisplay(productId, quantity) {
	const quantityControls = document.querySelector(
		`.quantity-controls[data-id="${productId}"]`,
	);
	const quantityDisplay = quantityControls
		? quantityControls.querySelector('.quantity-display')
		: null;
	if (quantityDisplay) {
		quantityDisplay.textContent = quantity;
	}
}

export function toggleQuantityControls(productId, show) {
	const addToCartBtn = document.querySelector(
		`.addToCartBtn[data-id="${productId}"]`,
	);
	const quantityControls = document.querySelector(
		`.quantity-controls[data-id="${productId}"]`,
	);

	if (show) {
		addToCartBtn.style.display = 'none';
		quantityControls.style.display = 'flex';
	} else {
		addToCartBtn.style.display = 'block';
		quantityControls.style.display = 'none';
	}
}
export function updateCartTotals() {
	const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);
	document.getElementById('itemCount').textContent = itemCount;
	document.querySelector('.total_cart_price').textContent =
		`$${totalPrice.toFixed(2)}`;
	const emptyCart = document.getElementById('emptyCart');
	const cartItemsContainer = document.querySelector('.cart_items_container');
	if (cart.length === 0) {
		emptyCart.style.display = 'block';
		cartItemsContainer.style.display = 'none';
	} else {
		emptyCart.style.display = 'none';
		cartItemsContainer.style.display = 'block';
	}
}
export function removeFromCart(productId) {
	const productIndex = cart.findIndex(item => item.id === productId);
	if (productIndex > -1) {
		const product = cart[productIndex];
		cart.splice(productIndex, 1);
		product.element.remove();
		const imageContainer = product.button.closest('.order__image_container');
		imageContainer.classList.remove('active');
		product.button.classList.remove('active');
		toggleQuantityControls(product.id, false);
		updateCartTotals();
	}
}
