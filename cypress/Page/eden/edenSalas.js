class EdenSalas {
  getSalasBlock() {
    return cy.get('[id^="salasParent_"]');
  }

  getSalasTitle() {
    return cy.get('[id^="salasParent_"] .desc-punto-venta span:nth-of-type(2)');
  }

  getSalasPuntoDeVenta() {
    return cy.get('[id^="salasParent_"] .desc-punto-venta');
  }
}

export default new EdenSalas();
