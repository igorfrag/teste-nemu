import { useEffect, useState } from 'react';
import './App.css';
import TableComponent from './components/TableComponent';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchJourneys = async () => {
            try {
                const response = await fetch('http://localhost:3000/journeys');
                if (!response.ok) {
                    throw new Error('Erro ! ');
                }
                const json = await response.json();
                setData(json);
            } catch (err) {
                console.log(err);
            }
        };

        fetchJourneys();
    }, []);

    return (
        <>
            <h1>Jornadas Nemu</h1>
            <TableComponent data={data} />
        </>
    );
}

export default App;
