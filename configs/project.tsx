import packageJson from '../package.json';

export const project = {
	title: "DrumTab",
	description: "The easiest way to read and write drum tabs!",
	url: process.env.NEXT_PUBLIC_BASE_URL,
	author: packageJson.author,
	version: packageJson.version
}
