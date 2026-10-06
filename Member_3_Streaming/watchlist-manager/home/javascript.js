(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const path = location.pathname.replace(/\\/g, "/");
  const page = path.split("/").filter(Boolean).pop() || "index.html";
  const folder = path.split("/").filter(Boolean).slice(-2, -1)[0] || "";
  const isCheckout = folder === "checkout";

  // Persistent dark mode
  const body = document.body;
  const themeBtn = $("#themeBtn");
  if (localStorage.getItem("ui-dark-mode") === "true") body.classList.add("dark");
  themeBtn?.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("ui-dark-mode", String(body.classList.contains("dark")));
  });

  // Add a small amount of behavior styling without changing the template design.
  const style = document.createElement("style");
  style.textContent = `
    .item-card.is-selected{outline:2px solid #5b4bdb;transform:translateY(-2px)}
    .seat.selected{background:#5b4bdb!important;color:#fff!important;border-color:#5b4bdb!important}
    .chip.active{cursor:pointer}
    .ui-modal-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.62);display:grid;place-items:center;padding:20px;z-index:9999}
    .ui-modal{width:min(520px,100%);background:#fff;color:#172033;border-radius:20px;padding:24px;box-shadow:0 24px 70px rgba(0,0,0,.3)}
    .dark .ui-modal{background:#171d2b;color:#f3f4f6}
    .ui-modal h2{margin:0 0 8px}.ui-modal p{color:#687389}
    .ui-form{display:grid;gap:12px;margin-top:16px}
    .ui-form input,.ui-form select{width:100%;padding:11px 12px;border:1px solid #dfe3ec;border-radius:10px;background:inherit;color:inherit}
    .ui-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:18px}
    .ui-actions button{border-radius:10px;padding:10px 14px;border:1px solid #dfe3ec;cursor:pointer;font-weight:700}
    .ui-actions .ui-primary{background:#5b4bdb;color:#fff;border-color:#5b4bdb}
    .ui-success{padding:16px;border-radius:12px;background:#e8f7ee;color:#197a43;font-weight:700;margin-top:14px}
    .dark .ui-success{background:#173a2a;color:#9af0b7}
    .ui-toast{position:fixed;right:20px;bottom:20px;background:#172033;color:#fff;padding:12px 16px;border-radius:12px;z-index:10000;box-shadow:0 12px 30px rgba(0,0,0,.2)}
  `;
  document.head.appendChild(style);

  const appRoot = path.split("/").filter(Boolean).slice(0, -1).join("/");
  const storageKey = `ui-booking:${appRoot}`;
  const getState = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); }
    catch { return {}; }
  };
  const saveState = (s) => localStorage.setItem(storageKey, JSON.stringify(s));

  let state = getState();
  state.seats = Array.isArray(state.seats) ? state.seats : [];
  state.item = state.item || "";

  const count = $("#count"), basePrice = $("#basePrice"), fee = $("#fee"), total = $("#total"), message = $("#message");

  function toast(text) {
    const old = $(".ui-toast");
    old?.remove();
    const t = document.createElement("div");
    t.className = "ui-toast";
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  function updateSummary() {
    const selectedSeats = $$(".seat.selected");
    state.seats = selectedSeats.map(s => s.dataset.seat || s.textContent.trim());
    const qty = state.seats.length;
    const itemPrice = state.item ? 249 : 0;
    const seatPrice = qty * 249;
    const service = (qty || state.item) ? 49 : 0;
    const amount = seatPrice + itemPrice + service;

    if (count) count.textContent = qty;
    if (basePrice) basePrice.textContent = "₹" + (seatPrice + itemPrice);
    if (fee) fee.textContent = "₹" + service;
    if (total) total.textContent = "₹" + amount;
    if (message) {
      message.textContent = qty
        ? `${qty} seat${qty === 1 ? "" : "s"} selected. Total ₹${amount}.`
        : state.item
          ? `${state.item} selected. Choose seats or continue.`
          : "Choose an item or seat to begin.";
    }
    saveState(state);
    return { qty, amount, seats: state.seats };
  }

  // Restore selected item and seats.
  $$(".seat").forEach(seat => {
    if (state.seats.includes(seat.dataset.seat || seat.textContent.trim())) seat.classList.add("selected");
  });
  $$(".item-card").forEach(card => {
    if (state.item && (card.dataset.name || $("h3", card)?.textContent.trim()) === state.item) {
      card.classList.add("is-selected");
    }
  });

  // Seat selection
  $$(".seat").forEach(seat => seat.addEventListener("click", () => {
    seat.classList.toggle("selected");
    updateSummary();
  }));

  // Select cards
  $$(".select-btn").forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = btn.closest(".item-card");
    if (!card) return;
    $$(".item-card").forEach(c => c.classList.remove("is-selected"));
    card.classList.add("is-selected");
    state.item = card.dataset.name || $("h3", card)?.textContent.trim() || "Selected item";
    saveState(state);
    updateSummary();
    toast(`${state.item} selected`);
  }));

  // Search/filter
  const searchInput = $("#searchInput"), searchBtn = $("#searchBtn"), cards = $$("#cards .item-card");
  function doSearch() {
    const q = (searchInput?.value || "").trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const hay = (card.dataset.name || card.textContent).toLowerCase();
      const show = !q || hay.includes(q);
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    if (searchInput && !visible) searchInput.setAttribute("aria-invalid", "true");
    else searchInput?.removeAttribute("aria-invalid");
    if (q) toast(`${visible} result${visible === 1 ? "" : "s"} found`);
  }
  searchBtn?.addEventListener("click", doSearch);
  searchInput?.addEventListener("keydown", e => { if (e.key === "Enter") doSearch(); });
  searchInput?.addEventListener("input", () => {
    if (!searchInput.value.trim()) cards.forEach(c => c.style.display = "");
  });

  // Quick filter chips
  $$(".chip").forEach(chip => chip.addEventListener("click", () => {
    $$(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const label = chip.textContent.trim();
    toast(`${label} filter selected`);
    if (searchInput && label !== "Today") searchInput.value = label;
    if (label !== "Today") doSearch();
    else cards.forEach(c => c.style.display = "");
  }));

  // Continue: browse/details/home -> checkout; checkout -> payment/confirmation.
  const continueBtn = $("#continueBtn");
  continueBtn?.addEventListener("click", () => {
    const summary = updateSummary();
    if (!state.item && summary.qty === 0) {
      toast("Select an item or seat first");
      return;
    }
    if (!isCheckout) {
      location.href = "../checkout/index.html";
      return;
    }
    openCheckout(summary);
  });

  function openCheckout(summary) {
    const backdrop = document.createElement("div");
    backdrop.className = "ui-modal-backdrop";
    backdrop.innerHTML = `
      <div class="ui-modal" role="dialog" aria-modal="true">
        <h2>Confirm your booking</h2>
        <p>${summary.qty ? summary.qty + " seat(s)" : "Your selected item"} · Total ₹${summary.amount}</p>
        <form class="ui-form" id="bookingForm">
          <input name="name" required placeholder="Full name" autocomplete="name">
          <input name="email" type="email" required placeholder="Email address" autocomplete="email">
          <select name="payment" required>
            <option value="">Choose payment method</option>
            <option>UPI</option><option>Credit / Debit Card</option><option>Net Banking</option>
          </select>
          <div class="ui-actions">
            <button type="button" id="cancelBooking">Cancel</button>
            <button class="ui-primary" type="submit">Pay ₹${summary.amount}</button>
          </div>
        </form>
      </div>`;
    document.body.appendChild(backdrop);
    $("#cancelBooking", backdrop).addEventListener("click", () => backdrop.remove());
    backdrop.addEventListener("click", e => { if (e.target === backdrop) backdrop.remove(); });
    $("#bookingForm", backdrop).addEventListener("submit", e => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const booking = {
        id: "BK" + Date.now().toString().slice(-8),
        name: form.get("name"),
        email: form.get("email"),
        payment: form.get("payment"),
        item: state.item || "Booking",
        seats: summary.seats,
        total: summary.amount,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem("last-booking", JSON.stringify(booking));
      e.currentTarget.innerHTML = `
        <div class="ui-success">Booking confirmed successfully!</div>
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>Seats:</strong> ${booking.seats.length ? booking.seats.join(", ") : "Not required"}</p>
        <p><strong>Total paid:</strong> ₹${booking.total}</p>
        <div class="ui-actions"><button type="button" class="ui-primary" id="doneBooking">Done</button></div>`;
      $("#doneBooking", e.currentTarget).addEventListener("click", () => {
        state.seats = [];
        saveState(state);
        $$(".seat").forEach(s => s.classList.remove("selected"));
        updateSummary();
        backdrop.remove();
        toast("Booking saved");
      });
    });
  }

  // Generic links/buttons that look like actions but have no href.
  $$("[data-action]").forEach(el => el.addEventListener("click", () => {
    const action = el.dataset.action;
    if (action === "back") history.back();
    if (action === "clear") {
      localStorage.removeItem(storageKey);
      location.reload();
    }
  }));

  updateSummary();
})();
