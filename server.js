



const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Route to handle signup data
app.post("/save-signup-data", async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    // Save data to file
    const data = `Email: ${email}, Password: ${password}\n`;
    const filePath = path.join(__dirname, "data.txt");

    try {
        await fs.appendFile(filePath, data, "utf8");
        console.log("Data saved successfully.");
        return res.status(200).json({ success: true, message: "Signup data saved successfully." });
    } catch (error) {
        console.error("Error saving data:", error);
        return res.status(500).json({ success: false, message: "Failed to save data." });
    }
});

// Serve static files (for HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
