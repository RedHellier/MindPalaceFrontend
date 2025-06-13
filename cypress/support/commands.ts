/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import { createClient } from '@supabase/supabase-js';
import type { AuthResponse } from '@supabase/supabase-js';

Cypress.Commands.add('loginBySupabaseApi', () => {
  const supabaseUrl = 'https://wkstbehsenrlwhtaqfgq.supabase.co';
  const supabaseKey = Cypress.env('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  const supabase = createClient(supabaseUrl, supabaseKey);

  cy.wrap(
    supabase.auth.signInWithPassword({
      email: 'a@gmail.com',
      password: Cypress.env('PASSWORD_FOR_USER_A')
    })
  ).then((response) => {
    const authResponse = response as AuthResponse;
    expect(authResponse.error).to.be.null;
    expect(authResponse.data.session).to.not.be.null;
  });
});

// Cypress.Commands.add('loginBySupabaseApi', () => {
//   cy.request({
//     method: 'POST',
//     url: 'https://wkstbehsenrlwhtaqfgq.supabase.co/auth/v1/token?grant_type=password',
//     headers: {
//       apiKey: Cypress.env('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
//       'Content-Type': 'application/json'
//     },
//     body: {
//       email: 'a@gmail.com',
//       password: Cypress.env('PASSWORD_FOR_USER_A')
//     }
//   }).then(({ body }) => {
//     const { access_token, refresh_token, expires_in, token_type, user } = body;

//     const authData = {
//       currentSession: {
//         access_token,
//         refresh_token,
//         expires_in,
//         token_type,
//         user,
//       },
//       expiresAt: Math.floor(Date.now() / 1000) + expires_in
//     };

//     const projectUrl = 'wkstbehsenrlwhtaqfgq';
//     window.localStorage.setItem(
//       `supabase.auth.token.${projectUrl}`,
//       JSON.stringify(authData)
//     );
//   });
// });