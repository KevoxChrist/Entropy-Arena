describe('Entropy Arena Tests', () => {
  const baseUrl = 'https://development.d1zb36hw4mnhw5.amplifyapp.com';

  it('should visit the site', () => {
    cy.visit(baseUrl);
    cy.url().should('eq', `${baseUrl}/`);
    cy.get('.home-page').should('be.visible');
  });

  it('should click Enter the Arena button and navigate to arena page', () => {
    cy.visit(baseUrl);
    cy.contains('Enter the Arena').click();
    cy.url().should('include', '/arena');
    cy.get('.arena').should('be.visible');
  });

  it('should accept matching passwords in both input boxes and navigate to results page', () => {
    cy.visit(baseUrl);
    cy.contains('Enter the Arena').click();

    const testPassword = 'MyTestPassword123!';

    cy.get('.player-input').first().find('input')
      .type(testPassword);

    cy.get('.player-input').eq(1).find('input')
      .type(testPassword);

    cy.get('.results', { timeout: 10000 }).should('be.visible');
  });

  it('should click try again button and return to arena page', () => {
    cy.visit(baseUrl);
    cy.contains('Enter the Arena').click();

    const testPassword = 'MyTestPassword123!';

    cy.get('.player-input').first().find('input')
      .type(testPassword);

    cy.get('.player-input').eq(1).find('input')
      .type(testPassword);

    cy.get('.results', { timeout: 10000 }).should('be.visible');

    cy.contains('try again').click();

    cy.get('.arena').should('be.visible');
  });
});

describe('User Authentication Tests', () => {
  const baseUrl = 'https://development.d1zb36hw4mnhw5.amplifyapp.com';
  const timestamp = Date.now();
  const testUser = {
    username: `testuser${timestamp}`,
    email: `testuser${timestamp}@example.com`,
    password: 'TestPassword123!'
  };

  it('should register a new user', () => {
    cy.visit(baseUrl);

    cy.contains('Register').click();
    cy.url().should('include', '/register');

    cy.get('input#username').type(testUser.username);
    cy.get('input#register-email').type(testUser.email);
    cy.get('input#register-password').type(testUser.password);
    cy.get('input#confirmPassword').type(testUser.password);

    cy.get('button[type="submit"]').click();

    cy.get('.success-msg', { timeout: 10000 }).should('be.visible');
    cy.url({ timeout: 10000 }).should('include', '/arena');
  });

  it('should login with registered user and verify username on Account page', () => {
    cy.visit(baseUrl);

    cy.contains('Log in').click();
    cy.url().should('include', '/login');

    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);

    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/arena');

    cy.contains('Account').click();
    cy.url().should('include', '/account');

    cy.get('.account-value').first().should('contain', testUser.username);
    cy.get('.account-title span').should('contain', testUser.username);
  });
});

describe('Leaderboard Navigation Tests', () => {
  const baseUrl = 'https://development.d1zb36hw4mnhw5.amplifyapp.com';

  it('should navigate to leaderboard page when clicking Leaderboard button', () => {
    cy.visit(baseUrl);

    cy.contains('Leaderboard').click();
    cy.url().should('include', '/leaderboard');
  });
});

describe('FAQ Navigation Tests', () => {
  const baseUrl = 'https://development.d1zb36hw4mnhw5.amplifyapp.com';

  it('should navigate to FAQ page when clicking FAQ button', () => {
    cy.visit(baseUrl);

    cy.contains('FAQ').click();
    cy.url().should('include', '/faq');
  });
});

describe('Account Navigation Tests', () => {
  const baseUrl = 'https://development.d1zb36hw4mnhw5.amplifyapp.com';
  const timestamp = Date.now();
  const testUser = {
    username: `accounttest${timestamp}`,
    email: `accounttest${timestamp}@example.com`,
    password: 'TestPassword123!'
  };

  it('should navigate to account page when signed in and clicking Account button', () => {
    cy.visit(baseUrl);

    // Register a new user
    cy.contains('Register').click();
    cy.get('input#username').type(testUser.username);
    cy.get('input#register-email').type(testUser.email);
    cy.get('input#register-password').type(testUser.password);
    cy.get('input#confirmPassword').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/arena');

    // Navigate to account page
    cy.contains('Account').click();
    cy.url().should('include', '/account');

    // Verify user is on account page
    cy.get('.account-page').should('be.visible');
  });
});
