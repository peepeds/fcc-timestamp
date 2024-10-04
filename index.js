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
    res.sendFile(filePath ); // Mengirim file ke client
});

app.get('/api', (req, res) => {
	const date = new Date();
	const unix = date.getTime();
	const utc = date.toUTCString();
	res.json({unix,utc});
});

app.get('/api/:date', async (req, res) => {
    const date = await req.params.date;
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	if (regex.test(date)) {
		const utc = new Date(date).toUTCString();
		if (utc === 'Invalid Date') {
			res.json({error: 'Invalid Date'});
		}
		const unix = new Date(date).getTime();
		res.json({unix,utc});
	} 
	const unix = Number(date);
	const utc = new Date(unix).toUTCString();
	res.json({unix,utc});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})