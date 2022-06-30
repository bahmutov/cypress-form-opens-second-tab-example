/// <reference types="cypress" />
// clicking on the link opens another browser window
it.skip('opens 2nd browser window', () => {
  cy.visit('public/index.html')
  cy.contains('a', 'Open').click()
})
