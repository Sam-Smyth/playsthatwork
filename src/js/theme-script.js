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

    gsap.utils.toArray(".fade-up").forEach((element) => {
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

    // Logo swipe

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

    // Home hero split text

    const homeHero = document.querySelector(".home-hero-h1");
    const heroSplit = new SplitText(homeHero, { type: "words" });

    homeHero.style.visibility = "visible";

    gsap.from(heroSplit.words, {
      y: 50,
      autoAlpha: 0,
      stagger: 0.05,
    });

    // Green cover section wave

    const topCurve = document.querySelector(".top-curve path");
    const topCurveTl = gsap.timeline({ repeat: -1, yoyo: true });

    topCurveTl.to(topCurve, {
      attr: {
        d: "M0 250 0 20C626 368 795-125 1438 121L1440 250Z",
      },
      duration: 15,
      ease: "sine.inOut",
    });

    const bottomCurve = document.querySelector(".bottom-curve path");
    const bottomCurveTl = gsap.timeline({ repeat: -1, yoyo: true });

    bottomCurveTl.to(bottomCurve, {
      attr: {
        d: "M0 0V92C360 202 1083 202 1440 92V0",
      },
      duration: 10,
      ease: "sine.inOut",
    });

    // Logo slider

    const track = document.querySelector(".logo-slide");
    const iconLogos = gsap.utils.toArray(".logo");

    if (track) {
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

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".about-us-blob",
          start: "top 75%",
        },
      })
      .from(".about-us-blob", {
        scale: 0,
        transformOrigin: "center",
        opacity: 0,
        duration: 2,
        ease: "elastic.out(0.75,0.5)",
      })
      .from(".about-us-blob-exclusion", {
        opacity: 0,
      }, ">-1")
      .to(".about-us-blob", {
        attr: {
          d: "M 615.3 123.7 C 702.837 150.705 683.529 261.725 660.084 348.61 C 624.227 485.143 657.326 618.229 518.034 661.672 c -133.517 34.168 -217.729 -19.594 -290.823 -57.52 S 22.526 513.063 0.8 434 c -28.46 -150.352 149.007 -170.206 189.002 -266.745 C 218.764 101.746 237.666 9.852 359.4 2.7 c 118.4 -5.299 115.192 76.98 255.9 121 Z",
        },
        duration: 5,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      });

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
