import express from 'express';
import { config } from './config/env';
const app = express();
app.use('/', (req, res) => {
    res.send("Hello World");
});
app.listen(config['server']['port'], () => {
    console.log(`Listening on port ${config['server']['port']}`);
});
//# sourceMappingURL=server.js.map