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
    <section id="singlemyproduct">
        <div class="con">
            <div class="small">

                <div class="product_info">
                    <h1>Bought Product</h1>
                    <span>Seller: <b v-html="seller.fullname.firstname + ' ' + seller.fullname.surname"></b> </span>
                    <span>Buyer: <b v-html="userdata.fullname.firstname + ' ' + userdata.fullname.surname"></b> </span>
                </div>

                <div class="details">
                    <h3>Shipping Details</h3>
                    
                    <span v-html="'Name: ' + userdata.fullname.firstname + ' ' + userdata.fullname.surname"></span>
                    <span v-html="'Country: ' + userdata.country "></span>
                    <span v-html="'Adress: ' + buyeraddress"></span>
                    <span v-html="'Postcode: ' + buyerpostalcode"></span>
                    <span v-html="'City: ' + buyercity"></span>
                    <span>Phone Number: {{userdata.telefon}} </span>
                    <span v-if="products.has_receipt_or_box == 'both'">Does this product have box or receipt: receipt and box</span>
                    <span>Does this product have box or receipt: {{products.has_receipt_or_box}}</span>
                    <span>Phone Number: {{userdata.telefon}} </span>
                    <div class="spacer"><span></span></div>
                </div>
                <div class="tracking_info">
                    
                    <h3>Tracking Info:</h3>
                    
                    <span>Tracking Number: {{ products.trackingnumber ? products.trackingnumber : '' }}</span>
                    <span>Delivery Service: {{products.shipping ? products.shipping : '' }} </span>
                    <div class="spacer"><span></span></div>
                </div>


                <div class="status">
                    <form action="/reputation" method="post" id="reputationform" novalidate>

                        <div class="row">
                            <input type="submit" id="rep_submit" value="Product Recieved">
                            <a :href="'mailto:' + useremail">Contact Seller</a>
                        </div>
                        <div class="full_width">
                            <a href="mailto:support@rafflestore.com">I did not recieve the right product!</a>
                            <p>(a case will be opened if you didn't get the right product)</p>
                        </div>

                        <div class="rate">
                            <span>Rate this raffle!</span>
                            <div class="icons">
                                    <i class="fas fa-thumbs-up"></i>
                                    <input type="checkbox"  name="rate_thumbs_up" id="thumbs_up">
                                    <i class="fas fa-thumbs-down"></i>
                                    <input type="checkbox"  name="rate_thumbs_down" id="thumbs_down">
                            </div>
                        </div>
                        <div>
                            <input type="hidden" :value="products['_id']" name="productid">
                        </div>
                    </form>
                </div>

            </div>
            <div class="big">
                <div class="productimage">
                    <div class="images">
                        <div class="inner myproduct-carousel owl-carousel owl-wrapper owl-width">
                            <div v-for="item in products['images']" class="fix">
                                <img :src="item" :alt="products['productname']">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="productinfo">
                    <h1 v-html="'Product name: ' + products['productname']"></h1>
                    <div class="row">
                        <div v-if="!products.size.streetwear == 'none'" class="col">Size: <b>{{products.size.streetwear}}</b></div>
                        <div v-else class="col">Size: <b>EU{{products.size.eu}} / US {{products.size.us}} / UK{{products.size.uk}}</b></div>
                        <div class="col">Price: <b>${{ products['price'] }}</b></div>
                        <div class="col">Condition: <b>{{ products['condition'] }}</b></div>
                    </div>
                    <div class="desc">
                   
                        <span>Description:</span>
                        <p v-html="products.desc"></p>
                    </div>
                </div>
            </div>

        </div>
    </section>
</div>