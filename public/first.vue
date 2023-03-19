<html>

<head>
    <meta charset="UTF-8">
    <title>Rafflestore</title>
    <link href="/app.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="/fonts/fonts.min.css" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <meta name="description" content="Rafflestore">
    <meta property="og:title" content="Rafflestore" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://rafflestore.com" />
    <meta property="og:image" content="https://rafflestore.com/img/forsocialmedia.jpg" />
    <meta property="og:description" content="Rafflestore">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" value="@rafflestore">
    <meta name="twitter:title" value="Rafflestore ">
    <meta name="twitter:description" content="Rafflestore">
    <meta name="twitter:image" value="https://rafflestore.com/img/forsocialmedia.jpg'">
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-119594975-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-119594975-1');
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
</head>

<body>
    <header class="notfrontpage">
        <div class="con">
            <div class="navimg">
                <a href="/">
                    <img src="https://rafflestore.ams3.cdn.digitaloceanspaces.com/rafflestoreimg.png"> </a>
            </div>
            <div class="handle">
                <span>menu</span>
            </div>
            <div class="handling">
                <div class="info">
                    <div v-if="login === true" class="loggedin">
                        <div class="buttons">
                            <a href="/legitcheck" class="legitchecks">Legit check</a>
                            <a href="/addproduct">Create Raffle</a>
                        </div>
                        <div class="userdiv">
                            <div class="userimg">
                                <a href="/customer">
                                    <img :src="userdata['profileimage']"> </a>
                            </div>
                            <div class="userinfo">
                                <span v-html="userdata.fullname.firstname + ' ' + userdata.fullname.surname"></span>
                                <div class="fix">
                                   <p class="coins">Coins: {{Math.floor(coi)}}</p>                                     <div class="spacer"></div>
                                    <div class="spacer"></div>
                                    <a href="/customer" class="customer">Profile</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="login">
                        <div class="fix">
                        <a href="/login">Sign In</a>                             <div class="spacer"></div><div class="spacer"> </div>
                            <a href="/register">Register</a>
                            <div class="userlogin">
                                <form action="/login" method="POST" class="loginform" novalidate>
                                    <div class="before"></div>
                                    <h1>Sign in</h1>
                                    <div class="loginresponse"></div>
                                    <input type="text" name="email" placeholder="E-Mail" required>
                                    <input type="password" name="password" placeholder="Password" required>
                                    <input type="submit" value="Sign in" class="submit">
                                    <div class="forgott">
                                        <a href="/forgotpassword">Forgot password</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu">
            <div class="con">
                <ul class="big">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/allraffles">All raffles</a>
                    </li>
                    <li>
                        <a href="/dice">Dice</a>
                    </li>
                    <li>
                        <a href="/information">Information</a>
                    </li>
                </ul>
                <ul class="small">
                    <li>
                        <a href="/information#faq">Help</a>
                    </li>
                    <li>
                        <a href="/about">About Us</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <section id="hero">
        <div class="con">
            <div class="text">
                <div class="fix">
                    <img src="https://rafflestore.ams3.cdn.digitaloceanspaces.com/rafflestoreimg.png">
                    <span>Are you
                        <strong class="green"> lucky </strong> or are you you gonna
                        <strong class="red">secure</strong> it?</span>
                    <div class="links">
                        <a href="/register">register</a>
                        <a href="/login">Login</a>
                    </div>
                </div>
            </div>
            <div class="image">
                <img src="img/shoe.png">
            </div>
            <div class="tostore">
                <a href="/store">Continue to store</a>
            </div>
        </div>


    </section>
    <script src="js/main.js"></script>
</body>

</html>