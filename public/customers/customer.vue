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
                        <div class="userdiv">
                            <a href="/reportbug"><img src="/img/bug.png" /></a>
                                
                            <div class="userimg">
                                <a href="/customer">
                                    <img :src="userdata['profileimage']"> </a>
                            </div>
                            <div class="userinfo">
                                <span v-html="userdata.fullname.firstname + ' ' + userdata.fullname.surname "></span>
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
    <section id="customer">
        <div class="page-hero">
            <div class="wrapper">
                <div class="profile-image">
                    <img id="customer-image" :src="image">

                    <form v-if="signedinuser === params" action="/changeimage" method="post" class="imageform" enctype="multipart/form-data"
                        novalidate>
                        <i class="fas openSelectFile fa-camera"></i>
                        <input type="file" name="image" style="display:none" id="filer">
                    </form>
                </div>
                <h1 v-html="fullname"></h1>
                <div class="row">
                    <span v-if="signedinuser === params">Balance:
                        <strong>{{Math.floor(coins)}}</strong>
                    </span>
                    <span>
                        <i class="fas fa-map-marker-alt"></i>
                        <strong v-html="city + ', ' + country"></strong>
                    </span>
                </div>
            </div>
        </div>
        <div class="con">
            <div class="content">
                <div class="col user">
                    <div v-if="signedinuser == params" class="precontent">
                        <div class="column first">
                            <a class="addcoinsbtn">Deposit</a>
                        </div>
                        <div class="column">
                            <a id="widthdraw_btn">Withdraw</a>
                        </div>
                        <div class="column">
                            <a href="/settings">Settings</a>
                        </div>
                        <div class="column last">
                            <a href="/mytransactions">Transactions</a>
                        </div>
                    </div>
                    <div class="info">
                        <div class="wrapper">
                            <div class="column ">
                                <div>
                                    <span>{{rafflesold.total ? rafflesold.total : 0 }}</span>
                                    <p>Raffles Sold</p>
                                </div>
                            </div>
                            <div class="column">
                                <div>
                                    <span>{{ raffleswon }}</span>
                                    <p>Raffles Won</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="moreinfo">
                        <p>Rank:
                            <span> {{rank}}</span>
                        </p>
                        <p>Reputation:
                            <span>{{ reputation}}%</span>
                        </p>
                        <p>Profile visitors:
                            <span>{{ visitor }}</span>
                        </p>
                        <p>
                            <span v-if="verified == 'true'" class="verified">
                                <strong>
                                    <i class="fas fa-check"></i>
                                    <span>Verified</span>
                                </strong>
                            </span>
                            <span v-else class="not-verified">This user is not verified</span>
                        </p>
                    </div>
                </div>
                <div v-if="signedinuser == params" class="col products">

                    <!--My products-->
                    <div class="column">
                        <div class="wrapper">
                            <h1>My won raffles</h1>
                            <div class="spacer"></div>
                            <div v-for="item in products" class="product">
                                <a :href="'/myproduct/' + item.productid">
                                    <div class="content">
                                        <div class="productimg">
                                            <img :src="item.thumbnail">
                                        </div>
                                        <div class="productinfo">
                                            <div class="line"></div>
                                            <h1 v-html="item.productname"></h1>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </div>
                    </div>

                    <!-- Raffles user have joined-->
                    <div class="column no-margin">
                        <div class="wrapper">
                            <h1>Joined raffles</h1>
                            <div class="spacer"></div>
                            <div v-for="item in raffles" class="product">
                                <a :href="'/product/' + item.productid">
                                    <div class="content">
                                        <div class="productimg">
                                            <img :src="item.thumbnail">
                                        </div>
                                        <div class="productinfo">
                                            <div class="line"></div>
                                            <h1 v-html="item.productname"></h1>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- Products people are selling-->
                    <div class="column">
                        <div class="wrapper">
                            <h1>My ended raffles</h1>
                            <div class="spacer"></div>
                            <div v-for="item in soldproducts" class="product">
                                <a :href="'/soldproduct/' + item.productid">
                                    <div class="content">
                                        <div class="productimg">
                                            <img :src="item.thumbnail">
                                        </div>
                                        <div class="productinfo">
                                            <div class="line"></div>
                                            <h1 v-html="item.productname"></h1>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!--Products that waits for review-->
                    <div class="column no-margin">
                        <div class="wrapper">
                            <h1>My pending products</h1>
                            <div class="spacer"></div>
                            <div v-for="item in tobeaccepted" class="product">
                                <a :href="'/editproduct/' + item._id">
                                    <div class="content">
                                        <div class="productimg">
                                            <img :src="item.thumbnail">
                                        </div>
                                        <div class="productinfo">
                                            <div class="line"></div>
                                            <h1 v-html="item.productname"></h1>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="full-width-column">
                        <h1>My products on the market</h1>
                        <div v-for="item in myproductsonmarket" class="col">
                            <a :href="'/product/' + item.productid">
                                <h2 v-html="item.productname"></h2>
                                <span>Price: {{item.price}}$</span>
                                <div v-if="(item.tickets - item.ticketsbought) > 0" >
                                <span>Tickets left: {{item.tickets - item.ticketsbought}} </span>
                                <div class="button">
                                    <form action="/deleteproduct" method="POST" class="deleteproduct">
                                        <input type="hidden" class="delete_product_id" name="productid" :value="item.productid">
                                        <button class="submit" type="submit">Delete product</button>
                                    </form>
                                </div>
                            </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
