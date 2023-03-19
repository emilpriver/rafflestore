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

    <!-- Legit checks-->


    <section id="legitcheck">
        <div class="con">
            <form action="/legitcheck" enctype="multipart/form-data" method="POST" id="legitchecksForm" novalidate>
                <!--First column-->
                <div class="col">
                        <div class="col-number">1</div>
                    <h1>Product Information</h1>
                    <div class="row">
                        <div class="column">
                            <span>Product Name</span>
                            <input type="text" name="productname">
                        </div>
                        <div class="column">
                            <span>Amount paid for the product. (In US dollars)</span>
                            <input type="text" name="price">
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <span>Description</span>
                            <textarea name="desc"></textarea>
                        </div>
                    </div>

                </div>


                <!--Last column-->
                <div class="col">
                        <div class="col-number">2</div>
                    <h1>Product photogallery</h1>
                    <div class="row image_row">
                        <div class="img-col">
                            <span class="choosefile">Front of Shoes</span>
                            <input type="file" class="imagechooser" name="images">
                        </div>
                        <div class="img-col">
                            <span class="choosefile">Outside Panels</span>
                            <input type="file" class="imagechooser" name="images">
                        </div>
                        <div class="img-col">
                            <span class="choosefile">Inside Panels</span>
                            <input type="file" class="imagechooser" name="images">
                        </div>
                    </div>
                    <div class="row image_row">
                        <div class="img-col">
                            <span class="choosefile">Backside of Shoes</span>
                            <input type="file" class="imagechooser" name="images">
                        </div>
                        <div class="img-col">
                            <span class="choosefile">Size Tag</span>
                            <input type="file" class="imagechooser" name="images">
                        </div>
                        <div class="img-col">
                            <span class="choosefile">Additional Image</span>
                            <input type="file" class="imagechooser" name="images">
                        </div>
                    </div>
                    <div class="one-item-row">
                        <div class="img-col ">
                            <span class="choosefile">Additional Image</span>
                            <input type="file" class="imagechooser" name="images">
                        </div>
                    </div>
                    <div class="full-width">
                        <h3>Images guidelines</h3>
                        <p> Please use the following guidelines to submit your pictures, make that you clean your phone
                            lens
                            to make sure the pictures are clear for us to see. If we need more information about your
                            product,
                            We will send you an email.</p>
                        <ul>
                            <li>
                                <a href="#frontsideofproduct">Take a clear picture showing the full front side of the
                                    box, so both the label and any label
                                    added by a retail store can be clearly seen</a>
                            </li>
                            <li>
                                <a href="#outsideoftheproduct">Take a picture of the outside panels of the shoes, as
                                    shown in the demo </a>
                            </li>
                            <li>
                                <a href="#insidepanels">Take a picture of the inside panels of the shoes, as shown in
                                    the demo </a>
                            </li>
                            <li>
                                <a href="#backside"> Take a picture of the backside of both shoes, as shown in the demo
                                </a>
                            </li>
                            <li>
                                <a href="#frontisideofboth">Take a picture of the front side of both shoes, as shown in
                                    the demo </a>
                            </li>
                            <li>
                                <a href="#sizetag">Take a CLEAR picture of the size tag inside the shoes</a>
                            </li>
                            <li> Additional for some products, Jordans : Take a picture of the wings logo, Adidas : add
                                a picture
                                of the bottom of the insoles + boost, as shown in the demo</li>
                            <li> Adittional, add a clear picture of receipt
                            </li>
                        </ul>
                    </div>
                    <div id="imageguidlines">
                        <div class="row">
                            <div class="image" id="frontsideofproduct">
                                <img src="/img/showshoe.png">
                            </div>
                            <div class="image" id="outsideoftheproduct">
                                <img src="/img/showshoe2.png">
                            </div>
                            <div class="image" id="insidepanels">
                                <img src="/img/showshoe3.png">
                            </div>
                        </div>
                        <div class="row">
                            <div class="image" id="backside">
                                <img src="/img/showshoe4.png">
                            </div>
                            <div class="image" id="frontisideofboth">
                                <img src="/img/showshoe5.png">
                            </div>
                            <div class="image" id="sizetag">
                                <img src="/img/showshoe6.png">
                            </div>
                        </div>
                    </div>
                </div>
                <!--End legit checks-->
                <div class="img_loading_status">
                    <div class="wrapper">
                        <span>Image upload status</span>
                    </div>
                    <div class="wrapper">
                        
                        <div class="bg_bar"></div>
                        <div class="status_bar_uploaded"></div>
                        <div class="img_bar"><img src="/img/hero-shoe.png"></div>
                    </div>
                </div>
                <!--Submit -->
                <div class="submit-con">
                    <div class="ajaxresponse"></div>
                    <input type="submit" value="Legit check!" class="submit">
                    <span>Note: A 5 coin fee will be debited for the legit check.</span>
                </div>
            </form>
            <div class="success"></div>
        </div>
    </section>
</div>
