/// <reference types="cypress" />

describe("Test sobre la página de YVYTU", () => {
  beforeEach(() => {
    cy.visit("https://vientosdelaselva.com.ar/");
  });
  it("Verificar Texto Principal", () => {
    const subtitle =
      "\n              Conocé la selva paranaense desde el corazón \n              del área de mayor biodiversidad de Argentina.\n            ";
    cy.get("h1").should("have.text", "Reserva Yvytu");
    cy.get("h2").first().should("have.text", subtitle);
  });

  it("Ejemplo de cambio", () => {
    cy.log("Ejemplo de test vacio!");
  });
});
