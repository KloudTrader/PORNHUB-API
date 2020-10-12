const test = require('ava');
const nock = require('nock');
const m = require('../../src');

test('[PAGE] Test page model', async t => {
	nock('https://www.pornhub.com')
		.get('/model/teacher-of-magic')
		.replyWithFile(200, './tests/datas/page_model.html');
	const model = await m.model('Teacher of Magic', [
		'TITLE',
		'DESCRIPTION',
		'RANK_MODEL',
		'RANK_WEEK_MODEL'
	]);

	console.log(model);

	t.is(model.title, 'Teacher of Magic');
	t.not(model.description, undefined);
	t.is(model.rank_model, 53);
	t.is(model.rank_week_model, 41);
	nock.cleanAll();
});

test('[SEARCH] Try to trigger an error', async t => {
	nock('https://www.pornhub.com')
		.get('/model/teacher-of-magic')
		.reply(404);
	const model = await m.model('Teacher of Magic', ['TITLE']);

	t.is(model.error, 'An error occured');
	nock.cleanAll();
});
