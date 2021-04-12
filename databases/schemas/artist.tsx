import { Schema } from 'mongoose';

export default new Schema({
	_id: {
		type: Schema.Types.ObjectId,
	},
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		require: true,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
	},
});
