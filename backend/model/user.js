var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	username: Number,
	password: String,
	registrationDate: Date,
	completedQuestionnaire: Boolean,
	questionnaireScore: Number,
	latestRiskScore: Number,
	wealth: Number,
	income: Number,
}),
user = mongoose.model('user', userSchema);

module.exports = user;