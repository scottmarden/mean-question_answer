const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User')
const Question = mongoose.model('Question')
const Answer = mongoose.model('Answer')

module.exports = {
	register: (req, res) => {
		let user = new User(req.body);
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
		user.save( (err, savedUser) => {
			if(err){
				let errors = [];
				for (let x in err.errors){
					errors.push(err.errors[x].message)
				}
				res.status(400).send(errors);
			}else{
				return res.json(savedUser);
			}
		} )
	},

	login: (req, res) => {
		User.findOne({email: req.body.email}, (err, user) => {
			if(err){
				let errors = [];
				for (let x in err.errors){
					errors.push(err.errors[x].message)
				}
				res.status(400).send(errors);
			}
			if(user){
				console.log(user.password)
				if(bcrypt.compareSync(req.body.password, user.password)){
					res.json(user)
				}
				else{
					let errors = {error: "Invalid Username or Password"};
					res.status(400).send(errors);
				}
			}
		})
	},

	createQuestion: (req, res) => {
		User.findOne({email: req.body.email}, (err, foundUser) => {
			if(err){
				let errors = [];
				for (let x in err.errors){
					errors.push(err.errors[x].message)
				}
				res.status(400).send(errors);
			}else{
				let question = new Question(req.body);
				question._user = foundUser._id;
				question.save( (err, savedQuestion) => {
					if(err){
						let errors = [];
						for (let x in err.errors){
							errors.push(err.errors[x].message)
						}
						res.status(400).send(errors);
					}else{
						foundUser.questions.push(savedQuestion);
						foundUser.save( (err, savedUser) => {
							if(err){
								let errors = [];
								for (let x in err.errors){
									errors.push(err.errors[x].message)
								}
								res.status(400).send(errors);
							}else{
								res.json(savedQuestion)
							}
						})
					}
				})
			}
		})
	},

	allQuestions: (req, res) =>{
		Question.find({}, (err, list) => {
			if(err){
				let errors = [];
				for (let x in err.errors){
					errors.push(err.errors[x].message)
				}
				res.status(400).send(errors);
			}else{
				res.json(list)
			}
		})
	},

	createAnswer: (req, res) => {
		Question.findOne({_id: req.body.question_id}, (err, foundQuestion) => {
			if(err){
				let errors = [];
				for (let x in err.errors){
					errors.push(err.errors[x].message)
				}
				res.status(400).send(errors);
			}else{
				User.findOne({email: req.body.email}, (err, foundUser) => {
					if(err){
						let errors = [];
						for (let x in err.errors){
							errors.push(err.errors[x].message)
						}
						res.status(400).send(errors);
					}else{
						let answer = new Answer(req.body)
						answer._user = foundUser;
						answer._question = foundQuestion;
						answer.save( (err, savedAnswer) => {
							if(err){
								let errors = [];
								for (let x in err.errors){
									errors.push(err.errors[x].message)
								}
								res.status(400).send(errors);
							}else{
								foundUser.answers.push(savedAnswer)
								foundUser.save( (err, savedUser) => {
									if(err){
										let errors = [];
										for (let x in err.errors){
											errors.push(err.errors[x].message)
										}
										res.status(400).send(errors);
									}else{
										foundQuestion.answers.push(savedAnswer);
										foundQuestion.save( (err, savedQuestion) => {
											if(err){
												let errors = [];
												for (let x in err.errors){
													errors.push(err.errors[x].message)
												}
												res.status(400).send(errors);
											}else{
												res.json(savedAnswer)
											}
										})
									}
								})
							}
						})
					}
				})
			}
		})
	},

	getQuestion: (req, res) => {
		Question.findOne({_id: req.params.question_id}, (err, foundQuestion) => {
			console.log(req.params.question_id)
			if(err){
				let errors = [];
				for (let x in err.errors){
					errors.push(err.errors[x].message)
				}
				res.status(400).send(errors);
			}else{
				res.json(foundQuestion)
			}
		})
	},

	getAnswers: (req, res) => {
		Question.findOne({_id: req.params.question_id}).populate({path: 'answers', populate: {path: '_user'}}).exec( (err, foundQuestion) => {
			if(err){
				let errors = [];
				for (let x in err.errors){
					errors.push(err.errors[x].message)
				}
				res.status(400).send(errors);
			}else{
				res.json(foundQuestion)
			}
		})
	},

	likeAnswer: (req, res) => {
		Answer.findOneAndUpdate({_id: req.params.answer_id}, {$inc: {rating:1}}, (err, foundAnswer) => {
			if(err){
				let errors = [];
				for (let x in err.errors){
					errors.push(err.errors[x].message)
				}
				res.status(400).send(errors);
			}else{
				res.json(foundAnswer)
			}
		})
	}
}
