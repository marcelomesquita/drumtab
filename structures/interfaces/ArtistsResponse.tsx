import Artist from "../models/Artist";

export default interface ArtistResponse {
	status: number,
	message: string;
	artists: Array<Artist>;
}
