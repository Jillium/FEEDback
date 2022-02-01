const express = require('express');

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});