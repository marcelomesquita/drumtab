describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('/')

    cy.get('a[href*="terms"]').click()
    cy.url().should('include', '/terms')
    cy.get('h1').contains('Termos de Uso')
  })
})
