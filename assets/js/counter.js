"use strict";

/*
 * POS COUNT – INTERAKTIVER PRODUKTZÄHLER
 *
 * Produkt A und Produkt B werden unabhängig voneinander gezählt.
 * Die Zählerstände werden lokal im Browser gespeichert.
 *
 * Dieser Speicher ist nicht mit anderen Besuchern oder Geräten synchronisiert.
 */

(() => {
  const STORAGE_KEY = "pos-count-product-counters-v1";

  const DEFAULT_COUNTS = {
    a: 0,
    b: 0
  };

  const outputA = document.getElementById("count-a");
  const outputB = document.getElementById("count-b");
  const outputTotal = document.getElementById("count-total");
  const lastAction = document.getElementById("last-action");

  if (!outputA || !outputB) {
    return;
  }

  function validCount(value) {
    return Number.isSafeInteger(value) && value >= 0
      ? value
      : 0;
  }

  function loadCounts() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return { ...DEFAULT_COUNTS };
      }

      const parsed = JSON.parse(saved);

      return {
        a: validCount(parsed.a),
        b: validCount(parsed.b)
      };
    } catch (error) {
      return { ...DEFAULT_COUNTS };
    }
  }

  let counts = loadCounts();

  function formatCount(value) {
    return String(value).padStart(6, "0");
  }

  function saveCounts() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    } catch (error) {
      if (lastAction) {
        lastAction.textContent = "SPEICHERN NICHT MÖGLICH";
      }
    }
  }

  function updateDisplay() {
    outputA.textContent = formatCount(counts.a);
    outputB.textContent = formatCount(counts.b);

    if (outputTotal) {
      outputTotal.textContent = (counts.a + counts.b).toLocaleString("de-DE");
    }
  }

  function animateLed(counter) {
    const led = document.getElementById(`led-${counter}`);

    if (!led) {
      return;
    }

    led.classList.remove("led-pulse");

    // Animation erneut starten.
    void led.offsetWidth;

    led.classList.add("led-pulse");
  }

  function incrementCounter(counter) {
    if (counter !== "a" && counter !== "b") {
      return;
    }

    if (counts[counter] >= Number.MAX_SAFE_INTEGER) {
      if (lastAction) {
        lastAction.textContent = "MAXIMALSTAND ERREICHT";
      }

      return;
    }

    counts[counter] += 1;

    saveCounts();
    updateDisplay();
    animateLed(counter);

    if (lastAction) {
      lastAction.textContent =
        counter === "a" ? "PRODUKT A +1" : "PRODUKT B +1";
    }
  }

  document.querySelectorAll("[data-counter]").forEach((button) => {
    button.addEventListener("click", () => {
      incrementCounter(button.dataset.counter);
    });
  });

  document.querySelectorAll("[data-counter-reset]").forEach((button) => {
    button.addEventListener("click", () => {
      const confirmed = window.confirm(
        "Möchtest du beide Produktzähler wirklich auf null zurücksetzen?"
      );

      if (!confirmed) {
        return;
      }

      counts = { ...DEFAULT_COUNTS };

      saveCounts();
      updateDisplay();

      if (lastAction) {
        lastAction.textContent = "ZÄHLER ZURÜCKGESETZT";
      }
    });
  });

  // Bereits vorhandene Zählerstände beim Laden anzeigen.
  updateDisplay();
})();
