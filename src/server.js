import app from './app.js';
const port = Number(process.env.port);

app.listen(port, () => console.log(`App is running on port: ${port}`));
