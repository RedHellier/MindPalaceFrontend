describe('Topics Flow - Create and Delete Topics', () => {
  beforeEach(() => {
    cy.loginBySupabaseApi();
    cy.visit('http://localhost:3000/topics');
  });

  const newTopicCases = [
    { topic : "TopicA"},
    { topic : "Topic B"}
  ];

  newTopicCases.forEach(({topic}) => {
  it(`create topics - ${topic}`, () => {
    // Create first topic
    cy.get('[data-cy=create-topic-btn]').click();
    cy.get('[data-cy=new-topic-form]', { timeout: 5000 }).should('be.visible'); 
    
    //typing new topic...
    cy.get('[data-cy=topic-title]').type(topic);
    cy.get('[data-cy=topic-design]').select('Igloo');
    cy.get('[data-cy=topic-colour]').select('Blue');
    cy.get('[data-cy=save-topic-btn]').click();

    cy.contains('Successfully Created New').should('exist');

    // Click 'Back To Topics'
    cy.get('[data-cy=popup-back-to-topics]').click();

    cy.url().should('include', '/topics');
    cy.contains(topic).should('exist');

    
    });
  });

   newTopicCases.forEach(({topic}) => {
  it(`delete topics - ${topic}`, () => {
      cy.contains(topic)
      .parents('[data-cy=topic-item]')
      .find('[data-cy=delete-topic]')
      .click();

      cy.contains(topic).should('not.exist');
    });
  });
});