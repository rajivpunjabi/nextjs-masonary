//Import Modules
import * as React from 'react';
import cn from 'classnames';

//Import Components
import Masonary from 'react-masonry-css';

type TNormalMasonaryProps = {
	isModalVisible: boolean;
	photos: {
		width: number;
		height: number;
		url: string;
		description: string;
		id: string;
	}[];
	onImageClick: (index: number) => void;
	loadMore: () => void;
};

const NormalMasonary = (props: TNormalMasonaryProps) => {
	const { isModalVisible, onImageClick, photos, loadMore } = props;
	const loadingContaner = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) loadMore();
		});
		if (loadingContaner.current) observer.observe(loadingContaner.current);
	}, []);

	return (
		<React.Fragment>
			<Masonary
				breakpointCols={{ default: 8, 1800: 6, 1200: 4, 960: 3, 768: 2 }}
				className={cn('normal-mason', { blur: isModalVisible })}
				columnClassName="normal-mason_column"
			>
				{photos.map((photo, ix) => (
					<div
						className="element"
						key={photo.id}
						onClick={() => onImageClick(ix)}
					>
						<img
							height={photo.height}
							width="100%"
							src={photo.url}
							alt={photo.description}
							loading="lazy"
						/>
					</div>
				))}
			</Masonary>
			<div className="loading" ref={loadingContaner}></div>
		</React.Fragment>
	);
};

export default NormalMasonary;
