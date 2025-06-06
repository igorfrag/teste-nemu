const ExcelJS = require('exceljs');
import { Cell, Row } from 'exceljs';
import { Request, Response } from 'express';

interface sheetCols {
    utm_source: string;
    utm_campaign: string;
    utm_medium: string;
    utm_content: string;
    sessionId: string;
    createdAt: string;
}

export const processJourney = async (req: Request, res: Response) => {
    try {
        //Setup inicial para manipular planilha
        const filePath: string = 'uploads/nemu.xlsx';
        const excelWorkbook = new ExcelJS.Workbook();
        await excelWorkbook.xlsx.readFile(filePath);
        const sheet = excelWorkbook.worksheets[0];
        const rows: sheetCols[] = [];
        const headers = sheet.getRow(1).values.slice(1) as string[];

        sheet.eachRow((row: Row, rowNumber: number) => {
            if (rowNumber === 1) return;
            const rowData: any = {};
            row.eachCell((cell: Cell, colNumber: number) => {
                const header = headers[colNumber - 1];
                rowData[header] = cell.text;
            });
            rows.push(rowData);
        });
        /*Agrupamento por sessionId, declara sessionGroup como objeto vazio respeitando os valores dos cabeçalhos
        Para cada linha, checamos se o sessionId ja existe no objeto sessionGroup
        Caso nao exista, criamos um novo array dentro do objeto com as informacoes da nova linha 
        Aqui tambem aplicamos a primeira regra do briefing, separando jornadas por sessionId*/
        const sessionGroup: { [key: string]: sheetCols[] } = {};
        for (const row of rows) {
            if (!sessionGroup[row.sessionId]) {
                sessionGroup[row.sessionId] = [];
            }
            sessionGroup[row.sessionId].push(row);
        }
        const result = Object.entries(sessionGroup).map(
            ([sessionId, journey]) => {
                // Ordenamos a jornada pela diferença no timestamp createdAt, aplicando a segunda regra do briefing
                const orderedJourney = journey.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                );
                // Se a jornada tiver apenas 2 touch points ou repetir o primeiro e ultimo touch points, podemos retorna-la, aplicando a terceira regra do briefing
                if (orderedJourney.length <= 2) {
                    return { sessionId, jornada: orderedJourney };
                }
                // Agora trataremos a jornada com mais de 2 touch points, optei por utilizar um Set
                // Dessa forma podemos descartar eventos repetidos, respeitando a quarta regra do briefing
                const firstTouch = orderedJourney[0];
                const lastTouch = orderedJourney[orderedJourney.length - 1];
                const journeyMiddle = [];
                const journeySet = new Set();
                // Iteramos sobre a jornada ordenada e consultamos o utm_source da planilha
                // Caso nao exista no Set adcionamos para evitar repeticoes, ao mesmo tempo, adcionamos ao array do "meio da jornada"
                for (let i = 1; i < orderedJourney.length - 1; i++) {
                    const source = orderedJourney[i].utm_source;
                    if (!journeySet.has(source)) {
                        journeySet.add(source);
                        journeyMiddle.push(orderedJourney[i]);
                    }
                }
                return {
                    id: sessionId,
                    jornada: [firstTouch, ...journeyMiddle, lastTouch],
                };
            }
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Erro' });
    }
};
