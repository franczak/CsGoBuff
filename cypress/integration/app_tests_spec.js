describe('App tests', function() {

  it('Should show warning when user not steam public', function() {
    cy.visit('http://localhost:3000')
    cy.contains('agent96').click();
    cy.get('body').contains('User doesnt have public stats')
  });

  it('Shuld expand saved friends list when clicked', () => {
    cy.get('h1').contains('Recent searches').click({ force: true })
    cy.wait(1000)
    cy.get('.friends-container').contains('Goku!').should('be.visible')
    cy.get('.friends-container').contains('agent96').should('not.be.visible')
  });

  it('Should show card for user with public stats', () => {
    cy.get('.friends-container').contains('Goku!').click({ force: true })
    cy.wait(1000)
    cy.get('.user-card').then($cards => {
      expect($cards).to.have.length(1)
    })
  })

  it('Should add another user card', () => {
    cy.get('.friends-container').contains('ChauBee').click({ force: true })
    cy.wait(1000)
    cy.get('.user-card').then($cards => {
      expect($cards).to.have.length(2)
    })
  })

  it('Should expand steam friends list again', () => {
    cy.get('h1').contains('Steam friends').click({ force: true })
    cy.wait(1000)
    cy.get('.friends-container').contains('agent96').should('be.visible')
    cy.get('.friends-container').contains('Goku!').should('not.be.visible')
  })

  it('Should show stats popup when card clicked', () => {
    cy.get('.user-card').contains('Goku!').click({force: true})
    cy.get('.popup-content ').should('be.visible')
  })

  it('Should load stats from backend', () => {
    cy.wait(1000)
    cy.get('.stat-value').eq(0).should('not.be.empty')
  })

});