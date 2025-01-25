// import express from "express";
// const app = express();
// let PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//     res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here.");
// });

// app.get("/about", (req, res) => {
//     res.send("<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products.</h3>");
// });

// app.get("/contact", (req, res) => {
//     res.json({
//         email: "care@glowderma.com",
//         instagram: "http://instagram.com/glowderma",
//         consultation: "http://glowderma.com/book-appointment"
//     });
// });

// app.get("/products", (req, res) => {
//     res.json(items);
// });

// let items = [
//     {
//         name: "Hydrating Serum",
//         price: "$25",
//         description: "A lightweight serum that deeply hydrates and plumps the skin."
//     },
//     {
//         name: "Vitamin C Cream",
//         price: "$30",
//         description: "Brightens skin tone and reduces the appearance of dark spots."
//     }
// ];

// // Route Parameter
// app.get("/product/:pid", (req, res) => {
//     let pid = parseInt(req.params.pid)
//     let product = items[pid-1] 
//     if(product){
//         res.status(200).send(`Your requested product is ${product.name}` )
//     }
//     else{
//         res.status(404).send(`Product not found`)
//     }
//     res.send(`You have requested product ${req.params.pid}`)

// });

// // Wildcard Route: Handle undefined routes
// app.use((req, res) => {
//     res.status(404).json({
//         error: "Route not found"
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to handle JSON request bodies
app.use(express.json());

// Global Logging Middleware
app.use((req, res, next) => {
  const logData = `${new Date().toISOString()} | ${req.method} | ${req.path}\n`;
  fs.appendFile("server.logs", logData, (err) => {
    if (err) {
      console.error("Failed to write log data:", err);
    }
  });
  console.log(logData.trim());
  next();
});

// Middleware to serve static files from the "public" folder
const __dirname = path.resolve();
app.use("/assets", express.static(path.join(__dirname, "public")));

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here.");
});

// About route
app.get("/about", (req, res) => {
  res.send(
    "<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products.</h3>"
  );
});

// Contact route
app.get("/contact", (req, res) => {
  res.json({
    email: "care@glowderma.com",
    instagram: "http://instagram.com/glowderma",
    consultation: "http://glowderma.com/book-appointment",
  });
});

// Products route
app.get("/products", (req, res) => {
  res.json(items);
});

// Route with parameter: Fetch specific product by its ID
let items = [
  {
    name: "Hydrating Serum",
    price: "$25",
    description: "A lightweight serum that deeply hydrates and plumps the skin.",
  },
  {
    name: "Vitamin C Cream",
    price: "$30",
    description: "Brightens skin tone and reduces the appearance of dark spots.",
  },
];

app.get("/product/:pid", (req, res) => {
  let pid = parseInt(req.params.pid);
  let product = items[pid - 1];
  if (product) {
    res
      .status(200)
      .send(`Your requested product is ${product.name} - ${product.description}`);
  } else {
    res.status(404).send("Product not found");
  }
});

// Route to Simulate a 500 Error
app.get("/error-test", (req, res, next) => {
  next(new Error("Test Error")); // Simulates an error
});

// Wildcard Route: Handle undefined routes
app.use((req, res) => {
    res.status(404).json({
      message: "We don't have this page yet!",
    });
  });
  

// Middleware for error handling
app.use((err, req, res, next) => {
    console.error("Error:", err.message);  // Log the error to the terminal
    res.status(500).json({ message: "Sorry! Something went wrong." });
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});