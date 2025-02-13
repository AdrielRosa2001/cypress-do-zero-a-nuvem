Cypress.Commands.add(
  "fillMandatoryFields",
  (
    data = {
      firstName: "Jhon",
      lastName: "Doe",
      email: "jhondoe@example.com",
      text: "Text.",
    }
  ) => {
    cy.get("#firstName").type(data.firstName, { delay: 0 });
    cy.get("#lastName").type(data.lastName, { delay: 0 });
    cy.get("#email").type(data.email, { delay: 0 });
    cy.get("#open-text-area").type(data.text, {
      delay: 0,
    });
  }
);
Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  (
    data = {
      firstName: "Jhon",
      lastName: "Doe",
      email: "jhondoe@example.com",
      text: "Text.",
    }
  ) => {
    cy.get("#firstName").type(data.firstName, { delay: 0 });
    cy.get("#lastName").type(data.lastName, { delay: 0 });
    cy.get("#email").type(data.email, { delay: 0 });
    cy.get("#open-text-area").type(data.text, {
      delay: 0,
    });
    cy.get('button[type="submit"]').click();
  }
);

Cypress.Commands.add(
  "fillMandatoryFieldsWithPhoneAndSubmit",
  (
    data = {
      firstName: "Jhon",
      lastName: "Doe",
      email: "jhondoe@example.com",
      phone: "84988888888",
      text: "Text.",
    }
  ) => {
    cy.get("#firstName").type(data.firstName, { delay: 0 });
    cy.get("#lastName").type(data.lastName, { delay: 0 });
    cy.get("#email").type(data.email, { delay: 0 });
    cy.get("#phone").type(data.phone, { delay: 0 });
    cy.get("#open-text-area").type(data.text, {
      delay: 0,
    });
    cy.get('button[type="submit"]').click();
  }
);

Cypress.Commands.add(
  "fillMandatoryFieldsEmailErrorAndSubmit",
  (
    data = {
      firstName: "Jhon",
      lastName: "Doe",
      email: "jhondoe@example,com",
      text: "Text.",
    }
  ) => {
    cy.get("#firstName").type(data.firstName, { delay: 0 });
    cy.get("#lastName").type(data.lastName, { delay: 0 });
    cy.get("#email").type(data.email, { delay: 0 });
    cy.get("#open-text-area").type(data.text, {
      delay: 0,
    });
    cy.get('button[type="submit"]').click();
  }
);

Cypress.Commands.add(
  "fillMandatoryFieldsPhoneErrorAndSubmit",
  (
    data = {
      firstName: "Jhon",
      lastName: "Doe",
      email: "jhondoe@example,com",
      phone: "asdf",
      text: "Text.",
    }
  ) => {
    cy.get("#firstName").type(data.firstName, { delay: 0 });
    cy.get("#lastName").type(data.lastName, { delay: 0 });
    cy.get("#email").type(data.email, { delay: 0 });
    cy.get("#phone").type(data.phone, { delay: 0 });
    cy.get("#open-text-area").type(data.text, {
      delay: 0,
    });
    cy.get('button[type="submit"]').click();
  }
);
