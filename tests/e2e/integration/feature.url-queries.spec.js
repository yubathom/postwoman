describe('Methods', () => {
  const methods = [ 'POST', 'PUT']
  methods.forEach((method) => {
      it(`Change the default method GET to ${method} with url query`, () => {
        cy.visit(`/?method=${method}`)
          .get('#method').should('have.value', method)
      })
  })
})

describe('Authentication', () => {
  it(`Change default auth 'None' to 'Basic' and set httpUser and httpPassword with url query`, () => {
    cy.visit(`?&auth=Basic Auth&httpUser=foo&httpPassword=bar`, { retryOnStatusCodeFailure: true })
      .get('#auth').contains('Basic Auth').click({ force: true })
        .then(() => {
          cy.get('input[name="http_basic_user"]', { timeout: 500 })
            .invoke('val')
            .then((user) => {
              expect(user === 'foo').to.equal(true)
              cy.log('Success! user === foo')
            })

          cy.get('input[name="http_basic_passwd"]')
            .invoke('val')
            .then((user) => {
              expect(user === 'bar').to.equal(true)
              cy.log('Success! password === bar')
            })
        })
  })

  const base64Tkn = encodeURI(btoa('{"alg":"HS256", "typ": "JWT"}'))

  it(`Change default auth 'None' to 'Bearer token' and set bearerToken with url query`, () => {
    cy.visit(`/?auth=Bearer Token&bearerToken=${base64Tkn}`, { retryOnStatusCodeFailure: true })
        .get('#auth').contains('Bearer Token').click({ force: true })
          .then(() => {
            cy.get('input[name="bearer_token"]', { timeout: 500 })
              .invoke('val')
              .then((tkn) => {
                expect(tkn === base64Tkn).to.equal(true)
                cy.log(`Success! input[name="bearer_token"] === ${base64Tkn}`)
              })
          })
  })
})
