
// This is main source code for Slidex,
// It is not reccomended to make any changes in this document because it may an error to appear or break the slider completely,
// To change Any setting or specify parameters, please follow provided documentation and examples.
// Slidex comes with a default setup and is configured to work once you place a div element with a class ".slider" in your HTML markup

// slidexConfig object contains all the settings and can be modified/changed/updated
// The object has all the default values in order for the slider to work
const slidexConfig = {
  // !NOTE The "Essential" settings listed right below this comment
  // Have to be doublechecked and adjusted in order for slider to work
  // Due to possible different location of the index.html document or different location of the slidex folder itself
  // The path of the assets may have to be configured!

  // Essential* Slider settings 
  // Set navigation arrow images path (vendor/slidex/images/`imagename`.png - is a default path)
  navPrevButtonImgPath: "slidex/images/arrow-left.png",
  navNextButtonImgPath: "slidex/images/arrow-right.png",
  // Set the slider images folder path (vendor/slidex/images/gallery - is a default path)
  galleryImagesFolderPath: "slidex/images/gallery",
  // <----------------------->

  // Slider size settings
  // Define your custom slider width 
  // (it will be parsed in %, but no "%" needed, only specify the number, e.g. 75 or 90 )
  // customWidth is tipically applied when the screen 1200px and larger
  // customWidthMobile is applied for the screens smaller that 1200px
  customWidth: 60,
  customWidthMobile1200: 90,
  customWidthMobile1200: 95,
  resolutionWidth: 16,
  resolutionHeight: 9,
  // <----------------------->

  // Slide change interval can be set here (10000 (10 seconds) is default)
  slideChangeInterval: 8000,
  // <----------------------->

  // Set "enable" or "disable" slider navigation (enabled by default)
  sliderNavigation: "disable",
  // <----------------------->

  // Enable or disable "bullets" for the slider (enabled by default)
  sliderBullets: "disable",
  // <----------------------->

  // Slide transition animation length (1.5 sec is default)
  slideChangeAnimationLength: 1.5,
  // <----------------------->

  // Define a list of slides that we will display
  // Slides will be queued in a certain order, so order we list the items in, does matter!
  // (Item listed in the array first, will be displayed first, second - will be shown second)
  // The data will be stored in the "gallery" array, example with the default slides illustrated below
  // Full name of the document must be provided, including it's extension (.jpg .png and so on)
  gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
  // <----------------------->

  // enable/disable Holding the slideshow when mouse cursor is over the slider (enabled by default)
  mouseOverHold: "disable",
  // <----------------------->

  // Style slides view (each slide is a div element with the background image)
  // Specify background size (image size in this case)
  // Image (background) width (100% is default)
  slideBGWidth: "100%",
  // Image (background) height (auto is default)
  slideBGHeight: "auto",
  // Image (background) position vertically (center is default)
  slideBGVertPosition: "center",
  // Image (background) position horizontally (center is default)
  slideBGHorPosition: "center",
  // <----------------------->

  // Set the color of the backgroung of the slider ("none" is set by default, which is transparent)
  slideBGColor: "none",
  // <----------------------->

  // Set border radius if needed, (0 is the default value)
  borderRadius: "0 0 1em 1em"
  // <----------------------->
}

// Create a varible for the slider element
const slider = document.querySelector('.slider');

