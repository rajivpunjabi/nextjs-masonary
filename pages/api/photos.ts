//Unspalsh - Limits to 50 req an hour. So switched to pixabay.
// import { NextApiRequest, NextApiResponse } from 'next';
// import { TPhotosResponse } from '../../types/common';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
// 	try {
// 		const { page } = req.query;
// 		const photos = await getPhotos(Number(page));
// 		res.json({ photos });
// 	} catch (error) {
// 		console.log(`ERROR`, error);
// 	}
// };

// export const getPhotos = async (pageNumber: number) => {
// 	const photos = (await (
// 		await fetch(
// 			`https://api.unsplash.com/photos?page=${pageNumber}&per_page=15`,
// 			{
// 				headers: {
// 					Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
// 				},
// 			}
// 		)
// 	).json()) as TPhotosResponse[];

// 	return photos.map((photo) => ({
// 		width: photo.width,
// 		height: photo.height,
// 		url: `${photo.urls.raw}&w=0.2&auto=compress&fit=clip&fm=webp`,
// 		description: photo.description,
// 		id: photo.id,
// 	}));
// };

import { NextApiRequest, NextApiResponse } from 'next';
import { TPhotosResponse } from '../../types/common';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { page } = req.query;
		const photos = await getPhotos(Number(page));
		res.json({ photos });
	} catch (error) {
		res.json({ photos: [] });
	}
};

export const getPhotos = async (pageNumber: number) => {
	const photos = (await (
		await fetch(
			`https://pixabay.com/api/?key=${process.env.API_KEY_PIXABAY}&q=scenery&image_type=photo&page=${pageNumber}`
		)
	).json()) as TPhotosResponse;

	return photos.hits.map((photo) => ({
		width: photo.webformatWidth,
		height: photo.webformatHeight,
		url: photo.webformatURL,
		description: photo.tags,
		id: photo.id,
	}));
};
