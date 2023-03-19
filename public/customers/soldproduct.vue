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
    <section id="soldproduct">
        <div class="con">
            <div class="col productinfo">
                <a href="/allraffles">
                    < back to product gallery</a> <div class="info">
                        <h1>Sold Product</h1>
                        <span>Seller: <b v-html="userdata.fullname.firstname  + ' ' + userdata.fullname.surname"></b></span>
                        <span>Buyer: <b v-html="buyername.firstname + ' ' + buyername.surname"></b> </span>
            </div>

            <div class="shippinginfo">
                <h3>Shipping details</h3>

                <div class="details">
                    <span v-html="'Name: ' + buyername.firstname + ' ' + buyername.surname "></span>
                    <span v-html="'Country: ' + buyer.country"></span>
                    <span v-html="'Address: ' + buyeraddress"></span>
                    <span v-html="'Postcode: ' + buyerpostalcode"></span>
                    <span v-html="'City: ' + buyercity"></span>
                    <span>Phone Number: {{userdata.telefon}} </span>
                    <div class="spacer"><span></span></div>

                </div>
                <form class="shippingform">
                    <h3>Tracking info:</h3>
                    <div class="tracking_number">
                        <span>Tracking number:</span>
                        <input type="text" name="trackingnumber" :value="product.trackingnumber" id="trackingnumber">
                        <input type="hidden" :value="product['productid']" name="productid">
                        <span class="status"></span>
                    </div>
                   <span>Delivery Service: <b>{{product.shipping}}</b></span>
                   <div class="spacer"><span></span></div>
                    <div class="buttons">
                        <input type="submit" value="Product Sent" class="submit">
                        <a class="contact" :href="'mailto:' +  buyeremail">Contact Buyer</a>
                    </div>
                </form>
            </div>
        </div>
        <div class="col thumb">
            <div class="thumbnail">
                <img :src="product['thumbnail']">
            </div>
            <div class="more_info">
               <h1 v-html="product.productname"></h1>
               <div class="flex">
                   <span v-if="product.size.us">Size: <b>EU{{product.size.eu}} / US{{product.size.us}} / UK{{product.size.uk}}</b></span>
                   <span v-else>Size: <b>{{product.size.streetwear}}</b></span>
                   <span>Price: <b>${{product.price}}</b></span>
                   <span>Condition: <b>{{product.condition}}</b></span>
               </div>
               <div class="desc">
                   <span>Description:</span>
                   
                   <p>{{product.description}}</p>
               </div>               
            </div>
        </div>

</div>

</section>
</div>