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
                            <li class="">
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
                            <li class="active">
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
    <section id="about">
        <div class="con">
            <div class="col">
                <h1>About Rafflestore</h1>
                <p>Welcome to Rafflestore, a unique online store dedicated solely to helping you sell or find that one of a kind fashion merchandise (including but not limited to shoes, hoodies, jackets, pants, etc).</p>
                <p> We are breaking new grounds in merchandising, allowing limited fashion merchandise owners and potential buyers sell and buy such through the mechanism of raffle draws. </p>
                <p>How, you ask.</p>
                <p> If you are a seller, you put up the intended merchandise you intend to sell and specify how many tickets you want to raffle the merchandise for. For example, you may choose to release 10 tickets at $10 tickets each, for a total of $100. To do this, you pay a non-refundable listing fee of $5.</p>
                <p>If you are the lucky potential buyer whose ticket is picked (no matter if you purchased 1, 2, 3 or all 10 tickets), the product is yours; no questions asked. Simple as ABC. </p>
                 <p>We know we are not doing things the conventional way, but we have tested and tried the raffle draw route and have absolute proof that it works. So if you are a fashionista and someone who just loves to do things unconventionally, we have created the perfect platform for you. </p>
                 <p>Welcome to a world of ease. Welcome to the world of raffle draws and fashion merchandise.</p>
                 <p>Welcome to Rafflestore. Wouldn’t you rather join our community?</p>
            </div>
            <div class="col with-video">
                <div class="video">
                    <iframe src="https://www.youtube.com/embed/G2a4iazEiQ8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
                <div class="text">
                    <h1>GET RICH OR DICE TRYIN'</h1>
                </div>

            </div>
        </div>
    </section>
</div>