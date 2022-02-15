/// <reference types="cypress" />

describe("Word search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("using appBar search bar", () => {
    cy.get("#appBar-search-input")
      .type("dog")
      .should("have.value", "dog")
      .type("{enter}");

    // attention! verifyPath is a custom method - look in /support/commands
    cy.verifyPath("/words/dog");

    cy.get(".word-definition").contains("dog");
  });

  it("using bottom of page search bar", () => {
    cy.get("#bottom-search-input")
      .type("cat")
      .should("have.value", "cat")
      .type("{enter}");

    // attention! verifyPath is a custom method - look in /support/commands
    cy.verifyPath("/words/cat");

    cy.get(".word-definition").contains("cat");
  });

  it("traversing throw words links", () => {
    cy.get("#bottom-search-input").type("cat").type("{enter}");

    // attention! verifyPath is a custom method - look in /support/commands
    cy.verifyPath("/words/cat");

    cy.contains("European").click();

    cy.verifyPath("/words/European");

    cy.contains("European");

    cy.contains("native").click();

    cy.verifyPath("/words/native");

    cy.get(".word-definition").contains("native");
  });
});
