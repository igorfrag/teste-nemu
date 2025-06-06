import express from 'express';
import { processJourney } from './services/journey';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/journeys', processJourney);

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
