const mongoose = require("mongoose");

const Schema = mongoose.Schema;


let UserSchema = new Schema({
	first_name: {
		type: String,
		required: [true, "First name is required"],
		minlength: [2, "First name must be at least 2 characters long"]
	},
	last_name: {
		type: String,
		required: [true, "Last name is required"],
		minlength: [2, "First name must be at least 2 characters long"]
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Password is required"],

	},
	questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
	answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]

},
{timestamps: true})

mongoose.model('User', UserSchema)
