//Import Modules
import * as React from 'react';
import cn from 'classnames';

//Import Components
import {
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	CellRenderer,
	createMasonryCellPositioner,
	Masonry,
	WindowScroller,
} from 'react-virtualized';

//Import Styles
import 'react-virtualized/styles.css';

const cache = new CellMeasurerCache({
	defaultHeight: 250,
	defaultWidth: 200,
	fixedWidth: true,
});

const cellPositioner = createMasonryCellPositioner({
	cellMeasurerCache: cache,
	columnCount: 6,
	columnWidth: 200,
	spacer: 10,
});

type TVirtualizedMasonaryProps = {
	photos: {
		width: number;
		height: number;
		url: string;
		description: string;
		id: string;
	}[];
	onImageClick: (index: number) => void;
	isModalVisible: boolean;
	loadMore: () => void;
};

const VirtualizedMasonary = (props: TVirtualizedMasonaryProps) => {
	const { photos, onImageClick, isModalVisible, loadMore } = props;
	const loadingContaner = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) loadMore();
		});
		if (loadingContaner.current) observer.observe(loadingContaner.current);
	}, []);

	const cellRenderer: CellRenderer = ({ index, key, parent, style }) => {
		const photo = photos[index];
		return (
			<CellMeasurer cache={cache} index={index} key={key} parent={parent}>
				<div style={style}>
					<img
						onClick={() => onImageClick(index)}
						key={photo.id}
						alt={photo.description}
						src={photo.url}
						style={{
							height: photo.height,
							width: '100%',
						}}
					/>
				</div>
			</CellMeasurer>
		);
	};

	return (
		<React.Fragment>
			<WindowScroller overscanByPixels={300}>
				{({ scrollTop, height }) => (
					<AutoSizer disableHeight height={height} scrollTop={scrollTop}>
						{({ width }) => (
							<Masonry
								autoHeight
								cellCount={photos.length}
								cellMeasurerCache={cache}
								cellPositioner={cellPositioner}
								cellRenderer={cellRenderer}
								height={height}
								width={width}
								scrollTop={scrollTop}
								overscanByPixels={300}
								className={cn({ blur: isModalVisible })}
							/>
						)}
					</AutoSizer>
				)}
			</WindowScroller>
			<div className="virtual-loading" ref={loadingContaner}></div>
		</React.Fragment>
	);
};

export default VirtualizedMasonary;
