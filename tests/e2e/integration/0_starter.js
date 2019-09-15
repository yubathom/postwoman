describe('Visit home', () => {
  it('Have a page title with "Postwoman"', () => {
    cy.visit('/', { timeout: 30000 })
      .get('title')
      .should('contain','Postwoman')
  })
})
