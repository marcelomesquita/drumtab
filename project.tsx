import packageJson from './package.json';

export const PROJECT = {
	TITLE: "DrumTab",
	DESCRIPTION: "The easiest way to read and write drum tabs!",
	URL: process.env.NEXT_PUBLIC_BASE_URL,
	AUTHOR: packageJson.author,
	VERSION: packageJson.version
}
