describe('burn-on-read-service tests', () => {
  const URL = 'http://localhost:5173/'
  it('get title', () => {
    cy.visit(URL)
    cy.title().should('eq', 'Blink and Gone')
  })
  it('post message and get success-feedback', () => {
    cy.visit(URL)
    cy.get('#secmess')
      .should('have.attr', 'placeholder', 'Enter your secret message here...')
      .type('Das ist ein automatisierter Test')
      .should('have.value', 'Das ist ein automatisierter Test')
    cy.get('button').click()
    cy.get('#secmess').should('have.value', '')
    cy.get('.link').should('exist')
    cy.get('a').invoke('text').as('link')
    cy.get('@link').then((link) => {
      cy.visit(`${link}`)
    })
    cy.get('button').click()
  })
  it('display error message', () => {
    cy.visit(URL)
    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:3000/messages/new'
      },
      (req) => {
        req.destroy()
      }
    ).as('failed')
    cy.get('#secmess').type('Das ist ein automatisierter Test')
    cy.get('button').click()
    cy.wait('@failed')
    cy.get('.text').should(
      'have.text',
      'Unfortunately, an error occurred with the desired function. Please try again in a few minutes.'
    )
  })
  it('read message, burn message', () => {
    cy.visit(URL)
    cy.get('#secmess').type('Das ist ein automatisierter Test')
    cy.get('button').click()
    cy.get('a').invoke('text').as('link')
    cy.get('@link').then((link) => {
      cy.visit(`${link}`)
    })
    cy.get('h2').should('have.text', 'Your secret message')
    cy.get('button').click()
    cy.get('.text').should('have.text', 'Das ist ein automatisierter Test')
    cy.reload()
    cy.get('button').click()
    cy.get('.text').should(
      'have.text',
      'An error has occurred. Either the message you requested does not exist or it has already been read and therefore deleted.'
    )
  })
  it('error: no message found', () => {
    cy.visit(URL + 'messages/123')
    cy.get('button').click()
    cy.get('.text').should(
      'have.text',
      'An error has occurred. Either the message you requested does not exist or it has already been read and therefore deleted.'
    )
  })
})
