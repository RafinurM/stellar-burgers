/// <reference types="cypress" />
describe('orders tests', () => {
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

  it('burger construct', () => {
    cy.get('.common_button').as('button');
    cy.get('@button').click();
    cy.get('[data-testid=create_order_button]').click();
    cy.intercept('POST', 'orders', {
      ingredients: ['test_id_bun', 'test_id_bun2']
    });
    cy.intercept('POST', 'orders', { fixture: 'order' }).as('order');
    cy.wait('@order').its('response.statusCode').should('eq', 200);
    cy.get('[data-testid=order_id]').should('contain', '1');
    cy.get('[data-testid=close_modal_button').as('button');
    cy.get('@button').click();
    cy.get('[data-testid=constructor_top]').should('contain', 'Выберите');
    cy.get('[data-testid=constructor_ingredients]').should(
      'contain',
      'Выберите'
    );
    cy.get('[data-testid=constructor_bottom]').should('contain', 'Выберите');
  });
});
