const express = require('express');
const app = express();
const path = require('path');

// Middleware to check if the current time is within working hours
const workingHoursMiddleware = (req, res, next) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    const currentHour = currentDate.getHours();
    
    // Check if it's a weekday (Monday to Friday) and time is between 9 AM and 5 PM
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next(); // Continue to the next middleware or route handler
    } else {
        res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
};

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', workingHoursMiddleware, (req, res) => {
    res.render('home');
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    res.render('services');
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    res.render('contact');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
