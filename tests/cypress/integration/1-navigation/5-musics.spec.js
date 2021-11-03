describe('Navigation', () => {
  it('should navigate to the musics page', () => {
    cy.visit('/')

    cy.get('header .navbar-burger').click()
    cy.get('header a[href="/musics"]').click()
    cy.url().should('include', '/musics')
    cy.get('h1').contains('Músicas')
  })
})
