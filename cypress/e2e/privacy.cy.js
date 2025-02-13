Cypress._.times(5, () => {
  it("test direto ao acesso a página privacy.html", () => {
    cy.visit("./src/privacy.html");

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });
});
