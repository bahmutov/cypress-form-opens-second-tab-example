/// <reference types="cypress" />
it('passes', () => {
  cy.visit('public/index.html')

  // before clicking on the link, stub the Document.createElement
  // and if the user is trying to create a new form, stub its
  // property "target" to not allow opening new tabs; always have it at "_self"
  cy.document().then((doc) => {
    const create = doc.createElement.bind(doc)
    cy.stub(doc, 'createElement').callsFake((name) => {
      if (name === 'form') {
        const form = create('form')
        cy.stub(form, 'target').value('_self')
        // Also spy on the instance method "submit"
        // so that later we can validate the submitted form
        cy.spy(form, 'submit').as('submit')
        return form
      } else {
        return create(name)
      }
    })
  })

  // spy on the network call to submit the form
  cy.intercept({
    method: 'GET',
    pathname: 'submitted.html',
  }).as('submitted')

  // click on the link and confirm the form
  // has loaded in the current tab
  cy.contains('a', 'Open').click()
  cy.contains('Thank you')

  // verify the network call to submit the form
  // has the expected URL search parameters
  cy.wait('@submitted')
    .its('request.url')
    .then((url) => {
      const parsed = new URL(url)
      return parsed.searchParams
    })
    // the form submits the field "firstName=Joe"
    .invoke('get', 'firstName')
    .should('equal', 'Joe')

  // grab the form's submit call
  // to get back to the form and its input elements
  cy.get('@submit')
    .should('have.been.calledOnce')
    .its('firstCall.thisValue.elements')
    // the form's HTML elements include every input element
    .then((elements) => {
      // we can validate the form's first name input element
      // has the expected value set by the application' code
      expect(elements.namedItem('firstName'), 'first name').to.have.value('Joe')
    })
})
