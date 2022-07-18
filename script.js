"use strict";

const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let nameValue;
let urlValue;

let bookmarks = [];

// Show Modal, Focus on Input
const showModal = () => {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
};

const closeModal = (e) => {
  if (e.target === modal || e.target === modalClose) {
    modal.classList.remove("show-modal");
    // websiteNameEl.value = "";
    // websiteUrlEl.value = "";
  }
};

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modal.addEventListener("click", closeModal);

// Validate Form
const validate = (nameValue, urlValue) => {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  return true;
};

// Fetch Bookmarks
const fetchBookmarks = () => {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // Create bookmarks array in localStorage
    bookmarks = [
      {
        name: "Jacinto Design",
        url: "https://jacinto.design",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
};

// Handle Data from Form
const storeBookmark = (e) => {
  e.preventDefault();
  nameValue = websiteNameEl.value;
  urlValue = websiteUrlEl.value;
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }

  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
};

// Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
