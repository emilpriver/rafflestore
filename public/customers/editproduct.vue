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
    <section id="editproduct">
        <form action="/editproduct" method="POST" class="editproduct" enctype="multipart/form-data" novalidate>
            <input type="hidden" name="productid" :value="products['_id']">
            <div class="productinfo col">
                <div class="column">
                    <span>Product name</span>
                    <input type="text" name="productname" :value="products['productname']">
                </div>
                <div class="column">
                    <span>Total of tickets</span>
                    <select name="tickets" v-model="products.tickets">
                        <option value="" disabled selected></option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                </div>
                <div class="column">
                    <span>Product price</span>
                    <input type="number" name="price" :value="products['price']">
                </div>
                <div class="column textarea">
                    <textarea name="desc" v-html="products['description']"></textarea>
                </div>
                <div class="updateproduct">
                        <input type="submit" value="Update product">
                    </div>
            </div>
            <div class="col images">
                <h1>Product images</h1>
                <div class="imgcon">
                    <div v-for="(item,index) in products['images']" class="image">

                        <div class="fix">
                            <img :src="item">
                            <div class="editimage">
                                <span class="edit">Edit image</span>
                                <div class="newfiledata"></div>
                            </div>
                            <input type="file" name="images" class="img">
                            <input type="hidden" class="selectedimg" name="selectedimg">
                        </div>
                    </div>
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
                </div>
            </div>
        </form>
    </section>
</div>