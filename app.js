const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const PORT = 3000;
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.HOST);

const itemSchema ={
    name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todolist"
});

const item2 = new Item({
    name: "Hit the + button to add an item"
});

const item3 = new Item({
    name: "<-- Hit this to delete an item"
});
//add the items in an array
const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req,res) { 
    //send our db items to ejs
    Item.find({}, function(err, foundItems){
        //to check if r root route has the current defaultitem or its empty
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if (err){
                    console.log(err);
                } else {
                    console.log("Success!");
                }
            }); 
            res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
    });
});

app.get("/:customListName", function(req,res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name : customListName}, function(err, foundList){
        if (!err){
            if (!foundList){
                //Create a new list
                const list = new List ({
                    name: customListName,
                    items: defaultItems
                });

                list.save();
                res.redirect("/" + customListName);
            } else {
                //Show an existing list
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
            }
        }
    })
});

app.post("/", function(req, res){
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newItem = new Item({
        name: itemName
    });
    if(listName === "Today"){
        newItem.save();
        //for the item to show use 
        res.redirect("/");
    } else {
        List.findOne({name: listName}, (err, foundList) => {
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
    
    
});

//to delete list from the database
app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, function(err) {
            if (!err){
                console.log("Success");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}}, (err, foundList)=>{
            if (!err){
                res.redirect("/" + listName);
            }
        });
    }

    
});


app.get("/about", function (req, res) { 
    res.render("about");
});



app.listen(process.env.PORT || PORT, function(){
    console.log("Server is live at port 3000!");
});