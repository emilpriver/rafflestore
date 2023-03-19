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
                            <li class="active">
                                <a href="/contact">Contact</a>
                            </li>
                            <li v-if="login === true" class="signout"><a href="/logout">Sign Out</a></li>
                        </ul>
                    </div>
                </div>
            </header>
    <section id="contact">
        <div class="con">
            <h1>Contact Us</h1>
            <div class="wrapper">
                <div class="col first">
                    <div class="icon">
                        <i class="fas fa-question-circle"></i>
                    </div>
                    <span>Be sure to check out our frequently asked questions and information page before you contact the support.
                    </span>
                    <span>We have answered the most common questions there!</span>
                    <a href="/information#faq">Go to faq</a>
                </div>
                <div class="col">
                    <div class="icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <span>You can contact our support team via email.</span>
                    <span>We will reply within 24 hours.</span>
                    <span class="contact_us_mail"><a href="mailto:support@rafflestore.com">support@rafflestore.com</a></span>
                </div>
                <div class="col last">
                    <div class="icon">
                        <i class="fas fa-comments"></i>
                    </div>
                    <span>Want to get a quick and easy fix for your problem?</span>
                    <span>Check out our live chat!</span>
                </div>
            </div>
            <div class="moreinfo">
                <span>All of our customer service representatives are trained in the Rafflestore product and legit check professionals. If the representative cannot answer your question, please have patience and wait for an answer from the managers. </span>
                <span>Thank you for using Rafflestore.com!</span>
            </div>
        </div>
    </section>
</div>