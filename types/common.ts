// export type TPhotosResponse = {
// 	id: string;
// 	width: number;
// 	height: number;
// 	description: string;
// 	urls: {
// 		raw: string;
// 		full: string;
// 		regular: string;
// 		small: string;
// 		thumb: string;
// 	};
// };

export type TPhotosResponse = {
	hits: {
		id: string;
		tags: string;
		webformatURL: string;
		webformatWidth: number;
		webformatHeight: number;
	}[];
};