// Check if the Slider element was created in the html document
// Check if "gallery" array was given any items
// Slider will be built only slider element exists and and if it has items to display
// If no items were placed in the "gallery" array, then slider element will be hidden
if (slider && slidexConfig.gallery.length > 0) {
  function buildSlider() {
    // Set up the slider element size, that can be specified by user 
    // (Note that if the slider width is not specified, the default value is 100%)
    // <---------------------------->
    // Resolution - determines width to height relationship (e.g. 16:9)
    // (Note that if resolutionWidth and resolutionheight is not specified, it will be set to 16:9 by default)

    const sliderSize = function (customWidth, resolutionWidth, resolutionHeight) {
      // Detect Screen Width (px)
      const screenWidth = window.innerWidth;

      // Create varible to store value of the size argument (in %)
      const customWidthValue = customWidth * 0.01;

      // Set up slider size
      // Slider Width
      const sliderWidth = screenWidth * customWidthValue;
      // Slider height
      const sliderHeight = sliderWidth * (resolutionHeight / resolutionWidth);

      // Apply size styles on the slider element
      slider.setAttribute("style", `height: ${sliderHeight}px; width: ${sliderWidth}px; max-width: 100%;`);
    }
    // Calling sliderSize function first to set the size of the element
    // Default size and resolution will be set and can be configured by editing "slidexConfig" 

    // Exicuting a function to set the slider width and resolution
    if (window.innerWidth <= 640) {
      sliderSize(
        slidexConfig.customWidthMobile640,
        slidexConfig.resolutionWidth,
        slidexConfig.resolutionHeight
      );
    }
    else if (window.innerWidth <= 1200) {
      sliderSize(
        slidexConfig.customWidthMobile1200,
        slidexConfig.resolutionWidth,
        slidexConfig.resolutionHeight
      );
    } else if (window.innerWidth >= 1201) {
      sliderSize(
        slidexConfig.customWidth,
        slidexConfig.resolutionWidth,
        slidexConfig.resolutionHeight
      );
    }
    // <------------------------>

    // If gallery contains more than 1 item, div element will be created for every item
    // First (or 0 position in the array) item will be displayed, other items will be hidden
    // And each item will be given a class .slide with it's unique number (e.g. ".slide-2") 
    if (slidexConfig.gallery.length > 1) {
      slidexConfig.gallery.forEach((item, index) => {
        // Create a slide element that will be placed inside our slider element
        const slide = document.createElement("div");
        slide.setAttribute("style", `
          background-image: url(${slidexConfig.galleryImagesFolderPath}/${item}); 
          background-color: ${slidexConfig.slideBGColor};
          position: absolute;
          height: 100%; width: 100%;
          background-position: ${slidexConfig.slideBGVertPosition} ${slidexConfig.slideBGHorPosition};
          background-size: ${slidexConfig.slideBGWidth} ${slidexConfig.slideBGHeight};
          background-repeat: no-repeat;
          z-index: ${index};
          opacity: 0;
          transition: ${slidexConfig.slideChangeAnimationLength}s;
          border-radius: ${slidexConfig.borderRadius};
        `);
        slide.classList.add(`slide-${index}`);
        slider.appendChild(slide);
      });
      // Make the first image of the gallery array always enabled/shown (make it a start slide)
      document.querySelector(".slide-0").classList.add('active-slide');

      // After each item's div element was created, items will start appear with the specified time interval
      // We are setting current slide number to "0" (since first number in the "gallery" array starts with 0)
      let currentSlideNumber = 0;
      let hold = false;

      // Optionally slider can contain "bullets" to display the number of slides, 
      // highlight current slide number, and can be used to navigate to any slide
      // by clicking on a specific bullet (default value is set to "enable")
      if (slidexConfig.sliderBullets === "enable") {
        // Create a div element container for the bullets
        const navBullets = document.createElement("div");

        // Style a div element container for the navigation buttons
        // The navigations buttons by default will be vertically centered and have absolute positioning
        navBullets.setAttribute("style", `
          position: absolute;
          top: 0;
          display: flex;
          justify-content: center;
          height: 100%;
          width: 100%;
          align-items: flex-end;
        `);

        // Add a created div element container for the bullets to the slider element
        slider.appendChild(navBullets);

        // Create a number of "bullets" that will match the number of slides in the gallery
        slidexConfig.gallery.forEach((item, index) => {
          // Each bullet will be styled given a certain class,
          // to link it with the slide it's presenting
          const bullet = document.createElement("div");
          bullet.setAttribute("style", `
            height: 0.75em; width: 0.75em;
            opacity: 0.8;
            border: 0.125em #fff solid;
            border-radius: 50%;
            margin: 0.5em;
            cursor: pointer;
            z-index: 200;
            transition: ${slidexConfig.slideChangeAnimationLength}s;
          `);
          bullet.addEventListener("click", function () {
            currentSlideNumber = index;
            document.querySelector(`.active-bullet`).classList.remove('active-bullet');
            document.querySelector(`.bullet-${currentSlideNumber}`).classList.add('active-bullet');
            document.querySelector(`.active-slide`).classList.remove('active-slide');
            document.querySelector(`.slide-${currentSlideNumber}`).classList.add('active-slide');
          })
          bullet.classList.add(`bullet-${index}`);
          navBullets.appendChild(bullet);
        });
        // Make the first bullet active, since slider displays the first slide first 
        document.querySelector(".bullet-0").classList.add('active-bullet');
      }

      function nextSlide() {
        if (currentSlideNumber < (slidexConfig.gallery.length - 1) && !hold) {
          document.querySelector(`.active-slide`).classList.remove('active-slide');
          document.querySelector(`.slide-${currentSlideNumber + 1}`).classList.add('active-slide');
          if (slidexConfig.sliderBullets === "enable") {
            document.querySelector(`.active-bullet`).classList.remove('active-bullet');
            document.querySelector(`.bullet-${currentSlideNumber + 1}`).classList.add('active-bullet');
          }
          currentSlideNumber++;
        } else if (currentSlideNumber === (slidexConfig.gallery.length - 1) && !hold) {
          document.querySelector(`.active-slide`).classList.remove('active-slide');
          document.querySelector(`.slide-0`).classList.add('active-slide');
          if (slidexConfig.sliderBullets === "enable") {
            document.querySelector(`.active-bullet`).classList.remove('active-bullet');
            document.querySelector(`.bullet-0`).classList.add('active-bullet');
          }
          currentSlideNumber = 0;
        }
      }

      // Set time interval for the slide show
      setInterval(function slideShow() {
        nextSlide();
      }, slidexConfig.slideChangeInterval);

      // Optionally create slider navigation buttons (next slide and prev slide buttons)
      if (slidexConfig.sliderNavigation === "enable") {
        // Create a div element container for the navigation buttons
        const navButtons = document.createElement("div");

        // Create img elements navigation buttons(arrow icons default), right and left(next and prev)
        const navButtonNext = document.createElement("img");
        const navButtonPrev = document.createElement("img");

        // Style a div element container for the navigation buttons
        // The navigations buttons by default will be vertically centered and have absolute positioning
        navButtons.setAttribute("style", `
          position: absolute;
          top: 0;
          display: flex;
          justify-content: space-between;
          height: 100%;
          width: 100%;
          align-items: center;
          z-index: 100;
        `);

        // Add a created div element container for the navigation buttons to the slider element
        slider.appendChild(navButtons);

        // Style img elements navigation buttons(arrow icons default ), right and left(next and prev)
        navButtonPrev.setAttribute("style", `
          cursor: pointer;
          width: 5%;
          padding: 1em;
          opacity: 0.6;
        `);
        navButtonPrev.src = `${slidexConfig.navPrevButtonImgPath}`;
        navButtonNext.setAttribute("style", `
          cursor: pointer;
          width: 5%;
          padding: 1em;
          opacity: 0.6;
        `);
        navButtonNext.src = `${slidexConfig.navNextButtonImgPath}`;

        // Add the created IMG elements to a "navButtons" container 
        navButtons.appendChild(navButtonPrev);
        navButtons.appendChild(navButtonNext);

        // Set up an event listener on the NEXT slide button
        navButtonNext.addEventListener("click", function () {
          // If the slide show is on hold, turn off holding and change the slide
          // After that enable the hold variable again 
          if (hold) {
            hold = false;
            nextSlide();
            hold = true;
          } else {
            nextSlide();
          }
        });

        // Create a function that will allow user to get back to the previous slide
        function prevSlide() {
          if (currentSlideNumber > 0) {
            document.querySelector(`.active-slide`).classList.remove('active-slide');
            document.querySelector(`.slide-${currentSlideNumber - 1}`).classList.add('active-slide');
            if (slidexConfig.sliderBullets === "enable") {
              document.querySelector(`.active-bullet`).classList.remove('active-bullet');
              document.querySelector(`.bullet-${currentSlideNumber - 1}`).classList.add('active-bullet');
            }
            currentSlideNumber--;
          } else if (currentSlideNumber === 0) {
            document.querySelector(`.active-slide`).classList.remove('active-slide');
            document.querySelector(`.slide-${slidexConfig.gallery.length - 1}`).classList.add('active-slide');
            if (slidexConfig.sliderBullets === "enable") {
              document.querySelector(`.active-bullet`).classList.remove('active-bullet');
              document.querySelector(`.bullet-${slidexConfig.gallery.length - 1}`).classList.add('active-bullet');
            }
            currentSlideNumber = slidexConfig.gallery.length - 1;
          }
        }

        // Set up an event listener on the PREV slide button
        navButtonPrev.addEventListener("click", function () {
          // If the slide show is on hold, turn off holding and change the slide
          // After that enable the hold variable again 
          if (hold) {
            hold = false;
            prevSlide();
            hold = true;
          } else {
            prevSlide();
          }
        });

        // Highlight Navigation buttons when mouse cursor is over the slider
        // Mouseover will also optionally pause the slideshow (if the hold feature is enabled, enabled by default)
        navButtons.addEventListener("mouseover", function () {
          navButtonNext.setAttribute("style", `
            cursor: pointer;
            width: 5%;
            padding: 2%;
            opacity: 0.7;
            background-color: rgba(255, 255, 255, 0.7);
            transition: .5s;
            border-radius: 25%;
            margin: 2%;
          `);
          navButtonPrev.setAttribute("style", `
            cursor: pointer;
            width: 5%;
            padding: 2%;
            opacity: 0.7;
            background-color: rgba(255, 255, 255, 0.7);
            transition: .5s;
            border-radius: 25%;
            margin: 2%;
          `);
          if (slidexConfig.mouseOverHold === "enable") {
            hold = true;
          }
        });

        // Dim down the Navigation buttons when mouse cursor is not over the slider
        // Mouse Out will also start the slideshow again (if it was paused)
        navButtons.addEventListener("mouseout", function () {
          navButtonNext.setAttribute("style", `
            cursor: pointer;
            width: 5%;
            padding: 1em;
            opacity: 0.6;
            transition: .5s;
          `);
          navButtonPrev.setAttribute("style", `
            cursor: pointer;
            width: 5%;
            padding: 1em;
            opacity: 0.6;
            transition: .5s;
          `);
          if (hold != false) {
            hold = false;
          }
        });

      }
    } else {
      // If gallery contains only 1 item, then 1 div will be created and displayed
      const slide = document.createElement("div");
      slide.setAttribute("style", `
        background-image: url(images/gallery/${slidexConfig.gallery[0]}); 
        background-color: #fff;
        position: absolute;
        height: 100%; width: 100%;
        background-position: center center;
        background-size: auto 100%;
        background-repeat: no-repeat;
      `);
      slider.appendChild(slide);
    }
  }
  // Call the fuction to build the slider if requirements are met
  buildSlider();
} else if (slidexConfig.gallery.length === 0) {
  // If no items were placed in the "gallery" array, then slider element will be hidden
  slider.classList.add("hidden");
}
