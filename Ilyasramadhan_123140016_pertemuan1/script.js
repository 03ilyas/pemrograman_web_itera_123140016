/**
 * Aplikasi Kasir & Keranjang Belanja Sederhana (Mini POS)
 */

const STORAGE_KEY = "pos_cart_items";

// State Keranjang Belanja
let cartItems = [];

// Elemen DOM Form
const itemForm = document.getElementById("item-form");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const itemQtyInput = document.getElementById("item-qty");

// Elemen DOM Error Feedback
const errorName = document.getElementById("error-name");
const errorPrice = document.getElementById("error-price");
const errorQty = document.getElementById("error-qty");

// Elemen DOM Tabel & Ringkasan
const cartTableBody = document.getElementById("cart-table-body");
const displayGrossTotal = document.getElementById("display-gross-total");
const displayDiscount = document.getElementById("display-discount");
const displayGrandTotal = document.getElementById("display-grand-total");
const discountLabel = document.getElementById("discount-label");

// Elemen DOM Pembayaran
const cashInput = document.getElementById("cash-input");
const paymentStatus = document.getElementById("payment-status");
const btnReset = document.getElementById("btn-reset");

// Inisialisasi Aplikasi Saat Memuat Halaman
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  renderCart();

  // Event Listeners
  itemForm.addEventListener("submit", handleAddItem);
  btnReset.addEventListener("click", handleResetCart);
  cashInput.addEventListener("input", handlePaymentCalculation);
});

// Utility: Format Angka ke Rupiah
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(amount);
}

// 1. Validasi Input Form
function validateForm(name, price, qty) {
  let isValid = true;

  // Reset pesan error
  errorName.textContent = "";
  errorPrice.textContent = "";
  errorQty.textContent = "";

  // Validasi Nama Barang (Wajib diisi, min 3 karakter)
  if (!name || name.trim().length < 3) {
    errorName.textContent = "Nama barang wajib diisi minimal 3 karakter.";
    isValid = false;
  }

  // Validasi Harga Satuan (Wajib angka positif, min 500)
  if (isNaN(price) || price < 500) {
    errorPrice.textContent = "Harga satuan wajib angka minimal Rp 500.";
    isValid = false;
  }

  // Validasi Qty (Wajib angka bulat, min 1)
  if (isNaN(qty) || !Number.isInteger(qty) || qty < 1) {
    errorQty.textContent = "Jumlah barang wajib berupa bilangan bulat minimal 1.";
    isValid = false;
  }

  return isValid;
}

// Tambah Barang ke Keranjang
function handleAddItem(event) {
  event.preventDefault();

  const name = itemNameInput.value.trim();
  const price = Number(itemPriceInput.value);
  const qty = Number(itemQtyInput.value);

  if (!validateForm(name, price, qty)) {
    return; // Cegah submit jika data tidak valid
  }

  const newItem = {
    id: Date.now(),
    name: name,
    price: price,
    qty: qty,
    subtotal: price * qty
  };

  cartItems.push(newItem);
  saveCartToStorage();
  renderCart();

  // Reset form setelah berhasil
  itemForm.reset();
  itemQtyInput.value = 1;
}

// 2. Modul Kalkulator & Perhitungan Otomatis
function calculateTotals() {
  const grossTotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

  // Aturan Diskon: 10% jika total belanja >= Rp 50.000
  let discount = 0;
  if (grossTotal >= 50000) {
    discount = grossTotal * 0.10;
  }

  const grandTotal = grossTotal - discount;

  return { grossTotal, discount, grandTotal };
}

// Perhitungan Uang Kembalian
// Perhitungan Uang Kembalian
function handlePaymentCalculation() {
  const { grandTotal } = calculateTotals();
  const rawValue = cashInput.value.trim();

  // Jika input uang kosong atau belum ada belanjaan
  if (rawValue === "" || cartItems.length === 0) {
    paymentStatus.style.display = "none";
    paymentStatus.textContent = "";
    paymentStatus.className = "payment-feedback";
    return;
  }

  const cashGiven = Number(rawValue);
  const change = cashGiven - grandTotal;

  if (change < 0) {
    paymentStatus.style.display = "block";
    paymentStatus.className = "payment-feedback insufficient";
    paymentStatus.textContent = `Uang belum mencukupi (Kurang: ${formatRupiah(Math.abs(change))})`;
  } else {
    paymentStatus.style.display = "block";
    paymentStatus.className = "payment-feedback sufficient";
    paymentStatus.textContent = `Kembalian: ${formatRupiah(change)}`;
  }
}

// Hapus Item Tertentu dari Keranjang
function removeItem(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  saveCartToStorage();
  renderCart();
}

// 3. Manajemen LocalStorage & Render Tabel
function saveCartToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}

function loadCartFromStorage() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      cartItems = JSON.parse(storedData);
    } catch (e) {
      cartItems = [];
    }
  }
}

// Render Seluruh Tampilan Keranjang
function renderCart() {
  cartTableBody.innerHTML = "";

  if (cartItems.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="6" style="text-align: center; color: #9ca3af; padding: 24px;">Keranjang belanja masih kosong</td>`;
    cartTableBody.appendChild(emptyRow);
  } else {
    cartItems.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${formatRupiah(item.price)}</td>
        <td>${item.qty}</td>
        <td>${formatRupiah(item.subtotal)}</td>
        <td>
          <button class="btn-delete" onclick="removeItem(${item.id})">Hapus</button>
        </td>
      `;
      cartTableBody.appendChild(row);
    });
  }

  // Update Tampilan Kalkulasi
  const { grossTotal, discount, grandTotal } = calculateTotals();
  displayGrossTotal.textContent = formatRupiah(grossTotal);
  displayDiscount.textContent = `- ${formatRupiah(discount)}`;
  displayGrandTotal.textContent = formatRupiah(grandTotal);

  if (grossTotal >= 50000) {
    discountLabel.textContent = "Diskon 10% (Aktif):";
  } else {
    discountLabel.textContent = "Diskon (10% jika ≥ Rp 50.000):";
  }

  // Hitung ulang status pembayaran
  handlePaymentCalculation();
}

// Reset Transaksi Baru
function handleResetCart() {
  if (cartItems.length === 0) return;

  const confirmReset = confirm("Kosongkan keranjang belanja dan mulai transaksi baru?");
  if (confirmReset) {
    cartItems = [];
    localStorage.removeItem(STORAGE_KEY);
    cashInput.value = "";
    renderCart();
  }
}