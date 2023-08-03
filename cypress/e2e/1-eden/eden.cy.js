/// <reference types="cypress" />
import EdenHome from "../../Page/edenHome";
import EdenHeader from "../../Page/edenHeader";
import EdenEvent from "../../Page/edenEvent";
const edenHome = new EdenHome();
const edenHeader = new EdenHeader();
const edenEvent = new EdenEvent();

describe("Test sobre la página de EDEN ENTRADAS", () => {
  it("Verificar subtitulos", () => {
    cy.visit("https://www.edenentradas.com.ar/");
    edenHome.getSubTitles().first().should("contain.text", "BUSCAR EVENTO");
    edenHome
      .getSubTitles()
      .last()
      .should("contain.text", "CALENDARIO DE EVENTOS");
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
    edenHeader.getMenuButtons().each((button, inx) => {
      cy.wrap(button).should("contain.text", menuBtn[inx]);
    });
  });

  it("Verificar pagina de recitales", () => {
    const newUrl = "https://www.edenentradas.com.ar/sitio/contenido/recitales";

    cy.visit("https://www.edenentradas.com.ar/");
    edenHeader.getMenuButtons().contains("RECITALES").click();
    cy.url().should("eq", newUrl);
    cy.url().should("include", "/sitio/contenido/recitales");
  });

  it("Logo", () => {
    cy.visit("https://www.edenentradas.com.ar/");
    edenHeader
      .getImgLogo()
      .should(
        "have.attr",
        "src",
        "https://static.edenentradas.com.ar/sitio/images/logo.gif"
      );
    edenHeader.getImgLogo().should("have.attr", "alt", "EdenEntradas");
    edenHeader
      .getImgLogo()
      .should("be.visible")
      .and("have.prop", "naturalHeight")
      .and("be.greaterThan", 0);
  });

  it("Buscador", () => {
    cy.visit("https://www.edenentradas.com.ar/");
    edenHeader.getSearchInput().type("Queen");
    edenHeader.getSearchSuggestion().contains("Queen").click();
    edenEvent
      .getEventTitle()
      .should(
        "have.text",
        'Experiencia Queen "Champions of the World Tour 23" '
      );
  });

  it("Calendario", () => {
    cy.visit("https://www.edenentradas.com.ar/");
    const nombresMeses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const anioActual = fechaActual.getFullYear();
    const nombreMesActual = nombresMeses[mesActual];
    const diaActual = fechaActual.getDate();

    cy.log(nombreMesActual); // Por ejemplo, "julio"
    cy.log(anioActual); // Por ejemplo, "2023"
    cy.log(diaActual); // Por ejemplo, "31"
    edenHome.getCalendarTitle().should("contain.text", nombreMesActual);
    edenHome.getCalendarTitle().should("contain.text", anioActual);

    edenHome
      .getCalendar()
      .find("td")
      .each((cuadradoDia, $inx) => {
        if ($inx < diaActual) {
          cy.wrap(cuadradoDia).should(
            "have.class",
            "ui-datepicker-unselectable ui-state-disabled"
          );
        }
      });
  });

  it("Buscador Nuevo", () => {
    cy.visit("https://www.edenentradas.com.ar/");
    edenHeader.getSearchInput().type("Experiencia");
  });
});
