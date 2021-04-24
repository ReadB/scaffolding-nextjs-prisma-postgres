import Next from 'next';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import api from './api';

const app = express();

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});
const redisStore = connectRedis(session);

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    cookie: { secure: false },
    saveUninitialized: true,
    store: new redisStore({ client: redisClient }),
}))

const dev = process.env.NODE_ENV !== 'production'
const next = Next({ dev })
const handle = next.getRequestHandler()

next.prepare()
    .then(() => {
        app.get('*', (req, res) => handle(req, res))
        app.listen(process.env.PORT, () => {
            console.log(`> Ready on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })

app.use('/api', api);
