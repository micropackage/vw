# Viewport Width

[![BracketSpace Micropackage](https://img.shields.io/badge/BracketSpace-Micropackage-brightgreen)](https://bracketspace.com)
[![npm](https://img.shields.io/npm/v/@micropackage/vw)](https://www.npmjs.com/package/@micropackage/vw)
[![License](https://img.shields.io/npm/l/@micropackage/vw)](https://www.npmjs.com/package/@micropackage/vw)

<p align="center">
    <img src="https://bracketspace.com/extras/micropackage/micropackage-small.png" alt="Micropackage logo"/>
</p>

## 🧬 About Viewport Width

_**Note:** Despite the name this package works with both viewport **width** and **height** units_

This package is meant to solve the common problem with viewport units in CSS. These are simply speaking percent units which always remain relative to viewport.
```css
.wrap {
	width: 800px;
	position: relative;
}

.wrap img {
	width: 100%;
}

.wrap .alignfull {
	width: 100vw;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}
```
In the example above `img` will have 100% of the parent width, which is `800px` while any element with class `alignfull` will have the 100% of a viewport. This is a simple solution for making full width section inside a narrower container: the element is positioned relatively which allows us to move it to the center of parent div by setting `left: 50%` and then move it back to the edge of the screen with `transform` property (where percentage values are relative to the element itself, not the parent).

### The Problem
There is one problem: viewport dimmensions include potential scrollbars. So on a typical website with vertical scrollbar any `.alignfull` element from the example will be wider than the actual body width. This could be easily corrected using `calc` function. Scrollbar width is in most cases 17px wide.
```css
.wrap .alignfull {
	width: calc(100vw - 17px);
	...
}
```
But...

In mobile browsers scrollbar does not count into viewport (it usually only appears as a narrow scrolling indicator while user drags the page around). We could write some media queries for it and use `calc` only in desktop browser. But it won't be easy, it won't be enought to check the viewport size, we should use some JS to determine whether current browser has permanently visible scrollbar or not.

Also we can't be sure if the scrollbar is 17px wide since this value is not standarized. Most desktop browsers use this size, but some of them have templating mechanisms which allow the templates to modifu UI elements. Firefox has an option to use narrow scrollbars...

### The Solution
That's why this package was created. it contains very simple JS code and a bunch of [Sass](https://sass-lang.com/) mixins to work with viewport units in a more convenient way.
Using this package you just use the mixin:
```scss
.element {
	width: vw(100);
}
```
instead of
```css
.element {
	width: 100vw;
}
```
See [Usage](#-usage) section for more information.

## 💾 Installation

``` bash
npm install @micropackage/vw
```
or
``` bash
yarn add @micropackage/vw
```

## 🕹 Usag
This package contains few [Sass](https://sass-lang.com/) mixins and is intended to be used with [Sass](https://sass-lang.com/). Hovewer the script might be useful also in plain CSS or with any other CSS extension language.

### The Script
Before you start you need to add the script to your site. You can just include the script directly in your HTML:
```html
<script src="/node_modules/@micropackage/vw/dist/vw.js"></script>
```
or import the package:
```javascript
import '@micropackage/vw';
```
What the script does is it recognizes if the browser contains the scrollbar and stores the scrollbar width in a css variable. The value is accessible in plain css using `var` function:
```css
.element {
	width: calc(100vw - var(--scrollbar-width));
}
```
The value is updated on resize event, and is set to 0 if there is no scrollbar.

If you would like to use just the script, this is it.

### The Mixins

While you have the script imported you will also need to import sass mixins:
```scss
@import "@micropackage/vw/src/scss/mixins";
```
Depending on the build tool you might need to use some special config to import SCSS files from `node_modules`.

#### `vw()`
This mixin is a replacement for the default `vw` unit.

*Example:*
```scss
.element {
	width: vw(47); // This is replacement for "width: 47vw";
}
```
*Generated CSS:*
```scss
.element {
	width: calc(0.47 * (100vw - var(--scrollbar-width))); // This is replacement for "width: 47vw";
}
```

Fine, but let's suppose we need to use the viewport-relative value in a more complex `calc` call. What then?

#### `vw-raw()`
This mixin will generate the calculation formula without the `calc()` wrapped arround, so it can be used in custom `calc()` call.

*Example:*
```scss
.element {
	width: vw(50);
	margin-left: calc(50% - #{ vw-raw(50) });
}
```
*Generated CSS:*
```scss
.element {
	width: 0.5 * (100vw - var(--scrollbar-width));
	margin-left: calc(50% - 0.5 * (100vw - var(--scrollbar-width)));
}
```
If the `.element` would be placed inside some centrally positioned container it would stretch to the left side of the screen while it's right edge would be aligned to the center of the screen. It's actually useful, trust me :)

#### `vh()` and `vh-raw()`
In most cases horizontal scrollbar is not desired on a website. It might be useful in a web app UI, but usually will be added to a specific elements, not entire document. But someone might need it so...

This two mixins are the same as the first two, but they use `vh` unit instead of `vw`.

*Example:*
```scss
.element {
	position: absolute;
	width: 100%;
	top: vh(50);
	height: calc(#{ vh-raw(50) } - 40px);
}
```

## 📦 About the Micropackage project

Micropackages - as the name suggests - are micro packages with a tiny bit of reusable code, helpful particularly in WordPress development.

The aim is to have multiple packages which can be put together to create something bigger by defining only the structure.

Micropackages are maintained by [BracketSpace](https://bracketspace.com).

## 📖 Changelog

[See the changelog file](./CHANGELOG.md).

## 📃 License

GNU General Public License (GPL) v3.0. See the [LICENSE](./LICENSE) file for more information.
