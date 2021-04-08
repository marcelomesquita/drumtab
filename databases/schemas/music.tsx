import { Schema } from 'mongoose';

const musicSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId,
	},
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		require: true,
	},
	artist: {
		type: String,
		required: true,
	},
	album: {
		type: String,
	},
	author: {
		type: String,
	},
	tablature: {
		type: Object,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
	createdAt: {
		type: Date,
	},
});

export default musicSchema;
