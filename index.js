const express = require("express");
const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies = [
    {
        id: 1,
        title: "Inspection",
        director: "Rajamouli",
        release_date: "2010-07-06"
    },
    {
        id: 2,
        title: "Bahubali",
        director: "Narendra Modi",
        release_date: "2016-07-09"
    }
];

// Route to get all movies
app.get("/movie", (req, res) => {
    res.json(movies);
});

// Route to add a new movie
app.post("/movie", (req, res) => {
    const movie = req.body;

    console.log(movie);
    movies.push(movie);
    res.send("Movie added to the list");
});

// Route to search for a movie by ID
app.get("/movie/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    for (let movie of movies) {
        if (movie.id === id) {
            res.json(movie);
            return;
        }
    }

    res.status(404).send("Movie not found");
});

//remove movie from the list
app.delete("/movie/:id",(req,res)=>{
    const id=parseInt(req.params.id, 10);

    movies = movies.filter(movie=>{
        if(movie.id !== id){
            return true
        }
        return false
    })
    res.send("Movie is deleted succesfully")
    
})


// Start the server
app.listen(port, () => console.log(`Server listening on ${port}`));
