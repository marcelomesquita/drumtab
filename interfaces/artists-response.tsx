import Artist from "../models/artist";

export default interface ArtistResponse {
	status: number,
	message: string;
	artists: Array<Artist>;
}
