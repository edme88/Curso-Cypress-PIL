/// <reference types="cypress" />
const edenHome2 = require("../../Page/edenHome2");
const edenHeader2 = require("../../Page/edenHeader2");

describe("Test sobre la página de EDEN ENTRADAS", () => {
  it("Verificar subtitulos", () => {
    cy.visit("https://www.edenentradas.com.ar/");

    const txtBuscar = "BUSCAR EVENTO";
    const txtCalendar = "CALENDARIO DE EVENTOS";
    edenHome2.getSubTitles().first().should("contain.text", txtBuscar);
    edenHome2.getSubTitles().last().should("contain.text", txtCalendar);
  });

  it("Verificar Menu", () => {
    cy.visit("https://www.edenentradas.com.ar/");

    const menuBtn = [
      "HOME",
      "TODOS",
      "AGENDA DEL FINDE",
      "RECITALES",
      "TEATROS",
      "CUARTETOS",
      "FESTIVALES",
      "SALAS",
    ];

    edenHeader2.getMenuButtons().each((button, inx) => {
      cy.wrap(button).should("contain.text", menuBtn[inx]);
    });
  });

  it("Verificar pagina de recitales", () => {
    cy.visit("https://www.edenentradas.com.ar/");
    edenHeader2.getMenuButtons().eq(3).click();
  });

  it("Verificar pagina de recitales", () => {
    cy.visit("https://www.edenentradas.com.ar/");

    const newUrl = "https://www.edenentradas.com.ar/sitio/contenido/recitales";
    edenHeader2.getMenuButtons().contains("RECITALES").click();
    cy.url().should("eq", newUrl);
    cy.url().should("include", "/sitio/contenido/recitales");
  });

  it("Logo", () => {
    cy.visit("https://www.edenentradas.com.ar/");

    const imgSrc = "https://static.edenentradas.com.ar/sitio/images/logo.gif";
    edenHeader2.getImgLogo().should("have.attr", "src", imgSrc);
    edenHeader2.getImgLogo().should("have.attr", "alt", "EdenEntradas");
  });
});
