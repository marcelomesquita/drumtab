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
	artist: {
		type: Schema.Types.ObjectId,
		ref: 'Artist',
		required: true,
	},
	album: {
		type: Schema.Types.ObjectId,
		ref: 'Album',
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'Author',
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
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	updatedAt: {
		type: Date,
	},
});
