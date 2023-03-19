<div id="app">
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
                                <div class="userdiv"><a href="/reportbug"><img src="/img/bug.png" /></a>
                                    <div class="userimg">
                                        <a href="/customer">
                                            <img :src="userdata['profileimage']"> </a>
                                    </div>
                                    <div class="userinfo">
                                        <span v-html="userdata.fullname.firstname + ' ' + userdata.fullname.surname"></span>
                                        <div class="fix">
                                            <p class="coins">Coins: {{Math.floor(coi)}}</p>
                                            <div class="spacer"></div>
                                            <a href="/customer" class="customer">Profile</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="login">
                                <div class="fix">
                                    <a href="/reportbug"><img src="/img/bug.png" /></a><a href="/login">Sign In</a>
                                    <div class="spacer"></div>
                                    <a href="/register">Register</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu">
                    <div class="con">
                        <ul class="big">
                            <li class="active">
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
                            <li v-if="login === true" class="signout"><a href="/logout">Sign Out</a></li>
                        </ul>
                    </div>
                </div>
            </header>
    <section id="privacy">
        <div class="con">
            <h1>Privacy</h1>
            <div class="privacyContent">
                 <h3>PRIVACY POLICY</h3>
               <span>We are fully committed to protecting users’ private information when they use the Rafflestore website, and have described to you in this Privacy Policy the ways in which we may use, disclose, and store users’ personal information made available to us through your use of our website. By using this website in any way, you agree to be legally bound by the terms of this Privacy Policy and agree to the way we use and disclose your personal information. If you are not in complete agreement with this policy, you must exit this website and quit using our services immediately.</span>

<h3>INFORMATION WE COLLECT</h3>
<span>As a Rafflestore user, here are the different kinds of information we may collect from and about you:
Information that you provide: These include your full name, your e-mail address, phone number, contact address, age, gender, and payment details.
Information collected through the use of cookies and other technologies: We use a variety of technologies to acquire data/information from your computer/device about your actions on the Rafflestore website. This information may include your computer or device’s browser information, IP address, and time. We may also gather other browser and Internet-related information through cookies and/or web beacons.</span>

<h3>USING YOUR INFORMATION</h3>
<span>
     We use the information collected from and about you:
     <ul>
          <li>
               To make our services available to you;
          </li>
          <li>
               To customize your experience;
          </li>
          <li>
               To inform you about modifications to our website and services;
          </li>
          <li>
               To enable us to appraise, and consequently improve our website and its services;
          </li>
          <li>
               To inform you about events and/or services which may interest you;
          </li>
          <li>
               To troubleshoot problems and resolve disputes; and
          </li>
          <li>
               To discover and protect ourselves against error, fraud and other criminal activities.
          </li>

     </ul>
</span>



<h3>OUR DISCLOSURE OF YOUR INFORMATION</h3>
<span>We may share your personal information with pre-approved service providers who carry out some services on our behalf and/or with third parties with whom you choose to let us share information.
We may disclose your private information to appropriate legal authorities and government officials, whether in reply to a subpoena, a court order or an investigative demand, if we are compelled to do so.
We allow third-parties, such as authorized service providers and advertising companies, to place ads on our website. These companies may sometimes use tracking technologies like cookies to acquire information about our users who view their ads.
With the exclusion of the above-mentioned, we will never deliberately sell, exchange or otherwise give your personal information to third parties.</span>

<h3>CHILDREN’S PRIVACY</h3>
<span>We will never intentionally collect private information from children under 18, except as allowed by law or with parental consent.</span>

<h3>SECURITY OF INFORMATION</h3>
<span>At Rafflestore, we do our utmost to protect your personal information from unauthorized users. To prevent illegal access, ensure proper use of information, and maintain data accuracy, we deploy practical administrative practices and measures that safeguard your information. You however agree that there is no complete guarantee for the security of information made available on or through the internet. We will thus not bear responsibility for unauthorized access to your information that is beyond our control.</span>

<h3>OUR COOKIES POLICY</h3>
<span>Rafflestore makes use of "cookies" technology to provide a user friendly registration process and a stress-free log in experience. It also helps us to improve Rafflestore users’ general experience. Through the use of cookies, we may automatically collect information about your online activities on our website, such as the pages viewed by you, the links you opened, and the searches you carried out on our website.
You may choose to deny cookies on your browser but in such a case, may not be able to make use of some of the unique interactive features provided on our website.
</span>

<h3>CHANGES</h3>
<span>We may sometimes review this Privacy Policy to better describe our use of, disclosure of and protection of your private information. We will as a matter of policy always post the last updated date on the top centre portion of this page when we do so.
Your continued use of the Rafflestore site after such changes are made indicate your continued approval of our privacy policy.</span>



            </div>
        </div>
    </section>
</div>
