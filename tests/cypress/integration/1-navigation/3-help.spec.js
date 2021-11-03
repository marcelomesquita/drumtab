describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('/')

    cy.get('a[href*="help"]').click()
    cy.url().should('include', '/help')
    cy.get('h1').contains('Ajuda')
  })
})
