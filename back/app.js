const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const dbRoutes = require('./router/DBRoutes');
const authRoutes = require('./router/AuthRoute');
const galleryRoutes = require('./router/GalleryRoute');
const commentRoutes = require('./router/CommentsRoute');
const rollingPaperRoutes = require('./router/rollingPaperRoute');

app.use(express.json({
    limit : "50mb"
}));
app.use(express.urlencoded({
    limit:"50mb",
    extended: false
}));

app.use(cors());
app.use(bodyParser.json());

app.use('/db', dbRoutes);
app.use('/auth', authRoutes);
app.use('/gallery', galleryRoutes);
app.use('/comment', commentRoutes);
app.use('/rolling', rollingPaperRoutes);

const port = process.env.PORT;
const host = process.env.ENVIRONMENT == 'DEVELOPMENT' ? process.env.API_URL_DEV : process.env.API_URL_PRODUCTION;

app.listen(port, host, () => {
    console.log(`Server started on http://${host}:${port}`);
});
