const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const FONT_SIZE = 10;
const START_WIDTH = 27;
const FONT_COLOR = rgb(0.95, 0.1, 0.1);

async function buildGravataAventuraPDF(input) {
    const pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(__dirname, 'gravata.pdf')));
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();
    const { customer, passenger } = input;
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    await drawCustomer(customer, firstPage, helveticaFont, height / 2 + 243, START_WIDTH);
    if(input.passenger) {
        await drawPassenger(passenger, firstPage, helveticaFont, height / 2 - 12, START_WIDTH);
    }
    return pdfDoc.save()
}

async function drawCustomer(customer, firstPage, helveticaFont, startHight, startWidth) {
    const { name, cpf, driverCode, birth, address, phone } = customer;
    const {city, state, street} = address;

    firstPage.drawText(name, {
        x: startWidth + 35,
        y: startHight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    let currentHeight = startHight - 26;

    firstPage.drawText(birth, {
        x: startWidth,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    firstPage.drawText(driverCode, {
        x: startWidth + 160,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    firstPage.drawText(cpf, {
        x: startWidth + 300,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    currentHeight -= 28;

    firstPage.drawText(street, {
        x: startWidth + 52,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    firstPage.drawText(city, {
        x: startWidth + 290,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    firstPage.drawText(state, {
        x: startWidth + 435,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    firstPage.drawText(phone, {
        x: startWidth + 50,
        y: startHight - 69,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });
}

function drawPassenger(passenger, firstPage, helveticaFont, startHeight, startWidth) {
    const { name, cpf, driverCode, birth, address, phone } = passenger;
    const {city, state, street} = address;

    firstPage.drawText(name, {
        x: startWidth + 35,
        y: startHeight - 80,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    let currentHeight = startHeight - 105;

    firstPage.drawText(birth, {
        x: startWidth + 105,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    firstPage.drawText(driverCode, {
        x: startWidth + 255,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    currentHeight -= 25;

    firstPage.drawText(cpf, {
        x: startWidth,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    firstPage.drawText(street, {
        x: startWidth + 155,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    currentHeight -= 28;

    firstPage.drawText(city, {
        x: startWidth + 37,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    firstPage.drawText(state, {
        x: startWidth + 190,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });

    firstPage.drawText(phone, {
        x: startWidth + 257,
        y: currentHeight,
        size: FONT_SIZE,
        font: helveticaFont,
        color: FONT_COLOR,
    });
}

module.exports = { buildGravataAventuraPDF };