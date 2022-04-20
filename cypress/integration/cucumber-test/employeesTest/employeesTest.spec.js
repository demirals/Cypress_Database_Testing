import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps"



Given('Input Entries into the table', function () {
    cy.task('queryDb', `INSERT INTO employees.employees 
    (emp_no,
    birth_date,
    first_name,
    last_name,
    gender,
    hire_date)       
    VALUES
    (LENGTH(emp_no)+6, "2022-01-01", "Selim", "Sami", "M", "2022-01-02");`) //increment problem
    
    .then((result) => {
        cy.log(JSON.stringify(result))
        console.log(result.affectedRows)
        expect(result.affectedRows).to.equal(1)
        }) 
    })

 And('Log console all persons data',()=>{
      cy.task("queryDb", {
    
              dbConfig: Cypress.env("db"),
              sql: `
              select * from employees.employees WHERE first_name="Selim";
              `
          }).then((result)=>{
             console.log(result)
          })
      })

    

Then('Delete last entry',()=>{
         cy.task("queryDb", {

            dbConfig: Cypress.env("db"),
            sql:`
            DELETE FROM employees.employees WHERE first_name="Selim";            
            `
         }).then((result)=>{

            expect(result.message).to.equal("")
         })
     })


    
    
    
