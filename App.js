const express = require('express');
const app = express();
const port = 9005;


// Using Pug as the template engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use('./public', express.static('app'))

// Custom Middleware to verify working hours
app.use((req, res, next) => {
const currentDay = new Date().getDay();
const currentHour = new Date().getHours();

if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); // Continue to the next middleware or route
} else {
    res.send('This website is only available during working hours (Monday - Friday, 9am - 5pm).');
}
});

// Defining routes
app.get('/', (req, res) => {
res.render('home', { page: 'Home' });
});

app.get('/services', (req, res) => {
res.render('services', { page: 'Our Services' });
});

app.get('/contact', (req, res) => {
res.render('contact', { page: 'Contact Us' });
});


app.listen(port, function() {
    console.log('The server is running, ' +
        'please open your browser at http://localhost:%d', port);
});