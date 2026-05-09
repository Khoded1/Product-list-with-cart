import { cart, updateCartTotals } from './cart.js';
import { imageContainers } from './products.js';

export function showOrderModal() {
	const modal = document.getElementById('orderModal');
	const orderItems = document.querySelector('.order-items');
	const orderTotal = document.querySelector('.modal-total-price');
	orderItems.innerHTML = '';
	let total = 0;
	cart.forEach(item => {
		const itemElement = document.createElement('li');
		itemElement.classList.add('order-item');
		itemElement.innerHTML = `
			<img src="${item.image.thumbnail}" alt="${item.name}" class="order-item-image" />
			<div class="order-item-details">
				<h4>${item.name}</h4>
				<p>${item.quantity}x @ $${item.price.toFixed(2)}</p>
			</div>
			<p class="order-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
		`;
		orderItems.appendChild(itemElement);
		total += item.price * item.quantity;
	});
	orderTotal.textContent = `$${total.toFixed(2)}`;
	modal.style.display = 'flex';
}

export function hideOrderModal() {
	const modal = document.getElementById('orderModal');
	modal.style.display = 'none';
}

export function startNewOrder() {
	// Clear cart
	cart.length = 0;

	// Clear cart items from DOM
	const productCart = document.querySelector('.product_cart');
	if (productCart) {
		productCart.innerHTML = '';
	}

	// Reset all product states
	imageContainers.forEach((container, index) => {
		container.classList.remove('active');
		const button = container.querySelector('.addToCartBtn');
		const quantityControls = document.querySelector(
			`.quantity-controls[data-id="${index}"]`,
		);
		if (button && quantityControls) {
			button.classList.remove('active');
			button.style.display = 'block';
			quantityControls.style.display = 'none';
			const quantityDisplay =
				quantityControls.querySelector('.quantity-display');
			if (quantityDisplay) {
				quantityDisplay.textContent = '1';
			}
		}
	});

	// Update cart display
	updateCartTotals();

	// Hide modal
	hideOrderModal();
}
