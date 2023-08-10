/// <reference types="cypress" />

describe("Test de SERVICIOS", () => {
  it("Verificar servicio Inicio - 200", () => {
    cy.request(
      "GET",
      "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/inicio"
    ).then((response) => {
      cy.log(JSON.stringify(response));
      expect(response.status).to.eq(200);
    });
  });

  it("Verificar servicio 2 - Inicio ver guardar response", () => {
    cy.request({
      method: "GET",
      url: "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/inicio",
    }).then((response) => {
      cy.writeFile(`cypress/fixtures/eventos.json`, response.body);
      expect(response.status).to.eq(200);
    });
  });

  it("Verificar servicio 3 - Inicio comparar response", () => {
    cy.request({
      method: "GET",
      url: "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/inicio",
    }).then((response) => {
      cy.writeFile(`cypress/fixtures/eventos.json`, response.body);
      expect(response.status).to.eq(200);
      cy.validarScheme("eventos_schema", "eventos");
    });
  });

  it("Verificar servicio 4 - salas", () => {
    cy.request({
      method: "GET",
      url: "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/salas",
    }).then((response) => {
      cy.writeFile(`cypress/fixtures/salas.json`, response.body);
      expect(response.status).to.eq(200);
      cy.validarScheme("salas_schema", "salas");
    });
  });

  it("Verificar servicio 3 - inicio Usando commands", () => {
    const url =
      "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/inicio";
    cy.serviceCall("GET", url, "eventos", "eventos_schema");
  });

  it("Verificar servicio 4 - salas usando commands", () => {
    cy.serviceCall(
      "GET",
      "https://edenapi.edenentradas.com.ar/edenventarestapi2/api/contenido/salas",
      "salas",
      "salas_schema"
    );
  });
});
