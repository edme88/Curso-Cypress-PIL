// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const Ajv = require("ajv");
const ajv = new Ajv();

Cypress.Commands.add("openWeb", () => {
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

Cypress.Commands.add("validarScheme", (schemaJson, servicioJson) => {
  cy.fixture(`schemas/${schemaJson}.json`).then((schema) => {
    //cy.log(JSON.stringify(schema));
    const validate = ajv.compile(schema);

    cy.fixture(`${servicioJson}.json`).then((servJson) => {
      //cy.log(JSON.stringify(servJson));
      const data = servJson;

      const valid = validate(data);
      if (!valid) {
        cy.log(validate.errors);
      } else {
        cy.log(`La respuesta del servicio posee los tipos de datos correctos`);
      }
    });
  });
});

Cypress.Commands.add("serviceCall", (metodo, urly, fileName, schemaName) => {
  cy.request({
    method: metodo,
    url: urly,
  }).then((response) => {
    cy.writeFile(`cypress/fixtures/${fileName}.json`, response.body);
    expect(response.status).to.eq(200);
    cy.validarScheme(schemaName, fileName);
  });
});
