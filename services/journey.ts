const ExcelJS = require('exceljs');

interface sheetCols {
    utm_source: string;
    utm_campaign: string;
    utm_medium: string;
    utm_content: string;
    sessionId: string;
    createdAt: string;
}

export const processJourney = async (filePath: string) => {
    const excelWorkbook = new ExcelJS.Workbook();
    await excelWorkbook.xlsx.readFile(filePath);
    const sheet = excelWorkbook.worksheets[0];
    console.log(sheet.name);
};
