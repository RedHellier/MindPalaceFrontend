
describe('Login Tests', () => {

  const baseUrl = 'http://localhost:3000';
  const signinUrl = `${baseUrl}/auth/signin`;

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.url().should('include', '/auth/signin');
  });

  it('Successful Login - correct credentials', () => {
    cy.get('input#email').type('a@gmail.com');
    cy.get('input#password').type('12345');

    cy.contains('Sign In').click();

    cy.url().should('include', '/topics', { timeout: 10000 });  // wait up to 10 sec
  });

  const invalidLoginCases = [
    {
      description: 'Incorrect password for existing user',
      email: 'a@gmail.com',
      password: 'wrongPassword',
      alert: 'Login failed: Invalid login credentials'
    },
    {
      description: 'Non-existing user',
      email: 'nonexistinguser@gmail.com',
      password: 'anyPassword',
      alert: 'Login failed: Invalid login credentials'
    },
  ];

  invalidLoginCases.forEach(({ description, email, password, alert }) => {
    it(`Unsuccessful Login - ${description}`, () => {
      cy.get('input#email').type(email);
      cy.get('input#password').type(password);
      cy.contains('Sign In').click();

      cy.on('window:alert', (text) => {
        expect(text).to.contain(alert);
      });

      cy.url().should('include', '/auth/signin');
    });
  });

  const validationCases = [
    {
      description: 'Empty email',
      email: '',
      password: 'somePassword',
      error: 'Email and password are required.'
    },
    {
      description: 'Empty password',
      email: 'a@gmail.com',
      password: '',
      error: 'Email and password are required.'
    },
    {
      description: 'Empty email and password',
      email: '',
      password: '',
      error: 'Email and password are required.'
    }
  ];

  validationCases.forEach(({ description, email, password, error }) => {
    it(`Unsuccessful Login - ${description}`, () => {
      if (email) cy.get('input#email').type(email);
      if (password) cy.get('input#password').type(password);

      cy.get('[data-cy=login-form]').then(($form) => {
      const form = $form[0] as HTMLFormElement;
      expect(form.checkValidity()).to.be.false;
      });

      //browser prevents form submission with a tooltip "please fill this field" because email, password are set to required.
      cy.contains('Sign In').click();

      // Confirm URL stays the same (form not submitted)
      cy.url().should('include', '/auth/signin');
    });
  });

});