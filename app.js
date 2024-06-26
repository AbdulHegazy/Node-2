

// basics body code
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'))
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const User = require("./Models/customers.Schema")


/////// GET AND POST REQUESTS



// Test Commit


// Get Reqests

// the ways what the project going to
// Array way
app.get("/", (req, res) => {
    User.find()
        .then((result) => {
            res.render("index", { arr: result })
        })
        .catch((err) => {
            err
        })
})

// The second way -->  Add Customers
app.get("/user/add.html", (req, res) => {
    res.render('user/add'); 
})


// The third way -->  view details
app.get("/view/:id", (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/view", {data: result})
        }).catch((err) => {
            console.log(err)
        })
})


// The third way -->  edit user
app.get("/edit/:id", (req, res) => {
    User.findById(req.params.id)
    .then((result) => {
        res.render("user/edit", {data: result})
    }).catch((err) => {
        console.log(err)
    })
})


// The third way -->  search --> not compleated
app.get("/", (req, res) => {
    res.render("user/search")
})



// Post Reqests

// Send to DataBase
app.post("/user/add.html", (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    user.save().then(() => {
        res.redirect("/user/add.html")
    }).catch((err) => {
        console.log(err)
    })
}),


// search Reqest
app.post("/search", (req, res) => {
    console.log("*******************************")
   
    const searchText = req.body.searchText.trim()
  
    User.find({ hotelName: searchText  })
      .then((result) => {
        console.log(result);
        res.render("user/search", { arr: result});
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

  // PUT Requst
app.put("/edit/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id , req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });   


// Delete Reqest
app.delete("/delete/:id", (req, res) => {
User.findByIdAndDelete(req.params.id)
.then(()=> {
    res.redirect("/")
}) 
.catch ((err)=> {
    console.log(err)
})
})


// Auto save blockCode line(11:23)
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require("connect-livereload");
const { request } = require('http');
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});






// connection body code
    mongoose
        .connect("mongodb+srv://Abdul:cCLZwqZacLmDhUgb@cluster0.5fhyyk6.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            app.listen(port, () => {
                console.log(`http://localhost:3000/`)
            })
        })
        .catch((err) => { console.log(err) });


