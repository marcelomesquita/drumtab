describe('Navigation', () => {
  it('should navigate to the musics page', () => {
    cy.visit('/')

    cy.get('header .navbar-burger').click()
    cy.get('header a[href="/samples"]').click()
    cy.url().should('include', '/samples')
    cy.get('h1').contains('Samples')
  })
})
