function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} ditambahkan ke keranjang.`);
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cart-items');
  const summaryDiv = document.getElementById('cart-summary');
  const checkoutLink = document.getElementById('checkout-link');

  if (!cartItemsDiv || !summaryDiv || !checkoutLink) return;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p style="text-align:center;">Keranjang kosong.</p>';
    summaryDiv.innerHTML = '';
    checkoutLink.style.display = 'none';
    return;
  }

  let html = '<ul>';
  let subtotal = 0;
  cart.forEach(item => {
    html += `<li>${item.name} x${item.qty} - Rp ${item.price * item.qty}</li>`;
    subtotal += item.price * item.qty;
  });
  html += '</ul>';
  cartItemsDiv.innerHTML = html;

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  summaryDiv.innerHTML = `
    Subtotal: Rp ${subtotal}<br>
    Pajak (10%): Rp ${tax}<br>
    <strong>Total: Rp ${total}</strong>
  `;

  const message = encodeURIComponent(
    'Halo, saya ingin memesan:\n' +
    cart.map(i => `- ${i.name} x${i.qty}`).join('\n') +
    `\nTotal: Rp ${total}`
  );
  checkoutLink.href = `https://wa.me/6282148753453?text=${message}`;
  checkoutLink.style.display = 'inline-block';
}

function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}
