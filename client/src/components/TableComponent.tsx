import SourceButton from './SourceButton';

interface Touchpoint {
    utm_source: string;
}

interface Item {
    id: number;
    jornada: Array<Touchpoint>;
}

const TableComponent: React.FC<{ data: Array<Item> }> = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Jornada</th>
                    <th>Touch Points</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td
                            style={{
                                padding: '30px',
                            }}
                        >
                            {item.jornada.map((touchpoint, index) => (
                                <span
                                    key={index}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <SourceButton
                                        text={touchpoint.utm_source}
                                    ></SourceButton>
                                    {index < item.jornada.length - 1
                                        ? ' > '
                                        : ''}
                                </span>
                            ))}
                        </td>
                        <td>{item.jornada.length}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;

// item.jornada[0].utm_source
