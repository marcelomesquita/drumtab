import { Music } from "../models/music";

export interface MusicResponse {
	status: number,
	message: string,
	music: Music
}
