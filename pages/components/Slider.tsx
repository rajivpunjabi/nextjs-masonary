//Import Modules
import * as React from 'react';

//Import Components
import {
	IoIosArrowBack as BackIcon,
	IoIosArrowForward as ForwardIcon,
} from 'react-icons/io';

//Import Types

type TSliderProps = {
	photos: {
		description: string;
		url: string;
		id: string;
	}[];
	currentIx: number;
	onNext: () => void;
	onPrevious: () => void;
};

const Slider = (props: TSliderProps) => {
	const { photos, currentIx, onNext, onPrevious } = props;
	const selectedImage = photos[currentIx];
	return (
		<div className="main">
			{currentIx !== 0 && <BackIcon size="48px" onClick={onPrevious} />}
			<img
				key={selectedImage.id}
				src={selectedImage.url}
				alt={selectedImage.description}
			/>
			{currentIx !== photos.length - 1 && (
				<ForwardIcon size="48px" onClick={onNext} />
			)}
		</div>
	);
};

export default Slider;
