/// <reference types="cypress" />
it('passes', () => {
  cy.visit('public/index.html')

  cy.window().then((win) => {
    cy.stub(win, 'openNew').as('openNew')
  })
  cy.contains('a', 'Open').click()
  cy.get('@openNew')
    .should('have.been.calledOnce')
    .its('firstCall.args.0')
    .should('deep.equal', {
      target: 'test_blank',
      url: 'submitted.html',
    })
})
