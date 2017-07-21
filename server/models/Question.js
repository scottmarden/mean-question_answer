const mongoose = require("mongoose");

const Schema = mongoose.Schema;


let QuestionSchema = new Schema({
	question: {
		type: String,
		required: [true, "Question is required"],
		minlength: [10, "Question must be at least 2 characters long"]
	},
	description: {
		type: String,
	},
	_user: [{type: Schema.Types.ObjectId, ref: 'User'}],
	answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]

},
{timestamps: true})

mongoose.model('Question', QuestionSchema)
