describe('Empty queries, no params', () => {
    it('Check empty queries', () => {
      cy.visit('/')
    })
})
  
//   describe('Methods', () => {
//     const methods = ['POST', 'POST', 'PUT', 'DELETE','OPTIONS', 'PATCH']
//     methods.forEach(method => {
//       it(`Change the default method GET to ${method} with url query`, () => {
//         cy.visit(`/?method=${method}`)
//         cy.get('#method').contains(method)
//       })
//     })
//   })
  
//   describe('Url and path', () => {
//     it('Change default url with query and reset default path to empty string and make a request', () => {
//       cy.visit('/?url=https://api.thecatapi.com&path=')
//       cy.get('#action').contains('Send')
//       cy.get('#action').click()
//       cy.get('#response-details').contains('The Cat API')
//     })
    
//     it('Change default params and url', () => {
//       cy.visit('/?url=https://api.thecatapi.com&path=/v1/images/search')
//       cy.get('#action').contains('Send')
//       cy.get('#action').click()
//       cy.get('#response-details')
//       .contains('breeds')
//       .contains('id')
//       .contains('url')
//       .contains('width')
//       .contains('height')
//     })
//   })
  
//     describe('Authentication', () => {
//     it(`Change default auth 'None' to 'Basic' and set httpUser and httpPassword with url query`, () => {
//       cy.visit(`/?auth=Basic&httpUser=foo&httpPassword=bar`)
//       cy.get('#authentication').contains('Authentication').click()
//       cy.get('label').contains('User')
//       cy.get('#authentication')
//       // TODO: check values of au
//       //.find('input').contains('input', 'foo') // cannot get foo and bar but is passing
//     })
  
//     const base64Tkn = encodeURI(btoa('{"alg":"HS256", "typ": "JWT"}'))
  
//     it(`Change default auth 'None' to 'Bearer token' and set bearerToken with url query`, () => {
//       cy.visit(`/?auth=Bearer Token&bearerToken=${base64Tkn}`)
//       cy.get('#authentication').contains('Authentication').click()
//       cy.get('label').contains('Token')
//       // TODO: check encoded values
//     })
//   })
  
//   describe('Headers, params and bodyParams', () => {
    
//     it(`Add multiple headers objects in url query`, () => {
//       cy.visit(`/?headers=[{"foo":"bar"},{"foo1":"bar1"}]`)
//       cy.get('#headers').contains('Headers').click()
//       cy.get('label').contains('Key')
//       cy.get('label').contains('Value')
//     })
  
//     it(`Add multiple params objects in url query`, () => {
//       cy.visit(`/?params=[{"foo":"bar"},{"foo1":"bar1"}]`)
//       cy.get('#parameters').contains('Parameters').click()
//       cy.get('label').contains('Key')
//       cy.get('label').contains('Value')
//     })
  
//     it(`Add multiple bodyParams objects in POST method in url query`, () => {
//       cy.visit(`/?method=POST&bodyParams=[{"foo":"bar"},{"foo1":"bar1"}]`)
//       cy.get('#parameters').contains('Parameters').click()
//       cy.get('label').contains('Key')
//       cy.get('label').contains('Value')
//     })
//   })
  
//   describe('Content Type', () => {
//     const types = ['application/json', 'www-form/urlencoded']
//     types.forEach(type => {
//       it(`Change the default method GET to POST and set contentType to ${type} with url query`, () => {
//         cy.visit(`/?contentType=${type}&method=POST`)
//         cy.get('#main').contains('Content Type')
//         cy.get('option').contains(type)
//       })
//     })
//   })
  
//   describe('RawParams', () => {
//       it(`Set raw parameters with url query`, () => {
//         cy.visit(`/?method=POST&rawInput=true&rawParams={"foo":"bar"}`)
//       })
//   })
  