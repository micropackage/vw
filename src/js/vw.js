const setScrollbarWidth = () => {
	const
		prevWidth = window.getComputedStyle( document.documentElement ).getPropertyValue( '--scrollbar-width' ),
		newWidth = `${ window.innerWidth - document.body.clientWidth }px`;

	if ( newWidth !== prevWidth ) {
		document.documentElement.style.setProperty( '--scrollbar-width', newWidth );
	}
};

window.addEventListener( 'load', setScrollbarWidth );
window.addEventListener( 'resize', setScrollbarWidth );

setScrollbarWidth();
