declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginBySupabaseApi(): Chainable<void>;
  }
}