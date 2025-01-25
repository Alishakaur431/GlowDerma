const express = require("express");
const hbs = require("hbs");

const app = express();

// Set the view engine to Handlebars
app.set("view engine", "hbs");

// Set the views directory
app.set("views", "views");

app.use(express.json());
const PORT = 5000;

// Routes
app.get("/doctors", (req, res) => {
    res.render("doctors");
});

app.get("/services", (req, res) => {
    const category = req.query.category || "Our";
    res.render("services", { category });
});

app.post("/book-appointment", (req, res) => {
    const { name, email, service, preferredDate, preferredTime } = req.body;
    res.render("appointments", { name, email, service, preferredDate, preferredTime });
});

app.get("/offerings", (req, res) => {
    const data = {
        offerings: [
            { name: "Anti-Aging Treatment", price: 5000, duration: "60 mins", description: "Advanced treatment to reduce fine lines and wrinkles", available: true },
            { name: "Acne Treatment", price: 3000, duration: "45 mins", description: "Specialized treatment for acne-prone skin", available: true },
            { name: "Chemical Peel", price: 4000, duration: "30 mins", description: "Skin resurfacing treatment for even tone", available: false }
        ]
    };
    res.render("offerings", data);
});

app.get("/testimonials", (req, res) => {
    const data = {
        testimonials: [
            { name: "John Doe", rating: 5, comment: "Excellent service!", date: "January 20, 2024" },
            { name: "Jane Smith", rating: 4, comment: "Very professional staff", date: "January 18, 2024" }
        ]
    };
    res.render("testimonials", data);
});

// Register Handlebars helpers
hbs.registerHelper("range", function (count) {
    return Array.from({ length: count }, (_, i) => i + 1);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});