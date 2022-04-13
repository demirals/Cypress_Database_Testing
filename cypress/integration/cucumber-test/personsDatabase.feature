Feature: personsDatabase

Scenario: Create a table named Persons and make changes on it

Given Input Entries into the table
When Log console all persons data
And Update an Entry into the table and verify
And Verify that there is only one row where the city is Espoo
Then Delete a Table and Verify
