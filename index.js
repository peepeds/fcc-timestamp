const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    const filePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(filePath); // Mengirim file ke client
});


const isValidDate = (date) => {
	return !isNaN(date.getTime());
}

app.get('/api', (req, res) => {
    const date = new Date();
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
    });
});

app.get('/api/:date', (req, res) => {
    const dateString = req.params.date;

    if (!isNaN(dateString)) {
        const unix = parseInt(dateString); // Convert to number
        const date = new Date(unix);
        if (isValidDate(date)) {
            return res.json({
                unix: unix,
                utc: date.toUTCString(),
            });
        }
    }

    const date = new Date(dateString);
    if (isValidDate(date)) {
        return res.json({
            unix: date.getTime(),
            utc: date.toUTCString(),
        });
    } else {
        return res.json({ error: "Invalid Date" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
