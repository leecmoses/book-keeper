"use strict";

const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

// Show Modal, Focus on Input
const showModal = () => {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
};

const closeModal = (e) => {
  e.target === modal || e.target === modalClose
    ? modal.classList.remove("show-modal")
    : false;
};

// Events
modalShow.addEventListener("click", showModal);
modal.addEventListener("click", closeModal);
