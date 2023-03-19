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
    <section id="single-product">
        <div class="con">
            <div class="backto">
                <a href="/allraffles">
                    <span>
                        <</span> <span>go back to gallery
                    </span>
                </a>
            </div>
            <div v-if="(totaltickets - ticketsbought) === 0" class="winners">
                <div v-if="singleraffledrawn === 'yes'" class="drawn">
                    <a :href="'/customer/' + singlerafflewinner.id">
                        <div class="fix">

                            <h1>Winner: </h1>
                            <img :src="winner.profileimage">
                            <h1 v-html="singleuserwinnername"></h1>
                        </div>
                    </a>
                </div>
                <div v-else class="countdown">
                    <span>Raffle will be drawn in:</span>
                    <h1 id="countdowntimer"></h1>
                    <script>
                        GetTimeLeft('{{endtime}}', '{{datenow  }}', '{{this_url')
                    </script>
                </div>
            </div>


            <div class="productimage">
                <div class="images">
                    <div class="inner productimage-carousel owl-carousel owl-wrapper owl-width">
                        <div v-for="item in productimages" :data-image="item" class="single_product_images fix">
                             <img :src="item" :alt="productname" class="togglebigimg product-images zoomimages"> 
                            <!-- <canvas class="togglebigimg product-images zoomimages"></canvas>-->
                        </div>
                    </div>
                </div>
                <div id="product-dots" class="owl-dots">
                    <li v-for="(item,n) in productimages" :data-image="item"  class="single_product_images owl-dot">
                        <img :src="item" class="product-images-dots">
                        <!-- <canvas class="product-images-dots"></canvas> -->
                    </li>
                </div>
            </div>
            <div class="productinfo">
                <span class="legit verified" v-if="verified === 'yes'">
                    <p>This item have been verified by our team</p>
                    <img src="/img/checkmark.png">
                </span>
                <span clasS="legit notverified" v-else>
                    <p>This item could not be veified by our team</p>
                    <img src="/img/notverified.png">
                </span>
                <h1 class="productitle" v-html="productname"></h1>
                <div class="info">
                    <p>Posted by:
                        <a :href="'/customer/' + by" v-html="productdata.fullname.firstname + ' ' + productdata.fullname.surname"></a>
                    </p>
                    <p>Raffle-ID:
                        <a :href="'/product/' + singleraffleid">{{singleraffleid }}</a>
                    </p>
                </div>
                <div class="spacer"></div>
                <div class="price">
                    <h2>Price:
                        <strong>${{ price }}</strong>
                    </h2>

                    <div class="ticketprice">
                        <h2>TICKET PRICE:
                            <strong>${{ Math.ceil(ticketprice) }}</strong>
                        </h2>
                        <div class="small">+ ${{ Math.ceil(ticketprice * 0.1) }} fee</div>
                    </div>
                </div>

                <div v-if="category == 'Shoes'" class="size">Size:
                    <span> US: {{ size.us }} / UK: {{size.uk}} / EU: {{size.eu}} </span>
                </div>
                <div v-else-if="category == 'Streetwear'" class="size">Size:
                    <span>{{size.streetwear.toUpperCase()}} </span>
                </div>
                <div v-else class="size">Size: <span>{{size.streetwear}} </span> </div>
                <div class="condition">Condition:
                    <span>{{conid}}</span>
                </div>
                <div v-if="has_receipt_or_box == 'None'" class="recipt_or_box">
                    <span>Original Box: <strong class="none">NO</strong></span>
                    <span>Receipt: <strong class="none">NO</strong></span>
                </div>
                <div v-if="has_receipt_or_box == 'Receipt'" class="recipt_or_box">
                    <span>Original Box: <strong class="none">NO</strong></span>
                    <span>Receipt: <strong class="active">YES</strong></span>
                </div>

                <div v-if="has_receipt_or_box == 'Box'" class="recipt_or_box">
                    <span>Original Box: <strong class="active">YES</strong></span>
                    <span>Receipt: <strong class="none">NO</strong></span>
                </div>

                <div v-if="has_receipt_or_box == ''" class="recipt_or_box">
                    <span>Original Box: <strong class="none">NO</strong></span>
                    <span>Receipt: <strong class="none">NO</strong></span>
                </div>
                <div class="desc">
                    <span>Description</span>
                    <p v-if="!desc.length <= 0" v-html="desc"></p>
                    <p v-else>No description available</p>
                </div>
                <div class="tickets">
                    <span>Tickets </span>
                    <div class="ticketsbought">
                        <span v-for="n in joinedusers" class="taken">
                            <strong></strong>
                            <a :href="'/customer/' + n.id" v-html="n.name"></a>
                        </span>
                        <span v-for="n in ticketfree" class="open"></span>
                    </div>
                    <h4 class="ticketsleft">Tickets Left:
                        <strong>{{totaltickets - ticketsbought}} / {{totaltickets}}</strong>
                    </h4>
                    <div v-if="login === true">
                        <div v-if="(totaltickets - ticketsbought) === 0" class="cantbuyticket">
                            <h3>You cant buy more tickets</h3>
                        </div>
                        <div v-else>
                            <div class="buytickets">
                                <form action="/buyticket" method="post" class="buyticket" novalidate>
                                    <input type="hidden" :value="id" name="productid">

                                    <div class="selection">
                                        <div class="fix">
                                            <select id="ticketsleftamountfilter" name="amount">
                                                <option value="" class="option" disabled selected>Quantity</option>
                                                <option class="option" v-for="n in (totaltickets - ticketsbought)"
                                                    :value="n">{{n}}</option>
                                            </select>
                                            <div class="icon">
                                                <i class="fas fa-angle-down"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" id="product-price" name="price" :value=" Math.ceil(ticketprice)">
                                    <input type="submit" value="Buy tickets" class="submit">
                                    <div class="ajaxresponse"></div>
                                    <p>Total Price:
                                        <strong id="amountpricetickets"></strong>
                                    </p>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="pleaselogin">
                            <h3>Please
                                <a href="/login">Sign In</a> to buy ticket</h3>
                        </div>
                    </div>


                </div>
            </div>

            <div v-if="(totaltickets - ticketsbought) >= 1" class="raffle">
                <h1>THE RAFFLE WILL START WHEN ALL TICKETS ARE BOUGHT.</h1>
            </div>
        </div>
    </section>
</div>