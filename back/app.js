const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const dbRoutes = require('./router/DBRoutes');
const authRoutes = require('./router/AuthRoute');
const galleryRoutes = require('./router/GalleryRoute');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/db', dbRoutes);
app.use('/auth', authRoutes);
app.use('/gallery', galleryRoutes)

const port = process.env.PORT;
const host = process.env.API_URL;

app.listen(port, host, () => {
    console.log(`Server started on http://${host}:${port}`);
});
