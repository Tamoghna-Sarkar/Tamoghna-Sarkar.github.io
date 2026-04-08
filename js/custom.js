$(window).on('load', function() {
    "use strict";

    /*=========================================================================
        Preloader
    =========================================================================*/
    $("#preloader").delay(350).fadeOut('slow');
    // Because only Chrome supports offset-path, feGaussianBlur for now
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if(!isChrome) {
        document.getElementsByClassName('infinityChrome')[0].style.display = "none";
        document.getElementsByClassName('infinity')[0].style.display = "block";
    }

    /*=========================================================================
     Wow Initialize
     =========================================================================*/
    // Here will be the WoW Js implementation.
    setTimeout(function(){new WOW().init();}, 0);

    var dynamicDelay = [
      200,
      400,
      600,
      800,
      1000,
      1200,
      1400,
      1600,
      1800,
      2000
    ];
    var fallbackValue = "200ms";
  
    $(".blog-item.wow").each(function(index) {
      $(this).attr("data-wow-delay", typeof dynamicDelay[index] === 'undefined' ? fallbackValue : dynamicDelay[index] + "ms");
    });

    /*=========================================================================
     Isotope
     =========================================================================*/
    $('.portfolio-filter').on( 'click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.portfolio-filter').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'li', function() {
            $buttonGroup.find('.current').removeClass('current');
            $( this ).addClass('current');
        });
    });

    var $container = $('.portfolio-wrapper');
    $container.imagesLoaded( function() {
      $('.portfolio-wrapper').isotope({
          // options
          itemSelector: '[class*="col-"]',
          percentPosition: true,
          masonry: {
              // use element for option
              columnWidth: '[class*="col-"]'
          }
      });
    });

    var bolbyPopup = function(){
      /*=========================================================================
              Magnific Popup
      =========================================================================*/
      $('.work-image').magnificPopup({
        type: 'image',
        closeBtnInside: false,
        mainClass: 'my-mfp-zoom-in',
      });

      $('.work-content').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: false,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
      });

      $('.work-video').magnificPopup({
        type: 'iframe',
        closeBtnInside: false,
        iframe: {
            markup: '<div class="mfp-iframe-scaler">'+
                      '<div class="mfp-close"></div>'+
                      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '</div>', 

            patterns: {
              youtube: {
                index: 'youtube.com/',

                id: 'v=',

                src: 'https://www.youtube.com/embed/%id%?autoplay=1'
              },
              vimeo: {
                index: 'vimeo.com/',
                id: '/',
                src: '//player.vimeo.com/video/%id%?autoplay=1'
              },
              gmaps: {
                index: '//maps.google.',
                src: '%id%&output=embed'
              }

            },

            srcAction: 'iframe_src',
          }
      });

      $('.gallery-link').on('click', function () {
          $(this).next().magnificPopup('open');
      });

      $('.gallery').each(function () {
          $(this).magnificPopup({
              delegate: 'a',
              type: 'image',
              closeBtnInside: false,
              gallery: {
                  enabled: true,
                  navigateByImgClick: true
              },
              fixedContentPos: false,
              mainClass: 'my-mfp-zoom-in',
          });
      });
    }

    bolbyPopup();

    /*=========================================================================
     Infinite Scroll
     =========================================================================*/
    var curPage = 1;
    var pagesNum = $(".portfolio-pagination").find("li a:last").text();   // Number of pages

    $container.infinitescroll({
        itemSelector: '.grid-item',
        nextSelector: '.portfolio-pagination li a',
        navSelector: '.portfolio-pagination',
        extraScrollPx: 0,
        bufferPx: 0,
        maxPage: 6,
        loading: {
            finishedMsg: "No more works",
            msgText: '',
            speed: 'slow',
            selector: '.load-more',
        }
    },
    // trigger Masonry as a callback
    function( newElements ) {

      var $newElems = $( newElements );
      $newElems.imagesLoaded(function(){  
        $newElems.animate({ opacity: 1 });
        $container.isotope( 'appended', $newElems );
      });

      bolbyPopup();

      // Check last page
      curPage++;
      if(curPage == pagesNum) {
        $( '.load-more' ).remove();
      }

    });

    $container.infinitescroll( 'unbind' );

    $( '.load-more .btn' ).on('click', function() {
      $container.infinitescroll( 'retrieve' );
      // display loading icon
      $( '.load-more .btn i' ).css('display', 'inline-block');
      $( '.load-more .btn i' ).addClass('fa-spin');

      $(document).ajaxStop(function () {
        setTimeout(function(){
               // hide loading icon
          $( '.load-more .btn i' ).hide();
        }, 1000);
      });
      return false;
    });

    /* ======= Mobile Filter ======= */

    // bind filter on select change
    $('.portfolio-filter-mobile').on( 'change', function() {
      // get filter value from option value
      var filterValue = this.value;
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
    });

    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
});

