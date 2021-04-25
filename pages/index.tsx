//Import Modules
import * as React from 'react';
import dynamic from 'next/dynamic';

//Import Components
import Slider from './components/Slider';
import NormalMasonary from './components/NormalMasonary';
import VirtualizedMasonary from './components/VirtualizedMasonary';

//Import Types
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

//Import Misc
import { getPhotos } from './api/photos';

type TAppProps = {} & InferGetStaticPropsType<typeof getStaticProps>;

const Modal = dynamic(() => import('./components/Modal'), { ssr: false });

const App = (props: TAppProps) => {
	//All fetched photos. Default state will be the the first page links.
	const [photos, setPhotos] = React.useState(props.initialPhotos);
	//Current Page.
	const [page, setPage] = React.useState(1);
	//To toggle modal.
	const [isModalVisible, setModalVisible] = React.useState(false);
	//To maintain which image was clicked so Modal and Slider can show correct image.
	const [currentImage, setImage] = React.useState<number>(0);
	//To Toggle between normal and virtual masonary ( react-virtualized ).
	const [masonryType, setMasonryType] = React.useState<'normal' | 'virtual'>(
		'normal'
	);

	//Just a reference value being used in useEffect hook.
	const didMount = React.useRef(false);

	React.useEffect(() => {
		//Do not run on mount. So on mount we set didMount to true.
		//On subsequent page changes it will fetch the image links from the API.
		if (didMount.current) {
			fetch(`/api/photos?page=${page}`)
				.then((resp) => resp.json())
				.then((data) => setPhotos((prev) => [...prev, ...data.photos]));
		} else {
			didMount.current = true;
		}
	}, [page]);

	//To load additional images.
	const loadMore = () => setPage((prev) => prev + 1);

	//When image is clicked open modal and setImage to the index of clicked image.
	const onImageClick = (ix: number) => {
		setImage(ix);
		setModalVisible(true);
	};

	return (
		<React.Fragment>
			<div>
				<input
					type="radio"
					onChange={() => setMasonryType('normal')}
					id="normal"
					name="masonary"
					value="normal"
					defaultChecked
				/>
				<label htmlFor="normal">Normal</label>
				<input
					type="radio"
					onChange={() => setMasonryType('virtual')}
					id="virtual"
					name="masonary"
					value="virtual"
				/>
				<label htmlFor="virtual">Virtual</label>
			</div>
			<div className="masonary">
				{masonryType === 'normal' ? (
					<NormalMasonary
						photos={photos}
						isModalVisible={isModalVisible}
						onImageClick={onImageClick}
						loadMore={loadMore}
					/>
				) : (
					<VirtualizedMasonary
						photos={photos}
						isModalVisible={isModalVisible}
						onImageClick={onImageClick}
						loadMore={loadMore}
					/>
				)}
				<Modal
					isOpen={isModalVisible}
					onCloseHandler={() => setModalVisible(false)}
				>
					<Slider
						photos={photos}
						currentIx={currentImage}
						onNext={() => setImage((prev) => prev + 1)}
						onPrevious={() => setImage((prev) => prev - 1)}
					/>
				</Modal>
			</div>
		</React.Fragment>
	);
};

export default App;

export const getStaticProps = async (context: GetStaticPropsContext) => {
	const photos = await getPhotos(1);
	return {
		props: { initialPhotos: photos },
		revalidate: 600,
	};
};
