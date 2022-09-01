
## ToDoLIST v2

This project is web app continuation of the previous TodoList 
<a target="_blank" href="https://todolist-52s7.onrender.com"><h3>Click me for the Website</h3></a>

### TOOLS

- Node.js
- Express
- BodyParser
- EJS (Embedded Javascript Template)
- Mongoose
- Lodash

#### KEY POINTS

- Require mongoose and Lodash
- Run mongod to run our database
- Run mongo 
- Connect to local database host
- Instead of an array we used a database
- Create your Collection Schema
- Create your Collection using Mongo model
- Create the items of your database based on the schema using the mongo model
- Insert the items into your Mongo model collection
- For the items not to be repeated use a condition for when the item isnt there insert to database but if the item is there render our root route 
- Once the item is added we want to redirect to our root route to see the item without refreshing
- Use express route parameters to create multiple pages or route 
- Store the route and use lodash to make d first later capitalized 
- Create another Collection schema and mongo model to store the new list on the pages (Global var)
- Now there are two collections in our database


- Use the post method to add new items, we save the tem using bodyparser
- Add the new item using collection model and .save()
- Redirect back to root route

- Use post method to also delete from the checkbox
- Give the checkbox an onchanged= this.form.submit and a value of item.id and name of checkbox
- save the id and use the findandRemoveOne method to remove the id when the box is checked
- 



[P.S] found the project very confusing

