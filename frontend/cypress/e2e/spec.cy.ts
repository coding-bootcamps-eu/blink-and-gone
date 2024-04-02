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
  it('show message', () => {
    cy.visit(URL + 'messages/1')
    cy.get('button').click()
    cy.get('p').should('have.text', 'das ist ein Test')
  })
  it('display error message', () => {
    cy.visit(URL + 'messages/2')
    cy.get('button').click()
    cy.get('p').should(
      'have.text',
      ' Es ist ein Fehler aufgetreten. Entweder existiert die von Ihnen angeforderte Nachricht nicht oder sie wurde bereits gelesen und somit gelöscht. '
    )
  })
})
