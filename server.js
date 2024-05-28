const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to store names
app.post('/store-names', (req, res) => {
    const { name1, name2, percentage } = req.body;

    if (name1 && name2 && percentage !== undefined) {
        const entry = { name1, name2, percentage };
        fs.readFile('names.json', (err, data) => {
            if (err) throw err;
            let names = JSON.parse(data);
            names.push(entry);
            fs.writeFile('names.json', JSON.stringify(names), (err) => {
                if (err) throw err;
                res.status(200).json({ message: 'Names stored successfully' });
            });
        });
    } else {
        res.status(400).json({ message: 'Invalid input' });
    }
});

// Initialize names.json if it doesn't exist
fs.access('names.json', fs.constants.F_OK, (err) => {
    if (err) {
        fs.writeFile('names.json', JSON.stringify([]), (err) => {
            if (err) throw err;
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
