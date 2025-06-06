import express from 'express';
import { processJourney } from './services/journey';

const PORT = process.env.PORT || 3000;
const app = express();
const filePath: string = 'uploads/nemu-teste.xlsx';

app.use(express.json());
processJourney(filePath);

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
