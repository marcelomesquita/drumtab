import Music from "../models/music";

export default interface MusicResponse {
	status: number,
	message: string,
	music: Music
}
