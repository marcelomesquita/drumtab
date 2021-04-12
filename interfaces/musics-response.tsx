import Music from "../models/music";

export default interface MusicsResponse {
	status: number,
	message: string;
	musics: Array<Music>;
}