$(document).on('ready', function() {
    "use strict";

    /*=========================================================================
                Slick Slider
    =========================================================================*/
    $('.testimonials-wrapper').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000
    });

});

$(function(){
    "use strict";

    /*=========================================================================
            Mobile Menu Toggle
    =========================================================================*/
    $('.menu-icon button').on( 'click', function() {
        $('header.desktop-header-1, main.content, header.mobile-header-1').toggleClass('open');
    });

    $('main.content').on( 'click', function() {
        $('header.desktop-header-1, main.content, header.mobile-header-1').removeClass('open');
    });

    $('.vertical-menu li a').on( 'click', function() {
        $('header.desktop-header-1, main.content, header.mobile-header-1').removeClass('open');
    });

    $('.menu-icon button').on( 'click', function() {
        $('header.desktop-header-2, main.content-2, header.mobile-header-2').toggleClass('open');
    });

    $('main.content-2').on( 'click', function() {
        $('header.desktop-header-2, main.content-2, header.mobile-header-2').removeClass('open');
    });

    $('.vertical-menu li a').on( 'click', function() {
        $('header.desktop-header-2, main.content-2, header.mobile-header-2').removeClass('open');
    });

    /*=========================================================================
     One Page Scroll with jQuery
     =========================================================================*/
    $('a[href^="#"]:not([href="#"]').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 800, 'easeInOutQuad');
      event.preventDefault();
    });

    /*=========================================================================
     Parallax layers
     =========================================================================*/
     if ($('.parallax').length > 0) { 
      var scene = $('.parallax').get(0);
      var parallax = new Parallax(scene, { 
        relativeInput: true,
      });
    }

     /*=========================================================================
     Text Rotating
     =========================================================================*/
    $(".text-rotating").Morphext({
        animation: "bounceIn",
        separator: ",",
        speed: 4000,
        complete: function () {
        }
    });

    $('.vertical-menu li a').addClass('nav-link');

    $("body").scrollspy({ target: ".scrollspy"});

    $('.count').counterUp({
      delay: 10,
      time: 2000
    });

    if ($('.skill-item').length > 0) { 
      var waypoint = new Waypoint({
        element: document.getElementsByClassName('skill-item'),
        handler: function(direction) {
          
          $('.progress-bar').each(function() {
            var bar_value = $(this).attr('aria-valuenow') + '%';                
            $(this).animate({ width: bar_value }, { easing: 'linear' });
          });

          this.destroy()
        },
        offset: '50%'
      });
    }

    var list = document.getElementsByClassName('spacer');

    for (var i = 0; i < list.length; i++) {
      var size = list[i].getAttribute('data-height');
      list[i].style.height = "" + size + "px";
    }

     var list = document.getElementsByClassName('data-background');

     for (var i = 0; i < list.length; i++) {
       var color = list[i].getAttribute('data-color');
       list[i].style.backgroundColor = "" + color + "";
     }

    $( ".submenu" ).before( '<i class="ion-md-add switch"></i>' );

    $(".vertical-menu li i.switch").on( 'click', function() {
        var $submenu = $(this).next(".submenu");
        $submenu.slideToggle(300);
        $submenu.parent().toggleClass("openmenu");
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 350) {
            $('#return-to-top').fadeIn(200);
        } else {
            $('#return-to-top').fadeOut(200);
        }
    });
    $('#return-to-top').on('click', function(event) {
      event.preventDefault();
        $('body,html').animate({
            scrollTop : 0
        }, 400);
    });

});

