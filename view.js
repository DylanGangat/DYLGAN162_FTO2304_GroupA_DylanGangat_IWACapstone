import { css, genres, authors } from "./data.js";

/**
 * An object literal that contains references to all the HTML elements
 * referenced through the operation of the app either upon initialisation or
 * while its running (via event listeners). This ensure that all UI elements can
 * be accessed and seen in a structured manner in a single data structure.
 */

export const html = {
  list: {
    button: document.querySelector("[data-list-button]"),
    message: document.querySelector("[data-list-message]"),
    overlay: document.querySelector("[data-list-active]"),
    close: document.querySelector("[data-list-close]"),
    items: document.querySelector("[data-list-items]"),
    blur: document.querySelector("[data-list-blur]"),
    image: document.querySelector("[data-list-image]"),
    title: document.querySelector("[data-list-title]"),
    subtitle: document.querySelector("[data-list-subtitle]"),
    description: document.querySelector("[data-list-description]"),
  },
  search: {
    button: document.querySelector("[data-header-search]"),
    overlay: document.querySelector("[data-search-overlay]"),
    cancel: document.querySelector("[data-search-cancel]"),
    form: document.querySelector("[data-search-form]"),
    authors: document.querySelector("[data-search-authors]"),
    genres: document.querySelector("[data-search-genres]"),
    title: document.querySelector("[data-search-title]"),
  },
  settings: {
    button: document.querySelector("[data-header-settings]"),
    overlay: document.querySelector("[data-settings-overlay]"),
    cancel: document.querySelector("[data-settings-cancel]"),
    form: document.querySelector("[data-settings-form]"),
    theme: document.querySelector("[data-settings-theme]"),
  },
};

/**
 * Detects if the user prefers dark mode and applies corresponding theme styles to the HTML document.
 */
const applyDarkModeTheme = () => {
  /**
   * Indicates whether the user prefers dark mode.
   * @type {boolean}
   */
  const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  html.settings.theme.value = prefersDarkMode ? "night" : "day";
  const theme = prefersDarkMode ? "night" : "day";

  // Update CSS variables based on user theme preference
  document.documentElement.style.setProperty("--color-dark", css[theme].dark);
  document.documentElement.style.setProperty("--color-light", css[theme].light);
};

/**
 * Creates an HTML document fragment containing genre options.
 *
 * This function generates an HTML document fragment that includes a default "All Genres" option
 * and additional genre options based on the provided genres object.
 *
 * @returns {DocumentFragment} The HTML document fragment with genre options.
 */

const createGenreOptionsHtml = () => {
  const fragment = document.createDocumentFragment();
  /**
   * Default "All Genres" option.
   * @type {HTMLOptionElement}
   */
  const allGenresOption = document.createElement("option");
  allGenresOption.value = "any";
  allGenresOption.innerText = "All Genres";
  fragment.appendChild(allGenresOption);

  for (const [id, name] of Object.entries(genres)) {
    /**
     * Genre option element.
     * @type {HTMLOptionElement}
     */
    const genreOption = document.createElement("option");
    genreOption.value = id;
    genreOption.innerText = name;
    fragment.appendChild(genreOption);
  }

  return fragment;
};

/**
 * Creates a document fragment containing HTML options for a list of authors.
 *
 * This function generates an HTML document fragment that includes a default "All Authors" option
 * and additional author options based on the provided authors object.
 *
 * @returns {DocumentFragment} The HTML document fragment with author options.
 */

const createAuthorOptionsHtml = () => {
  const fragment = document.createDocumentFragment();
  /**
   * Default "All Authors" option.
   * @type {HTMLOptionElement}
   */
  const allAuthorsOption = document.createElement("option");
  allAuthorsOption.value = "any";
  allAuthorsOption.innerText = "All Authors";
  fragment.appendChild(allAuthorsOption);

  for (const [id, name] of Object.entries(authors)) {
    /**
     * Author option element.
     * @type {HTMLOptionElement}
     */
    const authorOption = document.createElement("option");
    authorOption.value = id;
    authorOption.innerText = name;
    fragment.appendChild(authorOption);
  }
  return fragment;
};

/**
 * Creates a book preview as a button element with the provided book information.
 * @param {Object} book - The book object containing details of the book.
 * @param {string} book.author - The ID of the book's author.
 * @param {string} book.id - The unique ID of the book.
 * @param {string} book.image - The URL of the book's cover image.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLButtonElement} The generated button element representing the book preview.
 */

export const createPreview = book => {
  const { author: authorId, id, image, title } = book;
  const element = document.createElement("button");
  element.className = "preview";
  element.dataset.preview = id;
  element.innerHTML = /* html */ `
              <img
                  class="preview__image"
                  src="${image}"
              />

              <div class="preview__info">
                  <h3 class="preview__title">${title}</h3>
                  <div class="preview__author">${authors[authorId]}</div>
              </div>
          `;
  return element;
};

applyDarkModeTheme();
html.search.genres.appendChild(createGenreOptionsHtml());
html.search.authors.appendChild(createAuthorOptionsHtml());
