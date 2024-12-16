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

      const widthToDurationRatio = 175;
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

    // Draw

    if (document.querySelector(".people-svg")) {
      const peopleSvg = gsap.utils.toArray(".people-svg");

      peopleSvg.forEach((svg) => {
        const orangePath = svg.querySelectorAll('path[stroke="#F4A259"]');
        const whitePath = svg.querySelectorAll('path[stroke="#EDFCFC"]');

        gsap
          .timeline({
            scrollTrigger: {
              trigger: svg,
              start: "top 75%",
            },
          })
          .from(orangePath, {
            drawSVG: "0%",
            duration: 3,
          })
          .from(
            whitePath,
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
  });
});
