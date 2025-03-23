// // Disable scroll

// // left: 37, up: 38, right: 39, down: 40,
// // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

// function preventDefault(e) {
//   e.preventDefault();
// }

// function preventDefaultForScrollKeys(e) {
//   if (keys[e.keyCode]) {
//     preventDefault(e);
//     return false;
//   }
// }

// // modern Chrome requires { passive: false } when adding event
// var supportsPassive = false;
// try {
//   window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
//     get: function () { supportsPassive = true; }
//   }));
// } catch (e) { }

// var wheelOpt = supportsPassive ? { passive: false } : false;
// var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// // call this to Disable
// function disableScroll() {
//   window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
//   window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
//   window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
//   window.addEventListener('keydown', preventDefaultForScrollKeys, false);
// }

// // call this to Enable
// function enableScroll() {
//   window.removeEventListener('DOMMouseScroll', preventDefault, false);
//   window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
//   window.removeEventListener('touchmove', preventDefault, wheelOpt);
//   window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
// }

// if (document.getElementsByClassName("home-animation").length) {
//   window.disableScroll()
// }

// Selectively remove lazy loading based on class. Set the ".no-lazy" class on the <figure> element to have this work.

// document.querySelectorAll('.no-lazy img').forEach(function (img) {
//   img.loading = "eager";
// });

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {

    // Get computed colors
    const baseColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--wp--preset--color--base').trim();
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--wp--preset--color--accent').trim();
    const contrastColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--wp--preset--color--contrast').trim();
    const accentAltColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--wp--preset--color--accent-alt').trim();

    // GSAP

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(SplitText);

    // Basic fade up

    if (document.querySelector(".fade-up")) {
      const fadeUp = gsap.utils.toArray(".fade-up");

      gsap.utils.toArray(fadeUp).forEach((element) => {
        gsap.to(element, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
        });
      });
    }

    // Logo swipe

    if (document.querySelector(".site-logo")) {
      const logos = gsap.utils.toArray(".site-logo");

      logos.forEach((logo, index) => {
        // Update gradient ID to be unique
        const gradient = logo.querySelector("linearGradient");
        const uniqueId = `shimmer-${index}`;
        gradient.id = uniqueId;

        // Update the path to reference the new unique gradient
        const path = logo.querySelector("path");
        path.setAttribute("fill", `url(#${uniqueId})`);

        const tl = gsap.timeline({ paused: true });

        // Animate gradient points
        tl.to(gradient, {
          attr: { x1: 1, x2: 2 },
        });

        logo.addEventListener("mouseenter", () => tl.play());
        logo.addEventListener("mouseleave", () => tl.reverse());
      });
    }

    // Home hero split text

    if (document.querySelector(".home-hero-h1")) {
      const homeHero = document.querySelector(".home-hero-h1");
      const heroSplit = new SplitText(homeHero, { type: "words" });

      homeHero.style.visibility = "visible";

      gsap.from(heroSplit.words, {
        y: 50,
        autoAlpha: 0,
        stagger: 0.05,
      });
    }

    // Green cover section wave

    if (document.querySelector(".top-curve path")) {
      const topCurve = document.querySelector(".top-curve path");
      const topCurveTl = gsap.timeline({ repeat: -1, yoyo: true });
      topCurveTl.to(topCurve, {
        attr: {
          d: "M0 250 0 20C626 368 795-125 1438 121L1440 250Z",
        },
        duration: 15,
        ease: "sine.inOut",
      });
    }

    if (document.querySelector(".bottom-curve path")) {
      const bottomCurve = document.querySelector(".bottom-curve path");
      const bottomCurveTl = gsap.timeline({ repeat: -1, yoyo: true });
      bottomCurveTl.to(bottomCurve, {
        attr: {
          d: "M0 0V92C360 202 1083 202 1440 92V0",
        },
        duration: 10,
        ease: "sine.inOut",
      });
    }

    // Logo slider

    if (document.querySelector(".logo-slide")) {
      const track = document.querySelector(".logo-slide");
      const iconLogos = gsap.utils.toArray(".logo");
      // Measure total width of logos plus one extra gap to create a seamless loop
      const trackStyles = window.getComputedStyle(track);
      const trackStylesGap = parseFloat(trackStyles.gap);

      const firstLogo = iconLogos[0];
      const lastLogo = iconLogos[iconLogos.length - 1];
      const totalWidth =
        lastLogo.getBoundingClientRect().right -
        firstLogo.getBoundingClientRect().left +
        trackStylesGap; // Add one more gap to account for last logo of original set to first logo of cloned set

      // Clone logos
      iconLogos.forEach((logo) => {
        track.appendChild(logo.cloneNode(true));
      });

      const widthToDurationRatio = 120;
      const duration = totalWidth / widthToDurationRatio;

      const anim = gsap.to(track, {
        x: -totalWidth,
        duration: duration,
        ease: "none",
        repeat: -1,
      });

      // Handle arrow hovers
      const leftArrow = document.querySelector(".logo-left-arrow");
      const rightArrow = document.querySelector(".logo-right-arrow");

      function handleArrowHover(arrow, speed) {
        arrow.addEventListener("mouseenter", () =>
          gsap.to(anim, { timeScale: speed, duration: 0.3 })
        );
        arrow.addEventListener("mouseleave", () =>
          gsap.to(anim, { timeScale: 1, duration: 0.3 })
        );
      }

      handleArrowHover(leftArrow, -3);
      handleArrowHover(rightArrow, 3);
    }

    // About us blob

    if (document.querySelector(".about-us-blob")) {
      const aboutUsBlob = gsap.utils.toArray(".about-us-blob"),
        aboutUsBlobExclusion = gsap.utils.toArray(".about-us-blob-exclusion");
      gsap
        .timeline({
          scrollTrigger: {
            trigger: aboutUsBlob,
            start: "top 75%",
          },
        })
        .from(aboutUsBlob, {
          scale: 0,
          transformOrigin: "center",
          opacity: 0,
          duration: 2,
          ease: "elastic.out(0.75,0.5)",
        })
        .from(
          aboutUsBlobExclusion,
          {
            opacity: 0,
          },
          ">-1"
        )
        .to(aboutUsBlob, {
          attr: {
            d: "M 615.3 123.7 C 702.837 150.705 683.529 261.725 660.084 348.61 C 624.227 485.143 657.326 618.229 518.034 661.672 c -133.517 34.168 -217.729 -19.594 -290.823 -57.52 S 22.526 513.063 0.8 434 c -28.46 -150.352 149.007 -170.206 189.002 -266.745 C 218.764 101.746 237.666 9.852 359.4 2.7 c 118.4 -5.299 115.192 76.98 255.9 121 Z",
          },
          duration: 5,
          repeat: -1,
          ease: "sine.inOut",
          yoyo: true,
        });
    }

    // Contact blob

    if (document.querySelector(".contact-blob")) {
      const contactBlobPath = gsap.utils.toArray(".contact-blob path");

      gsap.to(contactBlobPath, {
        attr: {
          d: "M626 134.4c45.616 53.113 58.377 66.892 72.689 145.667 9.362 55.284-6.919 121.239-58.461 192.578-58.255 75.997-92.04 110.91-212.026 109.146-88.225-3.529-192.33-29.997-275.261-84.696C57.658 432.691 4.9 375.1.2 306.8-4 239.2 55.1 167.7 134.016 99.177 230.305 27.648 316.594 5.409 406.253 10.722c91.4 7 160.201 57.442 219.747 123.678Z",
        },
        duration: 5,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      });
    }

    if (document.querySelector(".svg-underline")) {
      const svgUnderline = gsap.utils.toArray(".svg-underline");

      svgUnderline.forEach((underline) => {
        const underlinePath = underline.querySelector("path");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: underline,
              start: "top 75%",
            },
          })
          .to(underlinePath, {
            attr: {
              d: "M0 1Q5 0 10 1L10 2Q5 1 0 2L0 1Z",
            },
          })
          .to(
            underlinePath,
            {
              attr: {
                d: "M0 0Q5 0 10 0L10 1Q5 1 0 1L0 0Z",
              },
              ease: "elastic.out(2,0.5)",
            },
            "<=0.3"
          );
      });
    }

    // How We Do It Blob pin

    if (document.querySelector(".how-pin")) {
      const pinSection = document.querySelector(".how-pin"),
        blobContainer = document.querySelector(".blob-container"),
        blobs = gsap.utils.toArray(".blob");

      const firstBlob = blobs[0];
      const lastBlob = blobs[blobs.length - 1];

      // Refined gap calculation
      const viewportWidth = window.innerWidth;
      const blobWidth = blobs[0].offsetWidth;
      const blobToVwEdge = (viewportWidth - blobWidth) / 2;
      // Adjust gap so second blob is exactly half showing
      const requiredGap = blobToVwEdge - blobWidth / 2;

      // Update container gap
      gsap.set(blobContainer, { gap: `${requiredGap}px` });

      // Recalculate total movement after gap is set
      const totalDistance =
        lastBlob.getBoundingClientRect().right -
        firstBlob.getBoundingClientRect().left;

      // Set initial states
      gsap.set(blobs[0], {
        y: 0,
        opacity: 1,
      });

      gsap.set(blobs.slice(1), {
        y: 300,
        opacity: 0.5,
      });

      const blobCarouselTl = gsap.timeline({ defaults: { ease: "none" } });

      // Calculate how much progress each section should take
      const progressPerSection = 1 / (blobs.length - 1);

      blobs.forEach((blob, i) => {
        fetch(
          window.location.origin +
          "/wp-content/themes/playsthatwork/assets/how-we-do-blob.svg"
        )
          .then((response) => response.text())
          .then((data) => {
            blob.insertAdjacentHTML("afterbegin", data);
          });

        if (i !== blobs.length - 1) {
          // Calculate position in timeline
          const startProgress = i * progressPerSection;

          // Animate container movement for this section
          blobCarouselTl.to(
            blobContainer,
            {
              x: -(
                (totalDistance - blobContainer.offsetWidth) *
                ((i + 1) / (blobs.length - 1))
              ),
              duration: progressPerSection,
            },
            startProgress
          );

          // Animate current blob down
          blobCarouselTl.to(
            blob,
            {
              y: 300,
              opacity: 0.5,
              duration: progressPerSection,
              ease: "power2.in",
            },
            startProgress
          );

          // Animate next blob up
          blobCarouselTl.to(
            blobs[i + 1],
            {
              y: 0,
              opacity: 1,
              duration: progressPerSection,
              ease: "power2.out",
            },
            startProgress
          );
        }
      });

      ScrollTrigger.create({
        trigger: pinSection,
        pin: true,
        scrub: 1,
        animation: blobCarouselTl,
        start: "center center",
        end: "+=2000",
      });
    }

    if (document.querySelector(".read-more")) {
      const readMoreGroup = gsap.utils.toArray(".read-more-group");

      readMoreGroup.forEach((group) => {
        const readMoreExpand = group.querySelector(".read-more-expand");
        const readMore = group.querySelector(".read-more");

        gsap.set(readMoreExpand, { height: 0 });

        let isExpanded = false;

        readMore.addEventListener("click", () => {
          const naturalHeight = readMoreExpand.scrollHeight;
          const height = isExpanded ? 0 : naturalHeight;

          gsap.to(readMoreExpand, {
            height: height,
            ease: "power2.inOut",
          });

          gsap.to(readMore, {
            "--read-more-rotate": isExpanded ? 45 : 225,
          });

          readMore.textContent = isExpanded ? "Read More" : "Read Less";

          isExpanded = !isExpanded;
        });
      });
    }

    // How We Do It Steps pin

    if (document.querySelector(".steps-pin")) {
      const stepsPinSection = document.querySelector(".steps-pin-section"),
        stepsPin = document.querySelector(".steps-pin"),
        stepsContainer = document.querySelector(".steps-container-inner"),
        steps = gsap.utils.toArray(".steps-container p"),
        stepsContentColumn = document.querySelector(".steps-content-column"),
        stepsContent = gsap.utils.toArray(".steps-content-column p");

      gsap.set(stepsContent[0], { opacity: 1, zIndex: 1 });

      gsap.set(steps[0], { color: accentAltColor });

      // gsap.set(stepsContainer, { "--height": "20%"})

      const stepsTl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

      // Add SVG blob
      const howWeDoBlobSvg = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M100 44.2827C100 69.2308 87.5706 100 62.5989 100C37.6271 100 0 69.2308 0 44.2827C0 19.2308 37.6271 0 62.5989 0C87.5706 0 100 19.2308 100 44.2827Z" /></svg>`;

      stepsContentColumn.insertAdjacentHTML("afterbegin", howWeDoBlobSvg);

      stepsSvg = stepsContentColumn.querySelector("svg path");

      // Store different path shapes for each step
      const pathShapes = [
        "M100 44.2827C100 69.2308 87.5706 100 62.5989 100C37.6271 100 0 69.2308 0 44.2827C0 19.2308 37.6271 0 62.5989 0C87.5706 0 100 19.2308 100 44.2827Z",
        "M100 55.1625C100 80.1147 71.1368 100 46.0924 100C21.048 100 0 80.1147 0 55.1625C0 30.1147 21.048 0 46.0924 0C71.1368 0 100 30.1147 100 55.1625Z",
        "M100 46.4088C100 71.3628 67.7323 100 42.7572 100C17.6823 100 0 71.3628 0 46.4088C0 21.3628 17.6823 0 42.7572 0C67.7323 0 100 21.3628 100 46.4088Z",
        "M100 46.7603C100 71.7063 75.4519 100 50.5233 100C25.4995 100 0 71.7063 0 46.7603C0 21.7063 25.4995 0 50.5233 0C75.4519 0 100 21.7063 100 46.7603Z",
        "M100 37.3641C100 62.3641 87.9902 100 62.9902 100C37.9902 100 0 62.3641 0 37.3641C0 12.3641 37.9902 0 62.9902 0C87.9902 0 100 12.3641 100 37.3641Z"
      ];

      // For each step, add animations for both columns simultaneously
      steps.forEach((step, i) => {
        // First step is already styled, so skip setting it
        if (i > 0) {
          const initialOpacity = Math.max(0.2, 1 - (i * 0.2)); // Min opacity of 0.2

          gsap.set(step, { opacity: initialOpacity, scale: 0.6 });

          // Create a label for this step
          stepsTl.addLabel(`step${i}`);

          // Animate height of container
          stepsTl.to(stepsContainer, {
            "--height": `${(i + 1) * 20}%`
          }, `step${i}`);

          // Hide previous content and show current content
          stepsTl.to(stepsContent[i - 1], { opacity: 0, zIndex: 0, y: 100 }, `step${i}`);
          stepsTl.to(stepsContent[i], { opacity: 1, zIndex: 1, y: 0 }, `step${i}`);

          // Animate blobs
          stepsTl.to(stepsSvg, {
            attr: { d: pathShapes[i] }
          }, `step${i}`);

          steps.forEach((innerStep, j) => {
            const distance = Math.abs(j - i);
            const newOpacity = Math.max(0.2, 1 - (distance * 0.2)); // Min opacity of 0.2

            // Animate active step
            if (j === i) {
              stepsTl.to(innerStep, { color: accentAltColor, opacity: 1, scale: 1 }, `step${i}`);
            } else {
              stepsTl.to(innerStep, { color: contrastColor, opacity: newOpacity, scale: 0.6 }, `step${i}`);
            }
          });
        }
      });

      ScrollTrigger.create({
        trigger: stepsPin,
        animation: stepsTl,
        pin: true,
        start: "center center",
        end: "+=2000",
        scrub: 1,
      });

      // Keep scrolling

      const stepsScrolling = document.querySelector(".steps-scrolling"),
        stepsScrollingTl = gsap.timeline({ repeat: -1, defaults: { ease: "power4.inOut" } });

      stepsScrollingTl
        .to(stepsScrolling, {
          "--y": "-100%"
        }).to(stepsScrolling, {
          "--y": "50%"
        }).to(stepsScrolling, {
          "--y": "-100%"
        }).to(stepsScrolling, {
          "--y": "-50%"
        })

      ScrollTrigger.create({
        trigger: stepsPinSection,
        start: "bottom bottom",
        onEnter: () => gsap.to(stepsScrolling, { opacity: 0 }),
        onLeaveBack: () => gsap.to(stepsScrolling, { opacity: 1 }),
      });
    }

    // Draw

    if (document.querySelector(".people-svg")) {
      const peopleSvg = gsap.utils.toArray(".people-svg");

      peopleSvg.forEach((svg) => {
        const accentPath = svg.querySelectorAll('path[stroke="var(--wp--preset--color--accent)"]');
        const basePath = svg.querySelectorAll('path[stroke="var(--wp--preset--color--base)"]');

        gsap
          .timeline({
            scrollTrigger: {
              trigger: svg,
              start: "top 75%",
            },
          })
          .from(accentPath, {
            drawSVG: "0%",
            duration: 3,
          })
          .from(
            basePath,
            {
              opacity: 0,
              duration: 3,
            },
            "<"
          );
      });

      // gsap.from(".draw-svg", {
      //   drawSVG: "0%",
      //   duration: 5,
      //   scrollTrigger: {
      //     trigger: ".draw-svg",
      //     start: "top 75%",
      //   },
      // });
    }

    // Responsive matchMedia

    let mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 1000px)",
        isDesktop: "(min-width: 1001px)",
      },
      (context) => {
        let { isMobile, isDesktop } = context.conditions;

        if (isDesktop) {
          const buttons = gsap.utils.toArray(
            ".wp-block-button__link.wp-element-button"
          );

          buttons.forEach((button) => {
            const hover = gsap.to(button, {
              "--button-circle-stop": "100%",
              duration: 0.25,
              paused: true,
            });

            button.addEventListener("mouseenter", () => hover.play());
            button.addEventListener("mouseleave", () => hover.reverse());
          });
        }
      },
      false
    );

    // Swiper - blog

    if (document.querySelectorAll(".blog-swiper")) {
      var swiper = new Swiper(".blog-swiper", {
        spaceBetween: 80,
        grabCursor: true,
        touchEventsTarget: "container",
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1000: {
            slidesPerView: 2,
          },
        },
      });
    }

    // Word flip

    if (document.querySelector(".word-flip")) {
      // Clone the first word and append it to the end
      const wordContainer = document.querySelector(".word-flip div");
      const words = gsap.utils.toArray(".word-flip div span");
      const firstWordClone = words[0].cloneNode(true);
      wordContainer.appendChild(firstWordClone);

      // Get the updated array of words
      const allWords = gsap.utils.toArray(".word-flip div span");

      let wordFlipTl;

      // Function to update container height and animation
      function updateWordFlip() {
        // Update container height to match line height
        const containerHeight = words[0].offsetHeight;
        wordContainer.style.height = `${containerHeight}px`;

        // Clear existing animation and reset position
        if (wordFlipTl) {
          wordFlipTl.revert();
        }

        // Create new animation
        wordFlipTl = gsap.timeline({ repeat: -1 });

        words.forEach((word, index) => {
          wordFlipTl.to(allWords, {
            yPercent: -100 * (index + 1),
            delay: 1,
          });
        });

        wordFlipTl.set(allWords, {
          yPercent: 0
        });
      }

      updateWordFlip();

      // Add resize listener with debounce for better performance
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateWordFlip, 250);
      });
    }
  });
});