$(function() {
    "use strict";

    if (!document.getElementById('latest-news-styles')) {
        var style = document.createElement('style');
        style.id = 'latest-news-styles';
        style.textContent = '\n#news .latest-news-wrap{max-width:1100px;margin:0 auto}'+
        '\n#news .latest-news-sub{color:#b8b6d9;margin:0 0 30px;max-width:760px}'+
        '\n#news .news-ticker{display:flex;gap:18px;align-items:center;overflow:hidden;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:12px 18px;margin-bottom:28px;backdrop-filter:blur(6px)}'+
        '\n#news .news-live{background:#FF4C60;color:#fff;font-weight:700;font-size:12px;padding:6px 10px;border-radius:999px;letter-spacing:.08em;white-space:nowrap;box-shadow:0 0 0 8px rgba(255,76,96,.12);flex:0 0 auto}'+
        '\n#news .news-ticker-window{overflow:hidden;white-space:nowrap;width:100%}'+
        '\n#news .news-ticker-track{display:inline-flex;align-items:center;white-space:nowrap;animation:latestNewsMarquee 26s linear infinite;will-change:transform}'+
        '\n#news .news-ticker-track span{color:#dddaf7;font-size:15px;margin-right:34px;flex:0 0 auto}'+
        '\n#news .news-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-bottom:22px;align-items:stretch}'+
        '\n#news .news-card{position:relative;background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.015));border:1px solid rgba(255,255,255,.08);border-radius:26px;padding:24px 24px 22px;overflow:hidden;min-height:250px;box-shadow:0 12px 40px rgba(0,0,0,.20)}'+
        '\n#news .news-card:before{content:"";position:absolute;inset:auto auto -40px -20px;width:160px;height:160px;border-radius:50%;filter:blur(35px);opacity:.20;pointer-events:none}'+
        '\n#news .news-card.red:before{background:#FF4C60}'+
        '\n#news .news-card.yellow:before{background:#FFD15C}'+
        '\n#news .news-card.purple:before{background:#6C6CE5}'+
        '\n#news .news-card.teal:before{background:#44D7B6}'+
        '\n#news .news-accent{position:absolute;left:0;right:0;bottom:0;height:4px;background:linear-gradient(90deg,#FF4C60,#FFD15C,#6C6CE5,#44D7B6);opacity:.9}'+
        '\n#news .news-eyebrow{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px}'+
        '\n#news .news-pill{display:inline-block;padding:6px 10px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.04em;background:rgba(255,255,255,.08);color:#fff}'+
        '\n#news .news-year{color:#b8b6d9;font-size:13px;font-weight:600}'+
        '\n#news .news-card h3{font-size:22px;line-height:1.3;margin:6px 0 10px;color:#fff}'+
        '\n#news .news-card p{margin:0 0 14px;color:#eceafd}'+
        '\n#news .news-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}'+
        '\n#news .news-tag{font-size:12px;padding:6px 10px;border-radius:999px;color:#f5f4ff;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08)}'+
        '\n#news .news-card.wide{grid-column:span 3;min-height:190px}'+
        '\n#news .news-list{margin:12px 0 0 0;padding-left:18px;color:#eceafd}'+
        '\n#news .news-list li{margin:8px 0}'+
        '\n#news .news-dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:#FFD15C;margin-right:8px;box-shadow:0 0 0 8px rgba(255,209,92,.12);vertical-align:middle}'+
        '\n@keyframes latestNewsMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}'+
        '\n@media (max-width:980px){#news .news-grid{grid-template-columns:1fr 1fr}#news .news-card.wide{grid-column:span 2}}'+
        '\n@media (max-width:680px){#news .news-grid{grid-template-columns:1fr}#news .news-card.wide{grid-column:span 1}#news .news-ticker-track{animation-duration:22s}}';
        document.head.appendChild(style);
    }

    if (!document.getElementById('news')) {
        var newsHtml = '\n<section id="news">'+
        '\n  <div class="container latest-news-wrap">'+
        '\n    <h2 class="section-title wow fadeInUp">Latest News</h2>'+
        '\n    <div class="spacer" data-height="60"></div>'+
        '\n    <p class="latest-news-sub wow fadeInUp">Recent highlights from 2025 onward across awards, publications, internships, and ongoing research.</p>'+
        '\n    <div class="news-ticker wow fadeInUp">'+
        '\n      <span class="news-live">LIVE</span>'+
        '\n      <div class="news-ticker-window">'+
        '\n        <div class="news-ticker-track">'+
        '\n          <span>Confluent Kafka PhD Fellowship</span><span>NASA JPL Student Research Candidate, Preliminary</span><span>WiOpt 2026 accepted paper</span><span>IEEE MILCOM 2025 publication</span><span>Personalized FL with Prof. Carlee Joe-Wong</span><span>Cloud systems, network optimization, and intermittent server resilience</span>'+
        '\n          <span>Confluent Kafka PhD Fellowship</span><span>NASA JPL Student Research Candidate, Preliminary</span><span>WiOpt 2026 accepted paper</span><span>IEEE MILCOM 2025 publication</span><span>Personalized FL with Prof. Carlee Joe-Wong</span><span>Cloud systems, network optimization, and intermittent server resilience</span>'+
        '\n        </div>'+
        '\n      </div>'+
        '\n    </div>'+
        '\n    <div class="news-grid">'+
        '\n      <section class="news-card red wow fadeInUp">'+
        '\n        <div class="news-eyebrow"><span class="news-pill">AWARD</span><span class="news-year">2025</span></div>'+
        '\n        <h3>Confluent Kafka PhD Fellowship</h3>'+
        '\n        <p>Selected as a Confluent Kafka PhD Fellow, a highly selective recognition for doctoral research advancing distributed streaming systems, cloud infrastructure, and the systems and networking foundations behind Kafka-scale platforms.</p>'+
        '\n        <div class="news-tags"><span class="news-tag">Fellowship</span><span class="news-tag">Distributed Systems</span><span class="news-tag">Streaming Infrastructure</span><span class="news-tag">Cloud Systems</span></div>'+
        '\n        <div class="news-accent"></div>'+
        '\n      </section>'+
        '\n      <section class="news-card yellow wow fadeInUp" data-wow-delay="0.1s">'+
        '\n        <div class="news-eyebrow"><span class="news-pill">AWARD</span><span class="news-year">Fall ’26</span></div>'+
        '\n        <h3>NASA JPL Student Research Candidate, Preliminary</h3>'+
        '\n        <p>Selected as a preliminary student research candidate for Fall ’26.</p>'+
        '\n        <div class="news-tags"><span class="news-tag">NASA JPL</span><span class="news-tag">Research Candidate</span><span class="news-tag">Preliminary</span></div>'+
        '\n        <div class="news-accent"></div>'+
        '\n      </section>'+
        '\n      <section class="news-card purple wow fadeInUp" data-wow-delay="0.2s">'+
        '\n        <div class="news-eyebrow"><span class="news-pill">PUBLICATION</span><span class="news-year">2026</span></div>'+
        '\n        <h3>Joint Network-and-Server Congestion in Multi-Source Traffic Allocation: A Convex Formulation and Price-Based Decentralization</h3>'+
        '\n        <p>Accepted at IEEE/ACM WiOpt 2026. This work studies principled traffic allocation under joint network and server congestion, with a convex formulation and price-based decentralization.</p>'+
        '\n        <div class="news-tags"><span class="news-tag">WiOpt 2026</span><span class="news-tag">Cloud Systems</span><span class="news-tag">Optimization</span></div>'+
        '\n        <div class="news-accent"></div>'+
        '\n      </section>'+
        '\n      <section class="news-card teal wow fadeInUp">'+
        '\n        <div class="news-eyebrow"><span class="news-pill">PUBLICATION</span><span class="news-year">2025</span></div>'+
        '\n        <h3>Keeping a Target “On the Radar”, Using Model-Based Group Sensor Selection Algorithms</h3>'+
        '\n        <p>Published at IEEE MILCOM 2025, on acoustic localization and sensor selection under constrained tactical networking conditions.</p>'+
        '\n        <div class="news-tags"><span class="news-tag">MILCOM 2025</span><span class="news-tag">IoBT</span><span class="news-tag">Acoustic Localization</span></div>'+
        '\n        <div class="news-accent"></div>'+
        '\n      </section>'+
        '\n      <section class="news-card yellow wow fadeInUp" data-wow-delay="0.1s">'+
        '\n        <div class="news-eyebrow"><span class="news-pill">RESEARCH</span><span class="news-year">2025–Present</span></div>'+
        '\n        <h3>Personalized Federated Learning at CMU</h3>'+
        '\n        <p>Working on personalized FL directions with <strong>Prof. Carlee Joe-Wong</strong>, focusing on heterogeneous clients and practical distributed learning systems.</p>'+
        '\n        <div class="news-tags"><span class="news-tag">CMU</span><span class="news-tag">Prof. Carlee Joe-Wong</span><span class="news-tag">Federated Learning</span></div>'+
        '\n        <div class="news-accent"></div>'+
        '\n      </section>'+
        '\n      <section class="news-card purple wow fadeInUp" data-wow-delay="0.2s">'+
        '\n        <div class="news-eyebrow"><span class="news-pill">RESEARCH INTERNSHIP</span><span class="news-year">Summer 2025</span></div>'+
        '\n        <h3>Confluent Research Internship</h3>'+
        '\n        <p>Research on Kafka and cloud-scale distributed infrastructure, including network-aware path selection, system-level optimization, and resilience questions tied to intermittent servers and dynamic cloud conditions.</p>'+
        '\n        <div class="news-tags"><span class="news-tag">Kafka</span><span class="news-tag">Cloud</span><span class="news-tag">Network Optimization</span><span class="news-tag">Intermittent Servers</span></div>'+
        '\n        <div class="news-accent"></div>'+
        '\n      </section>'+
        '\n      <section class="news-card red wide wow fadeInUp">'+
        '\n        <div class="news-eyebrow"><span class="news-pill">WHAT\'S COOKING?</span><span class="news-year">Now</span></div>'+
        '\n        <h3><span class="news-dot"></span>What’s Cooking?</h3>'+
        '\n        <ul class="news-list"><li>Systems work around Kafka routing and control</li><li>Multimodal acoustic plus video localization dataset development</li><li>Personalized FL systems and modeling directions</li></ul>'+
        '\n        <div class="news-accent"></div>'+
        '\n      </section>'+
        '\n    </div>'+
        '\n  </div>'+
        '\n</section>';

        $('#research').before(newsHtml);
        $('.spacer').each(function() {
            var size = this.getAttribute('data-height');
            this.style.height = '' + size + 'px';
        });
        setTimeout(function(){new WOW().init();}, 0);
    }

    if ($('.desktop-header-3 .navbar-nav a[href="#news"]').length === 0) {
        var $experienceItem = $('.desktop-header-3 .navbar-nav a[href="#experience"]').closest('li');
        if ($experienceItem.length) {
            $experienceItem.after('<li class="nav-item"><a href="#news" class="nav-link">News</a></li>');
        }
    }
});
