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
        <table style={{ border: 'solid 1px white', borderRadius: '10px' }}>
            <thead
                style={{
                    backgroundColor: 'gray',
                    border: 'solid 1px white',
                }}
            >
                <tr
                    style={{
                        backgroundColor: 'gray',
                        border: 'solid 1px white',
                    }}
                >
                    <th>Id</th>
                    <th>Jornada</th>
                    <th>Touch Points</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td style={{ borderBottom: 'solid 1px white' }}>
                            {item.id}
                        </td>
                        <td
                            style={{
                                borderBottom: 'solid 1px white',
                                padding: '30px',
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                gap: '3px',
                            }}
                        >
                            {item.jornada.map((touchpoint, index) => (
                                <>
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
                                        />
                                    </span>
                                    {index < item.jornada.length - 1 ? (
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'darkgray',
                                            }}
                                        >
                                            {'➤'}
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </>
                            ))}
                        </td>
                        <td style={{ borderBottom: 'solid 1px white' }}>
                            {item.jornada.length}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;

// item.jornada[0].utm_source
