// Export an empty object to make this file a module
export {}

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      // Add your custom commands here
      // Example:
      // login(email: string, password: string): Chainable<void>
    }
  }
}

// Example custom command
// Cypress.Commands.add('login', (email: string, password: string) => {
//   cy.visit('/login')
//   cy.get('[data-cy=email]').type(email)
//   cy.get('[data-cy=password]').type(password)
//   cy.get('[data-cy=submit]').click()
// }) 