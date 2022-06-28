/// <reference types="cypress" />
it('removes the onclick attribute', () => {
  cy.visit('public/index.html')

  // the application opens the 2nd tab in response
  // to the click handler set via "onclick=..." attribute
  // disable the behavior by removing the "onclick" attribute
  cy.contains('a', 'Open').invoke('attr', 'onclick', '').click()
})
