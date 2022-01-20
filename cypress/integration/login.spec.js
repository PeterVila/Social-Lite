describe("this will log into the demo account", () => {
    it("Log into demo account", () => {
        cy.visit("http://localhost:3000/#login");
        cy.get('[data-testid="demoButton"]').click(); //Chaining
        cy.get('.nav-title').should(($title) => {
            expect($title).to.contain('Home'); //Successful logins see top navbar
        })
    })
}); // .72s