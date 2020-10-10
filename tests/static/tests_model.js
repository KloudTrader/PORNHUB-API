const test = require('ava');
const nock = require('nock');
const m = require('../../src');

test('[PAGE] Test page model', async t => {
	nock('https://www.pornhub.com')
		.get('/model/teacher-of-magic')
		.replyWithFile(200, './tests/datas/page_model.html');
	const model = await m.model('Teacher of Magic', ['TITLE']);

	t.is(model.title, 'Teacher of Magic');
	nock.cleanAll();
});
