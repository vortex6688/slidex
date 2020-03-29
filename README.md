This is image slider by Vortex, or just "Slidex".

The Slidex is created just using html, css and JavaScript,
No libraries or frameworks were used.

This slider is very easy to implement and configure, quick solution for a project that needs a simple slider,
or for someone who is not advanced with coding, but needs a copy - paste solution.

Here is the demo of the project: https://vortex6688.github.io/slidex/

The slider is quite flexible and allows to easily configure certain settings, like:
- width (size),
- resolution (e.g. 4:3 or 16:9 or any custom numbers could be used),
- navigation (enabled by default, allows to navigate to the next or previous slide by clicking on the NEXT(<) or PREVIOUS(>) buttons),
navigation could be disabled if needed,
- Navigation bullets (enabled by default, number of bullets in the bottom area of the slider mirrors the number of the items(slides) in the gallery, displays the current active slide and allows to navigate to any slide listed in the gallery array by clicking on it's bullet),
- slide show pause (enabled by default, when mouse cursor is over the slider, slide show will be paused and current slide will be on hold until the cursor is moved out of the slider area, which allows used to hold a certain item displayed for as long as needed, this feature can be also disabled),
- slide change delay can be also specified (default is "10000", has to be in ms, so for instance 1 second will be equal to 1000ms, or 15 seconds will be equal to 15000ms),
- number of the slides and the slides images can be easely set by placing them in the "gallery" array ( like so: gallery = ["slide1.jpg", "slide2.jpg", "another-item.png"], names listed in the array are the actual images' names, extension (.png or .jpg or .svg) also must be included). 

Usage examples / instruction:

IMPLEMENTING THE SLIDER:

1) First of all, create a "slidex" folder in your project and copy the content of this repository in the newly created "slidex" folder.

2) Place the "div" element with the ".slider" class, where you would like the slider to appear, like so:
`<div class="slider"></div>`

3) Run the "slider.js" in your html document, like so:
`<script src="slidex/js/slider.js"></script>`
!NOTE - the script have to be imported AFTER the DIV with the slider class, like so:

`<div class="slider"></div>`
`<script src="slidex/js/slider.js"></script>`

And not the other way around!

4) Import the css document, normally it's done inside the <head> tag, like so:
`<link rel="stylesheet" href="slidex/style/css/style.css" />`

And there you go! The slider will work right away and has some demo images in the "images/gallery" folder,
default setting are also provided.

CONFIGURING THE SLIDER:

!NOTE, all the configuration can be done by updating/editing the "slidexConfig" object, located in the slider.js document right at the beginning (comments with the description of every setting is provided).

1) Size (slider width and resolution, default slider width is 75 (75% of the widow width), default resolution is 16:9 (16 - width, 9 - height), size and resolution can be specified the way you want, just update the `customWidth`, `resolutionWidth`, `resolutionHeight` values and save the changes),
!NOTE that in order for the changes to be displayed, you must refresh the page (F5),

2) Slide change delay can be specified by setting `slideChangeInterval` to the number you need, in MS, for instance 5 seconds will have a value of "5000",

3) Next/Prev slide navigation is enabled by default, can be disabled by giving `sliderNavigation` a "disable" value,

4) Bullets navigation is enabled by default and can be desabled by setting `sliderBullets` to "disable,

5) Slide change animation (fade out and fade in) length is set to 1.5 seconds by default, can be changed by updating the `  slideChangeAnimationLength` value to any number of seconds you like,

6) Listing the items in the gallery is required, items must be located in the "slidex/images/gallery" folder and included in the "gallery" array, if there is no items in the "gallery" array, the slider will not be displayed at all,
!NOTE that items in the gallery array must be listed using their exact name and extemsion, e.g. "slide-1.jpg",

7) Holding the current slide (pause the slide show) when mouse cursor is over the slider is enabled by default, can be disabled by setting `mouseOverHold` to "disable",

8) Each item is displayed by setting the background and it's properties, so `slideBGWidth` - will be setting `background-size-x` (horizontally), and `slideBGHeight` - is for `background-size-y` (vertically), `slideBGVertPosition` and `slideBGVertPosition` - sets `background-position` vertically and horizontally.

To see how the slider looks and works, you can simply open the included `index.html` document and play around with it to figure out what it can do for your project.

Thank you!

If you have any questions, please write me to cybertechsolve@gmail.com
