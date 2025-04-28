describe('API Tests', () => {
  it('should return 200 OK when accessing the root endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
  it('should return 200 OK when accessing the blogs endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/blogs',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
  it('should return 200 OK when accessing the blogs endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/blogs',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
  it('should return 201 when blog is created', () => {
    cy.request({
      method: 'POST',
      url: '/blogs',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46cXdlcnR5'
      },    
      body: {
        name: 'Test Blog',
        description: 'Test Description',
        websiteUrl: 'https://test.com'
      }
    }).then((response) => {
      expect(response.status).to.equal(201)
    })
  })
}) 