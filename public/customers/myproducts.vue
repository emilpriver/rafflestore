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

        <section id="myproducts">
            <div class="con">
                <!-- bought products-->
                <div class="col darker">
                    <h1>Your bought products</h1>
                    <span>Products you have won in the raffles</span>
                    <div v-if="products" class="boughtproducts">
                        <div v-for="item in products" class="product">
                            <a :href="'/myproduct/' + item['productid']">
                                <div class="fix">
                                    <div class="image">
                                        <div class="price">${{ item["price"] }}</div>
                                        <div class="ticketprice">{{item['ticketprice']}} coins</div>
                                        <div class="img">
                                            <img :src="item['thumbnail']">
                                        </div>
                                        <div class="name">
                                            <p v-html="item.productname"></p>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <input type="hidden" :value="item['size']" class="productSize">
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div v-else>
                        <h1> You havent bought any products </h1>
                    </div>
                </div>
                <!--Current raffles-->
                <div class="col">
                    <h1>Your current raffles</h1>
                    <span>Your products you have </span>
                    <div class="currentraffles">
                        <div v-if="raffles.length > 0">
                            <div v-for="item in raffles" class="product">
                                <a :href="'/product/' + item['productid']">
                                    <div class="fix">
                                        <div class="image">
                                            <div class="price">${{ item["price"] }}</div>
                                            <div class="ticketprice">{{item['ticketprice']}} coins</div>
                                            <div class="img">
                                                <img :src="item['thumbnail']">
                                            </div>
                                            <div class="name">
                                                <p v-html="item.productname"></p>
                                            </div>
                                        </div>
                                        <div class="info">
                                            <input type="hidden" :value="item['size']" class="productSize">
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div v-else>
                            <span>You havent entered any raffles</span>
                        </div>
                    </div>
                </div>
                <!--Sold Products-->
                <div class="col">
                    <h1>Your sold products</h1>
                    <span>Products you have sold at Rafflestore</span>
                    <div v-if="soldproducts.length > 0" class="soldproducts">
                        <div v-for="item in soldproducts" class="product">
                            <a :href="'/soldproduct/' + item['productid']">
                                <div class="fix">
                                    <div class="image">
                                        <div class="price">${{ item["price"] }}</div>
                                        <div class="ticketprice">{{item['ticketprice']}} coins</div>
                                        <div class="img">
                                            <img :src="item['thumbnail']">
                                        </div>
                                        <div class="name">
                                            <p v-html="item.productname"></p>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <input type="hidden" :value="item['size']" class="productSize">
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <span v-else> You havent sold any products </span>
                </div>
                <!--Pending products-->
                <div class="col darker">
                    <h1>Your pending products</h1>
                    <span>Products you have sent for review</span>
                    <div v-if="tobeaccepted.length > 0" class="pendingproducts">
                        <div v-for="item in tobeaccepted" class="product">
                            <a :href="'/editproduct/' + item['_id']">
                                <div class="fix">
                                    <div class="image">
                                        <div class="price">${{ item["price"] }}</div>
                                        <div class="ticketprice">{{item['ticketprice']}} coins</div>
                                        <div class="img">
                                            <img :src="item['thumbnail']">
                                        </div>
                                        <div class="name">
                                            <p v-html="item.productname"></p>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <input type="hidden" :value="item['size']" class="productSize">
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <span v-else> You dont have any product that has been sent to review </span>

                </div>
            </div>
        </section>
    </div>