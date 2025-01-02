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

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.FRONTEND_URL_DEV,
            process.env.FRONTEND_URL_PRODUCTION,
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 쿠키 포함 요청 허용
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight 요청 처리

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
