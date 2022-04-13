Feature: personsDatabase

Scenario: Create a table named Persons and make changes on it

Given Create a Table 
When Input Entries into the table
And Log console all persons data
And Update an Entry into the table and verify
And Verify that there is only one row where the city is Espoo
Then Delete a Table and Verify
