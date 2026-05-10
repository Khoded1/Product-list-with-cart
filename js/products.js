import { addToCart, updateCartTotals } from './cart.js';

export let productsData = [];
export let imageContainers = [];

export async function loadProducts() {
	const response = await fetch('../data.json');
	const products = await response.json();
	productsData = products;
	displayProducts(products);
	updateCartTotals();
}

export const displayProducts = productList => {
	const productsContainer = document.querySelector('.order_container');
	productList.forEach((product, index) => {
		const productElement = document.createElement('div');
		productElement.classList.add('menu_order_container');
		productElement.innerHTML = `
			<div class="product-card_background">
			<div class="image_addToCart_container">
			<div class="order__image_container">
			<img src="${product.image.desktop}" alt="${product.name}" class="order__image">
			<button class="addToCartBtn" data-id="${index}" data-name="${product.name}" data-price="${product.price}"> <img src="../assets/images/icon-add-to-cart.svg"/>Add to Cart</button>
			</div>
			<div class="quantity-controls" data-id="${index}" style="display: none;">
				<button class="quantity-btn decrease-btn">-</button>
				<span class="quantity-display">1</span>
				<button class="quantity-btn increase-btn">+</button>
			</div>
			</div>
			<div class="order__details_container">
			<p class="order__name fontSize">${product.name}</p>
			<h3 class="order__withTopping fontSize">${product.category}</h3>
			<p class="order__price fontSize">Price: $${product.price.toFixed(2)}</p>
			</div>
			</div>
		`;
		productsContainer.appendChild(productElement);
		const imageContainer = productElement.querySelector(
			'.order__image_container',
		);
		imageContainers.push(imageContainer);
	});
};