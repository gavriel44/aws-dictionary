/// <reference types="cypress" />

describe("AppBar buttons test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#bottom-search-input").type("cat").type("{enter}");
  });

  it("home button returns home", () => {
    cy.get("#home-appBar-button").click();

    cy.verifyPath("/");
  });

  it("history button goes to history", () => {
    cy.contains("cat");

    cy.get("#history-appBar-button").click();

    cy.verifyPath("/words");
    cy.contains("cat");
  });
});
