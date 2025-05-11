/// <reference types="cypress" />

describe('Burger constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000/');
  });

  it('add ingredient', () => {
    cy.get('.common_button').as('button');
    cy.get('@button').click();
    cy.get('.constructor-element.constructor-element_pos_top').should(
      'contain',
      'Мощная'
    );
    cy.get('.constructor-element.constructor-element_pos_bottom').should(
      'contain',
      'Мощная'
    );
  });
});
