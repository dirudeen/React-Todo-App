describe("Todos spec", () => {
  it("Add todo functionality should works correctly", () => {
    cy.visit("/");
    //intercept post requests
    cy.intercept("POST", "http://localhost:3000/todos", {
      body: {
        id: 10,
        text: "Learn Cypress",
        completed: false,
      },
      statusCode: 200,
    }).as("postTodo");

    cy.contains(/todo app/i);

    cy.dataCy("todos-list").within(() => {
      cy.get("p").contains("Add your todos");
      cy.get("li").should("have.length", 0);
    });

    cy.get("form").within(() => {
      cy.get("input").type("Learn Cypress");
      cy.get("button[type='submit']").click();
    });

    cy.dataCy("todos-list").within(() => {
      cy.get("li").should("have.length", 1);
      cy.get("li").its(0).should("contain.text", "Learn Cypress");
    });

    cy.intercept("POST", "http://localhost:3000/todos", {
      body: {
        id: 11,
        text: "Cook dinner at 5pm",
        completed: false,
      },
      statusCode: 200,
    });

    cy.get("form").within(() => {
      cy.get("input").type("Cook dinner at 5pm");
      cy.get("button[type='submit']").click();
    });

    cy.dataCy("todos-list").within(() => {
      cy.get("li").should("have.length", 2);
      cy.get("li").its(1).should("contain.text", "Cook dinner at 5pm");
    });

    // checks the todo and verifies the line-through
    cy.intercept("PATCH", "http://localhost:3000/todos/:id", {
      statusCode: 203,
    });

    cy.dataCy("todos-list").within(() => {
      cy.get("li")
        .first()
        .within(() => {
          cy.get("input[type='checkbox']").check();
          cy.get("p").should("have.class", "line-through");
        });
    });

    // click on delete btn and verify the todo is deleted
    cy.intercept("DELETE", "http://localhost:3000/todos/:id", {
      statusCode: 200,
    });

    cy.dataCy("todos-list").within(() => {
      cy.get("li")
        .first()
        .within(() => {
          cy.get("button").click();
          cy.contains(/Learn Cypress/i).should("not.exist");
        });
      cy.get("li").should("have.length", 1);
    });
  });
});
