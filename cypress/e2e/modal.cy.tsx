/// <reference types="cypress" />
describe('modal tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'user', { fixture: 'user' });
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('http://localhost:4000/');
  });

  it('open modal on click to ingredient', () => {
    cy.get('[data-testid=ingredient]').as('ingredient');
    cy.get('@ingredient').click();
    cy.get('[data-testid=modal_header]').should('contain', 'Детали');
  });

  it('close modal from button', () => {
    cy.get('[data-testid=ingredient]').as('ingredient');
    cy.get('@ingredient').click();
    cy.get('[data-testid=modal_header]').should('contain', 'Детали');
    cy.get('[data-testid=close_modal_button').as('button');
    cy.get('@button').click();
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('close modal from overlay', () => {
    cy.get('[data-testid=ingredient]').as('ingredient');
    cy.get('@ingredient').click();
    cy.get('[data-testid=modal_header]').should('contain', 'Детали');
    cy.get('[data-testid=modal_overlay').click({ force: true });
    cy.url().should('eq', 'http://localhost:4000/');
  });
});
