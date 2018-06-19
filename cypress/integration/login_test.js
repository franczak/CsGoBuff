describe('App tests', function() {
  it('Should show warning when user not steam public', function() {
    cy.visit('http://localhost:3000')
    cy.contains('agent96').click();
    cy.get('body').contains('User doesnt have public stats')
  })
})