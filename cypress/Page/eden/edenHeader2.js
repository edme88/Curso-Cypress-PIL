class EdenHeader2 {
  getMenuButtons() {
    return cy.get("#navbar a");
  }

  getImgLogo() {
    return cy.get("#header-logo");
  }
}

export default new EdenHeader2();
