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
                            <li class="active">
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
    <section id="allraffles">
        <div class="con">
            <div class="filter">
                <div class="column">
                    <span>Filter</span>
                    <form id="filteform" novalidate>
                        <div class="select">
                            <div class="selefix">
                                <select name="productype" id="productype">
                                    <option value="none" selected disabled>Product</option>
                                    <option value="all">All</option>
                                    <option value="shoes">Shoes</option>
                                    <option value="streetwear">Streetwear</option>
                                    <option value="other">Other</option>
                                </select>
                                <div class="icon">
                                    <i class="fas fa-angle-down"></i>
                                </div>
                            </div>
                        </div>

                        <div class="select" id="brands">
                            <div class="selefix">
                                <select name="brand" id="filterbrand">
                                    <option value="none" selected disabled>Brand</option>
                                    <option value="all">All</option>
                                    <option value="adidas">Adidas</option>
                                    <option value="nike">Nike</option>
                                    <option value="off-white">Off-White</option>
                                    <option value="jordans">Jordans</option>
                                    <option value="other">Other</option>
                                </select>
                                <div class="icon">
                                    <i class="fas fa-angle-down"></i>
                                </div>
                            </div>
                        </div>
                        <div class="select">
                            <div class="selefix">
                                <select name="Size" id="filtersize">
                                    <option value="none" selected disabled>Size</option>
                                    <option value="all">All</option>
                                    <option value="4">4</option>
                                    <option value="4.5">4.5</option>
                                    <option value="5">5</option>
                                    <option value="5.5">5.5</option>
                                    <option value="6">6</option>
                                    <option value="6.5">6.5</option>
                                    <option value="7">7</option>
                                    <option value="7.5">7.5</option>
                                    <option value="8">8.5</option>
                                    <option value="9">9</option>
                                    <option value="9.5">9.5</option>
                                    <option value="10">10</option>
                                    <option value="10.5">10.5</option>
                                    <option value="11">11</option>
                                    <option value="11.5">11.5</option>
                                    <option value="12">12</option>
                                    <option value="12.5">12.5</option>
                                    <option value="13">13</option>
                                    <option value="13.5">13.5</option>
                                    <option value="14">14</option>
                                    <option value="14.5">14.5</option>
                                    <option value="15">15</option>
                                    <option value="15.5">15.5</option>
                                    <option value="other">Other</option>
                                </select>
                                <div class="icon">
                                    <i class="fas fa-angle-down"></i>
                                </div>
                            </div>
                        </div>
                        <div class="select">
                            <div class="selefix">
                                <select name="Size" id="filtercondition">
                                    <option value="none" selected disabled>Condition</option>
                                    <option value="all">All</option>
                                    <option value="brand new">Brand new</option>
                                    <option value="used">Used</option>
                                    <option value="other">Other</option>
                                </select>
                                <div class="icon">
                                    <i class="fas fa-angle-down"></i>
                                </div>
                            </div>
                        </div>

                        <div class="showSoldProducts">
                                <div class="checkbox-con">
                                    <input type="checkbox" id="showSold" name="showsold">
                                    <span class="checkbox" id="show_sold_btn"></span>
                                </div>
                            <p>Show sold products</p>

                        </div>

                        <div class="price-slider">
                            <p>Price span</p>
                            <div class="row">
                                <div class="inputs">
                                    $
                                    <input type="text" id="minprice" value="0">
                                </div>
                                <div class="spacer">-</div>
                                <div class="inputs">$
                                    <input type="text" id="maxprice" value="10000">
                                </div>
                            </div>
                            <div class="row-fix">
                                <div id="priceslider"></div>
                            </div>

                        </div>
                        <div class="buttons">
                            <div class="input">
                                <input type="submit" value="Apply" class="submit">
                            </div>
                            <div class="input">
                                <input type="reset" value="Reset" class="reset">
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <div class="products">
                <div class="order-filter">
                    <div class="productsizefilter">
                        <span>Show sizes in: </span>
                        <p data-sizeformat="us" id="us"  class="active">US</p>
                        <p data-sizeformat="eu" id="eu">EU</p>
                        <p data-sizeformat="uk" id="uk">UK</p>
                    </div>
                    <input type="text" id="searchproductsbar" placeholder="Search for..">
                    <div class="view">
                        <span>View</span>
                        <p class="select-max-products-range active" data-value="25">25</p>
                        <p class="select-max-products-range" data-value="50">50</p>
                        <p class="select-max-products-range" data-value="100">100</p>
                        <p class="select-max-products-range" data-value="All">All</p>
                    </div>
                </div>
                <div id="order-products">
                     <div v-for="item in products" class="product" :data-brand="item.brand.toLowerCase()" :data-size-eu="[item.size.eu.length >  0 ? item.size.eu : 'none']" :data-size-us="[item.size.us.length > 0 ? item.size.us : 'none']" :data-size-uk="[item.size.uk.length > 0 ? item.size.uk : 'none']" :data-size-streetwear="[item.size.streetwear ? item.size.streetwear : 'none']"  :data-sold="ifSold(item.tickets - item.ticketsbought)"
                    :data-type="item.category.toLowerCase()" :data-image="item.thumbnail" :data-price="item.price" :data-name="item.productname.toLowerCase()" :data-condition="item.condition">
                    <a :href="'/product/' + item.productid">
                       <div class="content">
                        <div class="productimg">
                            <!-- <canvas class="product_canvas"></canvas> -->
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
                <div id="search-results"><h1></h1></div>
                </div>
            </div>
        </div>
    </section>

</div>
