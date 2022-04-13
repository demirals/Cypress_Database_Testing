// testerdockDatabaseTesting.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps"

Given('Create a Table', function () {
    cy.task('queryDb', "CREATE TABLE Persons (PersonID int, FirstName varchar(255), Address varchar(255), City varchar(255))")
})


When('Input Entries into the table', function () {
    cy.task('queryDb', `INSERT INTO Persons (PersonID, FirstName, Address, City) VALUES
    (001, "John", "House No. 01", "Helsinki"),
    (002, "Pam", "House No. 02", "Espoo"),
    (003, "Dwight", "House No. 03", "Lapland"),
    (004, "Michael", "House No. 04", "Vantaa");`).then((result) => {
        cy.log(JSON.stringify(result))
        console.log(result.affectedRows)
    
        expect(result.affectedRows).to.equal(4)
        })
})

//tabloyu yazdirmak icin bunu ekledim
And('Log console all persons data',()=>{
    cy.task("queryDb", {

        dbConfig: Cypress.env("db"),
        sql: `
        select * from Persons
        `
    }).then((result)=>{
        console.log(result)
    })
})



And('Update an Entry into the table and verify', function () {
    cy.task('queryDb', `UPDATE Persons SET FirstName = "Kevin" WHERE City="Vantaa"`).then((result) => {
        expect(result.changedRows).to.equal(1)
    })
    cy.task('queryDb', `SELECT FirstName FROM Persons WHERE City="Vantaa"`).then((result) => {
        expect(result[0].FirstName).to.equal('Kevin')
    })
})

And('Verify that there is only one row where the city is Espoo', function () {
    cy.task('queryDb', `SELECT COUNT(*) as "rowCount" FROM Persons WHERE City="Espoo"`).then((result) => {

        expect(result[0].rowCount).to.equal(1)
    })
})

Then('Delete a Table and Verify', function () {
    cy.task('queryDb', `DROP TABLE Persons`).then((result) => {
        expect(result.message).to.equal("")
    })
})
