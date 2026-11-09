/* Hafiza Online Academy — mobile nav, EN/UR language toggle, mailto forms. */
(function () {
  "use strict";

  /* Mobile nav */
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* EN / UR language toggle.
     Any element with data-en and data-ur gets its text swapped.
     Urdu mode sets <html lang="ur" dir="rtl">. Choice is remembered. */
  var LANG_KEY = "hoa-lang";
  var toggleBtn = document.querySelector(".lang-toggle");

  function applyLang(lang) {
    var nodes = document.querySelectorAll("[data-en][data-ur]");
    nodes.forEach(function (el) {
      el.textContent = lang === "ur" ? el.getAttribute("data-ur") : el.getAttribute("data-en");
    });
    document.documentElement.lang = lang === "ur" ? "ur" : "en";
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    if (toggleBtn) {
      toggleBtn.textContent = lang === "ur" ? "English" : "اردو";
      toggleBtn.setAttribute("aria-label", lang === "ur" ? "Switch to English" : "Switch to Urdu");
    }
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var current = document.documentElement.lang === "ur" ? "ur" : "en";
      applyLang(current === "ur" ? "en" : "ur");
    });
  }

  var saved = "en";
  try { saved = localStorage.getItem(LANG_KEY) || "en"; } catch (e) { /* storage unavailable */ }
  if (saved === "ur") { applyLang("ur"); }

  /* Mailto forms: build a pre-filled email to the academy and open the user's mail app. */
  function mailtoSubmit(formId, to, subjectPrefix) {
    var form = document.getElementById(formId);
    if (!form) { return; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var lines = [];
      var fields = form.querySelectorAll("input, select, textarea");
      fields.forEach(function (f) {
        if (!f.name || !f.value) { return; }
        lines.push(f.name + ": " + f.value);
      });
      var subject = encodeURIComponent(subjectPrefix + " — Hafiza Online Academy");
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
    });
  }

  mailtoSubmit("trial-form", "hafizaonline.it@gmail.com", "Free Trial Booking");
  mailtoSubmit("contact-form", "hafizaonline.it@gmail.com", "Message");
})();
