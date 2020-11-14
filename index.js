const puppeteer = require('puppeteer');
const { URL } = require('url');
const fse = require('fs-extra');
const path = require('path');

async function start(fetchUrl) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// page.on('response', async(response) => {
	// 	const url = new URL(response.url());
	// 	let filePath = path.resolve(`./output${url.pathname}`);
	// 	if (path.extname(url.pathname).trim() === '') {
	// 		filePath = `${filePath}/qotd.txt`;
	// 	}
	// 	await fse.outputFile(filePath, await response.buffer());
	// });

	await page.goto(fetchUrl, {
		waitUntil: 'networkidle2'
	});

	await page.waitForSelector('.quotescollection-quote p');
	let element = await page.$('.quotescollection-quote p');
	let value = await page.evaluate(el => el.textContent, element);
	console.log(value);

	setTimeout(async () => {
		await browser.close();
	}, 60000);
}

start('https://conversationstartersworld.com/random-question-generator');
