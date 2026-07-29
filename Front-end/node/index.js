const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Vos sourcils');
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});