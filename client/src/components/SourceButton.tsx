import React from 'react';

type SourceButtonProps = {
    text: string;
};

// Funcao apenas para estetica da tabela, nao autoral
// Retirado de https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
const stringToColour = (str: string) => {
    let hash = 0;
    str.split('').forEach((char) => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += value.toString(16).padStart(2, '0');
    }
    return colour;
};

const SourceButton: React.FC<SourceButtonProps> = ({ text }) => {
    return (
        <span
            style={{
                backgroundColor: stringToColour(text),
                padding: '1px',
                margin: '2px',
                border: 'solid 2px white',
                borderRadius: '10px',
            }}
        >
            {text}
        </span>
    );
};

export default SourceButton;
