/// <reference types="cypress" />

class EdenHeaderLocators {
  constructor() {
    this.menuButtons = "#navbar a";
    this.imgLogo = "#header-logo";
    this.searchInput = "#espectaculoList";
    this.searchSuggestion = "li.ui-menu-item";
  }
}

export default class EdenHeader {
  constructor() {
    this.locators = new EdenHeaderLocators();
  }

  getMenuButtons() {
    return cy.get(this.locators.menuButtons);
  }

  getImgLogo() {
    return cy.get(this.locators.imgLogo);
  }

  getSearchInput() {
    return cy.get(this.locators.searchInput);
  }

  getSearchSuggestion() {
    return cy.get(this.locators.searchSuggestion);
  }
}
