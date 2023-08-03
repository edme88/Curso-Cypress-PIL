/// <reference types="cypress" />

class EdenHomeLocators {
  constructor() {
    this.subTitles = "h5";
    this.calendar = ".ui-datepicker-calendar";
    this.calendarTitle = ".ui-datepicker-title";
    this.calendarDays = "tbody .ui-state-default";
  }
}

export default class EdenHome {
  constructor() {
    this.locators = new EdenHomeLocators();
  }

  getSubTitles() {
    return cy.get(this.locators.subTitles);
  }

  getCalendar(){
    return cy.get(this.locators.calendar);
  }

  getCalendarTitle(){
    return cy.get(this.locators.calendarTitle);
  }

  getCalendarDays(){
    return cy.get(this.locators.calendarDays);
  }
}
