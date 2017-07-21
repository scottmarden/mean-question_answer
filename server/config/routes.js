const controller = require('../controllers/controller.js');

module.exports = app => {
	app.post('/api/register', controller.register);
	app.post('/api/login', controller.login);
	app.post('/api/create_question', controller.createQuestion)
	app.get('/api/all_questions', controller.allQuestions)
	app.post('/api/create_answer', controller.createAnswer)
	app.get('/api/question/:question_id', controller.getQuestion)
	app.get('/api/question_detail/:question_id', controller.getAnswers)
	app.get('/api/like_answer/:answer_id', controller.likeAnswer)
}
