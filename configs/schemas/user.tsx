import { Schema } from 'mongoose';

export default new Schema({
	_id: {
		type: Schema.Types.ObjectId,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	createdAt: {
		type: Date,
	},
	updatedAt: {
		type: Date,
	},
	emailVerified: {
		type: Date,
	}
});
