describe('Pet API Tests', () => {
  it('Validar se o pet v2/pet/1 tem name "doggie"', () => {
    cy.request({
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/pet/2',
      failOnStatusCode: false
    }).then((response) => {
      // Log da resposta
      cy.log(`Status code: ${response.status}`)
      cy.log(`Pet name: ${response.body.name}`)

      // Validação do status HTTP
      expect(response.status).to.eq(200)

      // Validação da estrutura JSON
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('id', 2)
      expect(response.body).to.have.property('name', 'Tom')
      expect(response.body).to.have.property('category')
      expect(response.body).to.have.property('photoUrls')
      expect(response.body).to.have.property('tags')
      expect(response.body).to.have.property('status')

      // Screenshot da resposta
      cy.screenshot('pet-1-response')
    })
  })
})