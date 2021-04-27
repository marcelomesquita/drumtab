import Music from "../models/Music";

export default interface MusicsResponse {
	status: number,
	message: string;
	musics: Array<Music>;
}
