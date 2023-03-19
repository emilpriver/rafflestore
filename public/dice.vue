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
                            <li >
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/allraffles">All raffles</a>
                            </li>
                            <li class="active">
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
            <section id="dice">
                <div class="col big">
                    <div v-if="login === true">
                        <div class="columns">
                            <h1>High / Low</h1>
                            <form action="/dicehighlow" method="POST" class="dicehighlow" novalidate>
                                <div class="ch">
                                    <div class="chooser">
                                        <span>High</span>
                                        <input type="checkbox" name="dice" value="high"> </div>
                                    <div class="chooser">
                                        <span>Low</span>
                                        <input type="checkbox" name="dice" value="low">
                                    </div>
                                </div>
                                <input type="number" name="amount" required placeholder="Amount to bet">
                                <input type="submit" value="Roll" class="submit">
                            </form>
                        </div>
                        <div class="columns">
                            <h1>You rolled:</h1>
                            <span class="rolled">
                                <div class="img"></div>
                            </span>
                        </div>
                        <div class="columns">
                            <h1>Bet on a number</h1>
                            <form action="/dicenumber" method="POST" class="dicehighlow" novalidate>
                                <input type="number" name="amount" required placeholder="Amount to bet">
                                <input type="number" name="numbertobeton" required placeholder="Number to bet on">
                                <input type="submit" value="Roll" class="submit">
                            </form>
                        </div>
                    </div>
                    <div v-else>
                        <h1>You need to be logedin to use this page</h1>
                    </div>
                </div>
            
            
            </section>
</div>