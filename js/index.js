import {
	loadProducts,
	displayProducts,
	productsData,
	imageContainers,
} from './products.js';
import {
	cart,
	addToCart,
	updateCartItem,
	updateQuantityDisplay,
	updateCartTotals,
	removeFromCart,
} from './cart.js';
import { showOrderModal, hideOrderModal, startNewOrder } from './modal.js';

document.addEventListener('DOMContentLoaded', async () => {
	await loadProducts();
	setupEventListeners();
});

function setupEventListeners() {
	// Event listeners for buttons
	document.addEventListener('click', e => {
		if (e.target.classList.contains('addToCartBtn')) {
			const btn = e.target;
			const productId = parseInt(btn.dataset.id);
			const productData = productsData[productId];
			const product = {
				id: btn.dataset.id,
				name: btn.dataset.name,
				price: parseFloat(btn.dataset.price),
				category: productData.category,
				quantity: 1,
				button: btn,
				image: productData.image,
			};
			addToCart(product);
		}

		if (
			e.target.classList.contains('decrease-btn') ||
			e.target.parentElement.classList.contains('decrease-btn')
		) {
			const btn = e.target.classList.contains('decrease-btn')
				? e.target
				: e.target.parentElement;
			const productId = btn.parentElement.dataset.id;
			const product = cart.find(item => item.id === productId);
			if (product && product.quantity > 1) {
				product.quantity--;
				updateCartItem(product);
				updateQuantityDisplay(productId, product.quantity);
			}
		}

		if (
			e.target.classList.contains('increase-btn') ||
			e.target.parentElement.classList.contains('increase-btn')
		) {
			const btn = e.target.classList.contains('increase-btn')
				? e.target
				: e.target.parentElement;
			const productId = btn.parentElement.dataset.id;
			const product = cart.find(item => item.id === productId);
			if (product) {
				product.quantity++;
				updateCartItem(product);
				updateQuantityDisplay(productId, product.quantity);
			}
		}

		if (
			e.target.classList.contains('remove-item-btn') ||
			e.target.parentElement.classList.contains('remove-item-btn')
		) {
			const btn = e.target.classList.contains('remove-item-btn')
				? e.target
				: e.target.parentElement;
			const productId = btn.dataset.id;
			removeFromCart(productId);
		}
	});

	const confirmBtn = document.querySelector('.confirm_cart_btn');
	const startNewOrderBtn = document.querySelector('.start-new-order-btn');
	const modal = document.getElementById('orderModal');

	if (confirmBtn) {
		confirmBtn.addEventListener('click', showOrderModal);
	}

	if (startNewOrderBtn) {
		startNewOrderBtn.addEventListener('click', startNewOrder);
	}

	// Close modal when clicking outside
	if (modal) {
		modal.addEventListener('click', e => {
			if (e.target === modal) {
				hideOrderModal();
			}
		});
	}
}
