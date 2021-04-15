import mongoose from 'mongoose'
import artistSchema from './schemas/artist';
import albumSchema from './schemas/album';
import authorSchema from './schemas/author';
import musicSchema from './schemas/music';
import userSchema from './schemas/user';

export default async function connect() {
	if (!mongoose.models.User) {
		mongoose.model('User', userSchema);
	}

	if (!mongoose.models.Artist) {
		mongoose.model('Artist', artistSchema);
	}

	if (!mongoose.models.Album) {
		mongoose.model('Album', albumSchema);
	}

	if (!mongoose.models.Author) {
		mongoose.model('Author', authorSchema);
	}

	if (!mongoose.models.Music) {
		mongoose.model('Music', musicSchema);
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
