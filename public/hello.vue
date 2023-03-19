<div id="app">
    <header class="frontpage">
        <div class="con">
            <div class="navimg">
                <a href="/">
                    <img src="https://rafflestore.ams3.cdn.digitaloceanspaces.com/logo-white.png"> 
                </a>
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
    <section id="store">
        <div id="storehero">
            <div class="con">
                <h1>Raffles made easy</h1>
                <form action="/allraffles" method="GET" id="searchform" autocomplete="off">
                    <input type="text" name="search" id="search_bar" autocomplete="off" placeholder="Search for a product..." required>
                    <button type="submit" class="submit">
                        <i class="fas fa-search"></i>
                        </i> search
                    </button>
                    <div id="resultbox"></div>
                </form>

                <img class="hero-shoe" src="/img/hero-shoe.png">
            </div>
        </div>
        <div class="con">
            <div id="products">
                <div class="con">
                    <div class="col products">
                        <div class="column">
                            <h1>New In</h1>
                            <div class="productsizefilter">
                                <span>Show sizes in: </span>
                                <p id="us" class="active">US</p>
                                <p id="eu">EU</p>
                                <p id="uk">UK</p>
                            </div>
                            <div class="items">
                                <div v-for="item in products" class="product" :data-brand="item.brand.toLowerCase()" :data-price="item.price"
                                :data-type="item.category.toLowerCase()" :data-name="item.productname.toLowerCase()" :data-condition="item.condition" :data-image="item.thumbnail">
                                    <a :href="'/product/' + item.productid">
                                         <div class="content">
                                            <div class="productimg">
                                                 <!-- <canvas id="product_canvas"></canvas> -->
                                                 <img :src="item.thumbnail">
                                                <p v-if="(item.tickets - item.ticketsbought) == 0" class="sold">S0LD</p>
                                                <p v-else-if="item.condition == 'Brand new'" class="new">NEW</p>
                                                <p v-else class="old">Used</p>
                                            </div>
                                            <div class="productinfo">
                                                <div class="line"></div>
                                                <h1 v-html="item.productname"></h1>
                                                <div v-if="item.size" class="moreinfo">
                                                        <div v-if="item.size.streetwear == 'none'">
                                                                <p class="eu">Size: EU {{item.size.eu}}</p>
                                                                <p class="us" style="display:block">Size: US {{item.size.us}}</p>
                                                                <p class="uk">Size: UK {{item.size.uk}}</p>
                                                            </div>
                                                            <div v-else>
                                                                <p style="display: block" class="streetwear">Size: {{item.size.streetwear.toUpperCase()}}</p>
                                                            </div>
                                                    <p class="price">Price: ${{item.price}}</p>
                                                    <p class="ticketsleft">Tickets left: {{item.tickets - item.ticketsbought}} / {{item.tickets}} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <h1>Sponsored</h1>
                            <div class="items">
                                <div v-for="item in premium" class="product" :data-brand="item.brand.toLowerCase()"
                                :data-price="item.price"
                                :data-type="item.category.toLowerCase()" :data-name="item.productname.toLowerCase()" :data-condition="item.condition" :data-image="item.thumbnail">
                                    <a :href="'/product/' + item.productid">
                                        <div class="content">
                                            <div class="productimg">
                                                 <!-- <canvas id="product_canvas"></canvas> -->
                                                 <img :src="item.thumbnail">
                                                <p v-if="item.condition == 'Brand new'" class="new">NEW</p>
                                                <p v-else class="old">Used</p>
                                            </div>
                                            <div class="productinfo">
                                                <div class="line"></div>
                                                <h1 v-html="item.productname"></h1>
                                                <div v-if="item.size" class="moreinfo">
                                                        <div v-if="item.size.streetwear == 'none'">
                                                                <p class="eu">Size: EU {{item.size.eu}}</p>
                                                                <p class="us" style="display:block">Size: US {{item.size.us}}</p>
                                                                <p class="uk">Size: UK {{item.size.uk}}</p>
                                                            </div>
                                                            <div v-else>
                                                                <p style="display: block" class="streetwear">Size: {{item.size.streetwear.toUpperCase()}}</p>
                                                            </div>
                                                    <p class="price">Price: ${{item.price}}</p>
                                                    <p class="ticketsleft">Tickets left: {{item.tickets - item.ticketsbought}} / {{item.tickets}} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <h1>Most Viewed</h1>
                            <div class="items">
                                <div v-for="item in mostviews" class="product" :data-brand="item.brand.toLowerCase()" :data-price="item.price"
                                :data-type="item.category.toLowerCase()" data-image="item.thumbnail" :data-name="item.productname.toLowerCase()" :data-condition="item.condition">
                                    <a :href="'/product/' + item.productid">
                                        <div class="content">
                                            <div class="productimg">
                                                <!-- <canvas id="product_canvas"></canvas> -->
                                                <img :src="item.thumbnail">
                                                <p v-if="item.condition == 'Brand new'" class="new">NEW</p>
                                                <p v-else class="old">Used</p>
                                            </div>
                                            <div class="productinfo">
                                                <div class="line"></div>
                                                <h1 v-html="item.productname"></h1>
                                                <div v-if="item.size" class="moreinfo">
                                                        <div v-if="item.size.streetwear == 'none'">
                                                                <p class="eu">Size: EU {{item.size.eu}}</p>
                                                                <p class="us" style="display:block">Size: US {{item.size.us}}</p>
                                                                <p class="uk">Size: UK {{item.size.uk}}</p>
                                                            </div>
                                                            <div v-else>
                                                                <p style="display: block" class="streetwear">Size: {{item.size.streetwear.toUpperCase()}}</p>
                                                            </div>
                                                    <p class="price">Price: ${{item.price}}</p>
                                                    <p class="ticketsleft">Tickets left: {{item.tickets - item.ticketsbought}} / {{item.tickets}} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="productgallery">
                        <a href="/allraffles">
                            <span>Go to product gallery
                                <i class="fas fa-arrow-right"></i>
                            </span>
                        </a>
                    </div>
            </div>
            <div id="raffles">
                <div class="raffletitle">
                    <h1>RAFFLE</h1>
                    <span>Leaderboard</span>
                </div>
                </h1>
                <div class="column">
                    <div class="raffletitle">
                        <div class="block number">
                            #
                        </div>
                        <div class="raffleinfo">
                            <span>User</span>
                        </div>
                        <div class="block bigger">
                            <span>Raffles won</span>
                        </div>
                    </div>
                    <div class="raffleusers">
                        <div v-for="(user,index) in raffleinfo" class="ruser">
                            <a :href="'/customer/' + user._id">
                                <div class="block number">
                                    <span>{{index + 1 }}</span>
                                </div>
                                <div class="raffleinfo">
                                    <img :src="'/img/flags/' + user.country + '.png'" :alt="user.country">
                                    <span v-html="user.fullname.firstname + ' ' + user.fullname.surname "></span>
                                </div>
                                <div class="block raffleswon">
                                    <span>{{user.raffleswon}}</span>
                                </div>

                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</div>
