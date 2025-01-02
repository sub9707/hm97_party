const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const dbRoutes = require('./router/DBRoutes');
const authRoutes = require('./router/AuthRoute');
const galleryRoutes = require('./router/GalleryRoute');
const commentRoutes = require('./router/CommentsRoute');
const rollingPaperRoutes = require('./router/rollingPaperRoute');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

// CORS 설정
const corsOptions = {
    origin: process.env.ENVIRONMENT === 'DEVELOPMENT' 
        ? process.env.FRONTEND_URL_DEV 
        : process.env.FRONTEND_URL_PRODUCTION,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight Request 처리

app.use(bodyParser.json());

app.use('/db', dbRoutes);
app.use('/auth', authRoutes);
app.use('/gallery', galleryRoutes);
app.use('/comment', commentRoutes);
app.use('/rolling', rollingPaperRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
