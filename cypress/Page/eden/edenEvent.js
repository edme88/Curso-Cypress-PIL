/// <reference types="cypress" />

class EdenEventLocators {
  constructor() {
    this.eventTitle = ".fechas-funciones span";
  }
}

export default class EdenEvent {
  constructor() {
    this.locators = new EdenEventLocators();
  }

  getEventTitle() {
    return cy.get(this.locators.eventTitle).first();
  }
}
