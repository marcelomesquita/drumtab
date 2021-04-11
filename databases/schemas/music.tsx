import { Schema } from 'mongoose';

const musicSchema = new Schema({
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
	artist: {
		type: Schema.Types.ObjectId,
		ref: 'Artist',
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
		ref: 'User',
	},
	createdAt: {
		type: Date,
	},
});

export default musicSchema;
