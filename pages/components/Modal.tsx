import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

type TModalProps = {
	isOpen: boolean;
	onCloseHandler: () => void;
	children: React.ReactNode;
};

const Modal = (props: TModalProps) => {
	const contentBox = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		//When modal is open disable scroll. So adding class to the body.
		if (props.isOpen) document.body.classList.add('disable-scroll');
		else document.body.classList.remove('disable-scroll');
	}, [props.isOpen]);

	//To handle click outside the content view.
	//So modal is closed automatically when clicked outside the main content
	const handleClick = (event: React.MouseEvent) => {
		if (contentBox.current?.contains(event.target as HTMLElement)) return;
		props.onCloseHandler();
	};

	return ReactDOM.createPortal(
		<CSSTransition
			in={props.isOpen}
			timeout={300}
			classNames="popup"
			unmountOnExit
		>
			<div className="modal" onClick={handleClick}>
				<div className="content" ref={contentBox}>
					{props.children}
				</div>
			</div>
		</CSSTransition>,
		document.body
	);
};

export default Modal;
