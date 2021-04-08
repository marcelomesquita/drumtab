import mongoose from 'mongoose'
import musicsSchema from './schemas/music';
import usersSchema from './schemas/user';

async function connect() {
	if (!mongoose.models.User) {
		mongoose.model('User', usersSchema);
	}

	if (!mongoose.models.Music) {
		mongoose.model('Music', musicsSchema);
	}

	if (mongoose.connection.readyState >= 1) {
		return;
	}

	return mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
}

export default connect;
