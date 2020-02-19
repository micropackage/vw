import '../src/js/vw.js';

test( 'setScrollbarWidth', () => {
	const scrollbarWidth = window.getComputedStyle( document.documentElement ).getPropertyValue( '--scrollbar-width' );
	expect( scrollbarWidth ).toMatch( /[0-9]+px/ );
} );
