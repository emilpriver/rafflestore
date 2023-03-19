<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{pagetitle}}</title>
    <link rel="icon" type="image/png" href="/img/logo.png" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="Rafflestore">
    <meta property="og:title" content="Rafflestore" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://rafflestore.com" />
    <meta property="og:image" content="https://www.rafflestore.com/img/forsocialmedia.jpg" />
    <meta property="og:description" content="Rafflestore">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" value="@rafflestore">
    <meta name="twitter:title" value="Rafflestore ">
    <meta name="twitter:description" content="Rafflestore">
    <meta name="twitter:image" :value="https://www.rafflestore.com/img/forsocialmedia.jpg">
    <meta name="google-site-verification" content="cKDjUw6K_vdWvcaKGfgRJGXHdq0EmaDMiXVL8gyUwUk" />
    <meta name="msvalidate.01" content="D70C5077A23D1B5B5A8C967BCE3EEB84" />
    
    <meta name="theme-color" content="#fff">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-128520670-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-128520670-1');
    </script>
    </script>
<!-- Smartsupp Live Chat script -->
<script type="text/javascript">
    var _smartsupp = _smartsupp || {};
    _smartsupp.key = 'b7249a0e86c8743d04560535867fff7d896d363a';
    window.smartsupp||(function(d) {
      var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
      s=d.getElementsByTagName('script')[0];c=d.createElement('script');
      c.type='text/javascript';c.charset='utf-8';c.async=true;
      c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
    })(document);
    </script>
    <!-- Facebook Pixel Code -->
    <script>
        ! function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '552576185104678');
        fbq('track', 'PageView');
    </script>
    <noscript>
        <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=552576185104678&ev=PageView&noscript=1"
        />
    </noscript>
    <!-- End Facebook Pixel Code -->
    <!-- Styles -->
    <link href="/app.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="/fonts/fonts.min.css" />
    <link href="/css/owl.carousel.css" rel="stylesheet" type="text/css">
    <link href="/css/fontawesome-all.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="/css/jquery-base.css">
    <!-- Scripts -->
    <script>
        function GetTimeLeft(endtime, datenow) {
            $(function () {
                $("#countdowntimer").countdowntimer({
                    startDate: datenow,
                    dateAndTime: endtime,
                });
            });
        }
    </script>

</head>

<body>
    <!--vue-ssr-outlet-->


    <footer>
        <div class="con">
            <div class="col links">
                <div class="content">
                    <a href="/contact">Contact</a>
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms & conditions</a>
                    <a href="/information#faq">FAQ</a>
                </div>
            </div>
            <div class="col socials">
                <div class="content">
                    <a href="https://www.facebook.com/rafflestorecom" target="_blank">
                        <i class="fab fa-facebook"></i>
                        <span>Facebook</span>
                    </a>
                    <a href="https://twitter.com/rafflestore" target="_blank">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </a>
                    <a href="https://www.instagram.com/rafflestorecom/">
                        <i class="fab fa-instagram"></i>
                        <span>Instagram</span>
                    </a>
                </div>
            </div>
            <div class="col subscribe">
                <div class="content">
                    <span>Subscribe to our newsletter</span>
                    <form action="/subscribe" method="POST" class="subscribeform" novalidate>
                        <input type="text" placeholder="Email Address" name="email">
                        <input type="submit" value="ok" class="sub-submit">
                    </form>
                </div>
            </div>
            <div class="col address">
                <div class="content">
                    <span>
                        &copy; Rafflestore 2018
                    </span>
                    <span>
                    
                        <a href="mailto:support@rafflestore.com">support@rafflestore.com</a>
                    </span>
                </div>
            </div>
        </div>
    </footer>
    <script src="/js/jquery.js"></script>
    <script src="/js/debounce.js"></script>
    <script src="/js/jquery-ui.js"></script>
    <script src="/js/countdown.js"></script>
    <script src="/js/exif.js"></script>
    <script src="/js/image_rotation.js"></script>
    <script src="/js/owl.js"></script>
    <script src="/js/owl-settings.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/form-filters.js"></script>
    <script src="/js/product-images.js"></script>
    <script src="/js/sellproduct.js"></script>
    <script src="/js/search.js"></script>
</body>

</html>
