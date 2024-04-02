describe('burn-on-read-service', () => {
  const URL = 'http://localhost:5173/'
  beforeEach(() => {
    cy.visit(URL)
  })
  it('get title', () => {
    cy.title().should('eq', 'Blink and Gone')
  })
  it('post message', () => {
    cy.get('#secmess')
      .should('have.attr', 'placeholder', 'Enter your secret message here...')
      .type('Das ist ein automatisierter Test')
      .should('have.value', 'Das ist ein automatisierter Test')
    cy.get('button').click()
    cy.get('#secmess').should('have.value', '')
    cy.request('GET', 'http://localhost:3000/data').then((response: any) => {
      expect(response.status).to.eq(200)
    })
  })
})
