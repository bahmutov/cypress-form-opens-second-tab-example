/// <reference types="cypress" />
it('passes', () => {
  cy.visit('public/index.html')

  // the application will create the form
  // and call its submit method. Let's
  // stub the form.submit() to prevent
  cy.document().then((doc) => {
    const create = doc.createElement.bind(doc)
    cy.stub(doc, 'createElement')
      .withArgs('form')
      .callsFake(() => {
        const form = create('form')
        cy.stub(form, 'submit').as('submit')
        return form
      })
  })
  cy.contains('a', 'Open').click()
  cy.get('@submit').should('have.been.calledOnce')
  // you could confirm the form's attributes and input elements
  // by getting them from the "@submit" stub instance
})
