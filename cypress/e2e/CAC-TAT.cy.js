describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equals", "Central de Atendimento ao Cliente TAT");
  });

  it("Preenche os campos obrigatórios e envia o formulário", () => {
    cy.clock();
    const long_text = Cypress._.repeat("abcdefghijqlmnopqrstuvwxyz", 10);
    cy.get("#firstName").type("Adriel Rosa", { delay: 0 });
    cy.get("#lastName").type("da Silva", { delay: 0 });
    cy.get("#email").type("adrielrosa@teste.com", { delay: 0 });
    cy.get("#open-text-area").type(long_text, {
      delay: 0,
    });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
    cy.tick(3000);
    cy.get(".success").should("not.be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();
    cy.fillMandatoryFieldsEmailErrorAndSubmit();

    cy.get(".error").should("be.visible");
    cy.tick(3000);
    cy.get(".error").should("not.be.visible");
  });

  it("Valida se o valor digitado no campo de telefone é um numero", () => {
    cy.get("#phone").type("abcde").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.clock();
    cy.fillMandatoryFields();
    cy.get("#phone-checkbox").check();
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
    cy.tick(3000);
    cy.get(".error").should("not.be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .as("f_name")
      .type("Adriel", { delay: 0 })
      .should("have.value", "Adriel");
    cy.get("#lastName")
      .as("l_name")
      .type("Rosa", { delay: 0 })
      .should("have.value", "Rosa");
    cy.get("#email")
      .as("email")
      .type("adrielrosa@teste.com", { delay: 0 })
      .should("have.value", "adrielrosa@teste.com");
    cy.get("#phone")
      .as("phone")
      .type("84999999999")
      .should("have.value", "84999999999");

    cy.get("@f_name").clear().should("have.value", "");
    cy.get("@l_name").clear().should("have.value", "");
    cy.get("@email").clear().should("have.value", "");
    cy.get("@phone").clear().should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.clock();
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
    cy.tick(3000);
    cy.get(".error").should("not.be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
    cy.tick(3000);
    cy.get(".success").should("not.be.visible");
  });

  it("Seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("Seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("Seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked", "true");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]').check().should("be.checked");

    cy.get('input[type="checkbox"]').last().uncheck().should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();

    cy.contains("h1", "CAC TAT - Política de Privacidad").should("be.visible");
  });

  it("testa a página da política de privacidade de forma independente", () => {
    cy.visit("./src/privacy.html");

    cy.contains("h1", "CAC TAT - Política de Privacidad").should("be.visible");
  });

  it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche o campo da área de texto usando o comando invoke", () => {
    cy.get("#open-text-area")
      .invoke("val", "um texto qualquer")
      .should("have.value", "um texto qualquer");
  });

  it("faz uma requisição HTTP", () => {
    cy.request("https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html")
      .as("getRequest")
      .its("status")
      .should("be.equal", 200);
    cy.get("@getRequest").its("statusText").should("be.equals", "OK");
    cy.get("@getRequest").its("body").should("include", "CAC TAT");
  });

  it("Encontrando o gato escondido", () => {
    cy.get('span[id="cat"]').invoke("show").should("be.visible").invoke("hide");
    cy.get("#title").invoke("text", "CAT TAT");
  });
});
