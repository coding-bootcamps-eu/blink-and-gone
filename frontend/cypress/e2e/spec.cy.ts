describe('burn-on-read-service', () => {
  const URL = 'http://localhost:5173/'
  beforeEach(() => {
    cy.visit(URL)
  })
  it('get title', () => {
    cy.title().should('eq', 'Blink and Gone')
  })
})
