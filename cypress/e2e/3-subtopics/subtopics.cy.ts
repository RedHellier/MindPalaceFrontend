describe('SubTopics Flow - Create and Delete SubTopics', () => {
  const topic = "CypressSubtopicTests"

  // create topic once.
  before(() => {
    cy.loginBySupabaseApi();
    cy.visit('http://localhost:3000/topics');
    cy.get('[data-cy=create-topic-btn]').click();
    cy.get('[data-cy=new-topic-form]', { timeout: 5000 }).should('be.visible'); 
    
    cy.get('[data-cy=topic-title]').type(topic);
    cy.get('[data-cy=topic-design]').select('Igloo');
    cy.get('[data-cy=topic-colour]').select('Blue');
    cy.get('[data-cy=save-topic-btn]').click();

    cy.contains('Successfully Created New').should('exist');
    // Click 'Go to Topic'
    cy.get('[data-cy=goto-topic]').click();
    cy.url().should('include', `/${topic}`);
  });

  beforeEach(() => {
    cy.loginBySupabaseApi();
    cy.visit(`http://localhost:3000/${topic}`);
  });

  const newSubTopicCases = [
    { subtopic : "SubTopicA"},
    { subtopic : "SubTopic B"}
  ];

  newSubTopicCases.forEach(({subtopic}) => {
  it(`create subtopics - ${subtopic}`, () => {
    // Create first topic
    cy.get('[data-cy=create-subtopic-btn]').click();
    cy.get('[data-cy=new-subtopic-form]', { timeout: 5000 }).should('be.visible'); 
    
    //typing new subtopic...
    cy.get('[data-cy=subtopic-title]').type(subtopic);
    cy.get('[data-cy=subtopic-design]').select('Igloo');
    cy.get('[data-cy=subtopic-colour]').select('Blue');
    cy.get('[data-cy=save-subtopic-btn]').click();

    cy.contains('Successfully Created New').should('exist');

    // Click 'Back To Topics'
    cy.get('[data-cy=popup-back-to-topics]').click();

    cy.url().should('include', `/${topic}`);
    cy.contains(subtopic).should('exist');

    });
  });

   newSubTopicCases.forEach(({subtopic}) => {
  it(`delete subtopics - ${subtopic}`, () => {
      cy.contains(subtopic)
      .parents('[data-cy=subtopic-item]')
      .find('[data-cy=delete-subtopic]')
      .click();

      cy.contains(subtopic).should('not.exist');
    });
  });

  //delete the topic
   after(() => {
      cy.visit('http://localhost:3000/topics');
      cy.contains(topic)
      .parents('[data-cy=topic-item]')
      .find('[data-cy=delete-topic]')
      .click();
      cy.contains(topic).should('not.exist');

   })
});