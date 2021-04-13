import Next from 'next';
import express from 'express';
const app = express();

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
