const express = require('express');
const db = require('./db/connection');
const router = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes through express.Router()
app.use('/api', router);

// Default not found response
app.use((req, res) => {
    res.status(404).end();
});

// Starts the after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
