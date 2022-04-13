import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps"

Given('Create a Table', function () {
    cy.task('queryDb', "CREATE TABLE Oscars (PersonID int, FirstName varchar(255), Address varchar(255), City varchar(255))")
})


When('Input Entries into the table', function () {
    cy.task('queryDb', `INSERT INTO Oscars (PersonID, FirstName, Address, City) VALUES
    (001, "John", "House No. 01", "Helsinki"),
    (002, "Pam", "House No. 02", "Espoo"),
    (003, "Dwight", "House No. 03", "Lapland"),
    (004, "Michael", "House No. 04", "Vantaa");`).then((result) => {
        cy.log(JSON.stringify(result))
        console.log(result.affectedRows)
    
        expect(result.affectedRows).to.equal(4)
        })
})

And('Log console all persons data',()=>{
    cy.task("queryDb", {

        dbConfig: Cypress.env("db"),
        sql: `
        select * from Oscars
        `
    }).then((result)=>{
        console.log(result)
    })
})





Then('Delete a Table and Verify', function () {
    cy.task('queryDb', `DROP TABLE Oscars`).then((result) => {
        expect(result.message).to.equal("")
    })
})