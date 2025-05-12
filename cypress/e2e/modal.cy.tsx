/// <reference types="cypress" />
describe('modal tests', () => {
  const baseUrl = 'http://localhost:4000/';
  const ingredient = '[data-testid=ingredient]';
  const modalHeader = '[data-testid=modal_header]';
  beforeEach(() => {
    cy.intercept('GET', 'user', { fixture: 'user' });
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
  });

  it('open modal on click to ingredient', () => {
    cy.get(ingredient).as('ingredient');
    cy.get('@ingredient').click();
    cy.get(modalHeader).should('contain', 'Детали');
  });

  it('close modal from button', () => {
    cy.get(ingredient).as('ingredient');
    cy.get('@ingredient').click();
    cy.get(modalHeader).should('contain', 'Детали');
    cy.get('[data-testid=close_modal_button]').as('button');
    cy.get('@button').click();
    cy.url().should('eq', baseUrl);
  });

  it('close modal from overlay', () => {
    cy.get(ingredient).as('ingredient');
    cy.get('@ingredient').click();
    cy.get(modalHeader).should('contain', 'Детали');
    cy.get('[data-testid=modal_overlay]').click({ force: true });
    cy.url().should('eq', baseUrl);
  });
});
