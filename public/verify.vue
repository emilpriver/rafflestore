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
    <section id="verify">
        <div class="con">
            <h1>Your account is now verified</h1>


        </div>
    </section>
</div>