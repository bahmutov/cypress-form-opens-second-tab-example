/// <reference types="cypress" />
it('removes the onclick attribute', () => {
  cy.visit('public/index.html')

  // the application opens the 2nd tab in response
  // to the click handler set via "onclick=..." attribute
  cy.contains('a', 'Open')
    // confirm the A element has the "onclick" attribute
    .should('have.attr', 'onclick')
  // disable the behavior by removing the "onclick" attribute
  cy.contains('a', 'Open').invoke('attr', 'onclick', '').click()
  // confirm we remain on the home screen
  cy.location('pathname').should('include', 'index.html')
})
