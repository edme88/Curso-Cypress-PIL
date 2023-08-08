/// <reference types="cypress" />
//Forma del PageObject tipo 1
import EdenHome from "../../Page/edenHome";
import EdenHeader from "../../Page/edenHeader";
import EdenEvent from "../../Page/edenEvent";
const edenHome = new EdenHome();
const edenHeader = new EdenHeader();
const edenEvent = new EdenEvent();
//Forma del PageObject Tipo 2
const edenSalas = require("../../Page/edenSalas");

describe("Test sobre la página de EDEN ENTRADAS", () => {
  beforeEach(() => {
    let viewDevice;
    if (Cypress.env("type") != "mobile") {
      viewDevice = Cypress.env("viewportdesktop").device;
    } else {
      viewDevice = Cypress.env("viewportmobile").device;
    }
    cy.log(`**${JSON.stringify(viewDevice)}**`);
    cy.viewport(viewDevice);
    cy.visit("/");
  });
  it("Verificar subtitulos", () => {
    edenHome.getSubTitles().first().should("contain.text", "BUSCAR EVENTO");
    edenHome
      .getSubTitles()
      .last()
      .should("contain.text", "CALENDARIO DE EVENTOS");
  });

  it("Verificar Menu", { tags: "@regression" }, () => {
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

  it(
    "Verificar pagina de recitales",
    { tags: ["@regression", "@smoke"] },
    () => {
      const newUrl = `${Cypress.config().baseUrl}sitio/contenido/recitales`;
      edenHeader.getMenuButtons().contains("RECITALES").click();
      cy.url().should("eq", newUrl);
      cy.url().should("include", "/sitio/contenido/recitales");
    }
  );

  it("Logo", () => {
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

    cy.log(nombreMesActual); // Por ejemplo, "Agosto"
    cy.log(anioActual); // Por ejemplo, "2023"
    cy.log(diaActual); // Por ejemplo, "4"
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
          cy.log(`El día ${$inx} es no seleccionable`);
        }
      });
  });

  it("Buscador Nuevo", () => {
    edenHeader.getSearchInput().type("Experiencia");
  });

  it("Verificar pagina de Salas", () => {
    const arrSalas = [
      "Plaza de La Música",
      "Sala del Rey",
      "Refugio Guernica",
      "Captain Blue XL",
      "Teatro Cultural Cañada",
      "Sala Agustín Tosco – Luz y Fuerza - Bº Centro",
      "Sala de Las Américas",
      "Studio Theater",
      "Casa Babylon",
    ];
    edenHeader.getMenuButtons().contains("SALAS").click();

    //Validación ITERANDO en ARRAY
    arrSalas.forEach((titleInArray, $inx) => {
      cy.log(`Itero en el titulo ${$inx}: ${titleInArray}`);
      edenSalas.getSalasBlock().eq($inx).should("be.visible");
      edenSalas.getSalasTitle().eq($inx).should("have.text", titleInArray);
    });

    //Validación ITERANDO en ELEMENTOS
    edenSalas.getSalasBlock().each((block, $inx) => {
      cy.log(`Itero en el elemento ${$inx}: ${block}`);
      cy.wrap(block).should("be.visible");
      edenSalas.getSalasTitle().eq($inx).should("have.text", arrSalas[$inx]);
    });
  });

  it("Verificar salas completo", () => {
    edenHeader.getMenuButtons().contains("SALAS").click();

    cy.fixture(`salas.json`).then((file) => {
      //Validación ITERANDO en ELEMENTOS
      file.forEach((salaData, $inx) => {
        edenSalas.getSalasBlock().eq($inx).should("be.visible");
        edenSalas.getSalasTitle().eq($inx).should("have.text", salaData.title);
        edenSalas
          .getSalasPuntoDeVenta()
          .eq($inx)
          .should("contain.text", salaData.address);
      });
    });
  });
});
