/// <reference types="cypress" />
it('passes', () => {
  cy.visit('public/index.html')

  // the application internally calls
  // the "window.openNew" method
  // we can stub it using the cy.stub command
  cy.window().then((win) => {
    cy.stub(win, 'openNew').as('openNew')
  })
  cy.contains('a', 'Open').click()
  // and confirm the stub was called as expected
  cy.get('@openNew')
    .should('have.been.calledOnce')
    .its('firstCall.args.0')
    .should('deep.equal', {
      target: 'test_blank',
      url: 'submitted.html',
    })
})
