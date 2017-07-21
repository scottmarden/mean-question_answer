const mongoose = require("mongoose");

const Schema = mongoose.Schema;


let AnswerSchema = new Schema({
	answer: {
		type: String,
		required: [true, "Question is required"],
		minlength: [10, "Question must be at least 2 characters long"]
	},
	details: {
		type: String,
	},
	rating: {
		type: Number,
		default: 0
	},
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	_question: {type: Schema.Types.ObjectId, ref: 'Question'}

},
{timestamps: true})

mongoose.model('Answer', AnswerSchema)
