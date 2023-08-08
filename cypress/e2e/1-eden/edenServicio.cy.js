/// <reference types="cypress" />

describe("Test de SERVICIOS", () => {
  it("Verificar servicio", () => {
    cy.request(
      "GET",
      "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/inicio"
    ).then((response) => {
      cy.log(JSON.stringify(response));
      expect(response.status).to.eq(200);
    });
  });

  it("Verificar servicio 2", () => {
    cy.request({
      method: "GET",
      url: "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/inicio",
    }).then((response) => {
      cy.writeFile(`cypress/fixtures/eventos.json`, response.body);
      expect(response.status).to.eq(200);
    });
  });

  it.only("Verificar servicio 3", () => {
    cy.request({
      method: "GET",
      url: "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/inicio",
    }).then((response) => {
      cy.writeFile(`cypress/fixtures/eventos.json`, response.body);
      expect(response.status).to.eq(200);
      cy.validarScheme("eventos_schema", "eventos");
    });
  });
});
