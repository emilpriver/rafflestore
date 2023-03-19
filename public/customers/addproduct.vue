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

    <!-- Add Product-->


    <section id="addproduct">
        <div class="con">
            <form action="/addproduct" method="POST" enctype="multipart/form-data" class="addproductform" novalidate>
                <div class="productinfo">
                    <div class="col-number">1</div>
                    <h1>Product Information</h1>
                    <div class="multiinputs">
                        <span>Product Name</span>
                        <input type="text" name="productname" class="productname">
                    </div>
                    <div class="multiinputs">
                        <span>Price in US dollars (Shipping included)</span>
                        <input type="number" name="price">
                    </div>
                    <div class="selections">
                        <span>Number of tickets</span>
                        <div class="fix">
                            <select name="tickets" required="required">
                                <option value="" disabled selected></option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="selections">
                        <span>Category</span>
                        <div class="fix">
                            <select name="category" id="category" required="required">
                                <option value="" disabled selected></option>
                                <option value="Shoes">Shoes</option>
                                <option value="Streetwear">Streetwear</option>
                                <option value="Other">Other</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="selections">
                        <span>Brand</span>
                        <div class="fix">
                            <select name="brand" id="brand" required="required">
                                <option value="" disabled selected></option>
                                <option value="adidas">Adidas</option>
                                <option value="nike">Nike</option>
                                <option value="jordans">Jordans</option>
                                <option value="off-white">Off-White</option>
                                <option value="other">Other</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="selections" id="boughtfrom">
                        <span>Product bought from</span>
                        <div class="fix">
                            <select name="boughtfrom" required="required">
                                <option value="" disabled selected></option>
                                <option value="Bought from store">Bought from store</option>
                                <option value="Bought second hand">Bought second hand</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>


                    <div class="selections" id="sizeformat">
                        <span>Size format </span>
                        <div class="fix">
                            <select name="sizecountry" id="sizecountry" required="required">
                                <option value="us" selected>US</option>
                                <option value="eu">EU</option>
                                <option value="uk">UK</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>

                    <div class="selections" id="sizeElement">
                        <span>Choose your size:</span>
                        <div class="fix">
                            <select name="size" id="size" required="required">
                                <option value="6" selected>US 6</option>
                                <option value="6.5"> US 6.5</option>
                                <option value="7">US 7</option>
                                <option value="7.5">US 7.5</option>
                                <option value="8">US 8</option>
                                <option value="8.5">US 8.5</option>
                                <option value="9">US 9</option>
                                <option value="9.5">US 9.5</option>
                                <option value="10">US 10</option>
                                <option value="10.5">US 10.5</option>
                                <option value="11">US 11</option>
                                <option value="11.5">US 11.5</option>
                                <option value="12">US 12</option>
                                <option value="12.5">US 12.5</option>
                                <option value="13">US 13</option>
                                <option value="13.5">US 13.5</option>
                                <option value="14">US 14</option>
                                <option value="15">US 15</option>
                                <option value="16">US 16</option>
                                <option value="17">US 17</option>
                                <option value="18">US 18</option>
                                <option value="Other">Other</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div id="moreInputs"></div>

                    <div id="condition" class="selections">
                        <span>Condition:</span>
                        <div class="fix">
                            <select name="condition" required="required">
                                <option value="" disabled selected></option>
                                <option value="Brand new">Brand new</option>
                                <option value="Used">Used</option>
                                <option value="other">Other</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="selections">
                        <span>Shipping:</span>
                        <div class="fix">
                            <select name="shipping" required="required">
                                <option value="" disabled selected></option>
                                <option value="DHL">DHL</option>
                                <option value="UPS">UPS</option>
                                <option value="Postnord">Postnord</option>
                                <option value="other">Other</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="selections">
                        <span>Do you have receipt or box?</span>
                        <div class="fix">
                            <select name="receipt" id="receipt" required="required">
                                <option value="" disabled selected></option>
                                <option value="None">None</option>
                                <option value="Box">Box</option>
                                <option value="Receipt">Receipt</option>
                                <option value="both">Both</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <div class="desc">
                        <span>Description</span>
                        <textarea name="description"></textarea>
                    </div>
                    <div class="premium">
                        <span>Want the product on the frontpage? This generate faster selling! * Price 5 coins</span>
                        <div class="fix">
                            <select name="premium" id="premium" required="required">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <div class="icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Images -->
                <div class="images">
                    <div class="col-number">2</div>
                    <h1>Product photogallery </h1>
                    <div class="img-col">
                        <span class="choosefile">Thumbnail</span>
                        <input type="file" class="imagechooser" name="images">

                    </div>
                    <div class="img-col">
                        <span class="choosefile">Outside panels</span>
                        <input type="file" class="imagechooser" name="images">
                    </div>
                    <div class="img-col">
                        <span class="choosefile">Inside panels </span>
                        <input type="file" class="imagechooser" name="images">
                    </div>
                    <div class="img-col">
                        <span class="choosefile">Backside of Shoes</span>
                        <input type="file" class="imagechooser" name="images">
                    </div>
                    <div class="img-col">
                        <span class="choosefile">Size tag</span>
                        <input type="file" class="imagechooser" name="images">
                    </div>
                    <div class="img-col">
                        <span class="choosefile">Additional Image</span>
                        <input type="file" class="imagechooser" name="images">
                    </div>
                    <div class="img-col">
                        <span class="choosefile">Additional Image</span>
                        <input type="file" class="imagechooser" name="images">
                    </div>
                    <div id="moreImages"></div>

                    <div id="imageguidlines">
                        <h3>Images guidelines </h3>
                        <div class="col">
                            <p> Please use the following guidelines to submit your pictures, make that you clean your
                                phone lens
                                to make sure the pictures are clear for us to see. If we need more information about
                                your
                                product, We will send you an email.</p>
                            <ul>
                                <li>
                                    <a href="#frontsideofproduct">Take a clear picture showing the full front side of
                                        the box, so both the label and any
                                        label added by a retail store can be clearly seen</a>
                                </li>
                                <li>
                                    <a href="#outsideoftheproduct">Take a picture of the outside panels of the shoes,
                                        as shown in the demo </a>
                                </li>
                                <li>
                                    <a href="#insidepanels">Take a picture of the inside panels of the shoes, as shown
                                        in the demo </a>
                                </li>
                                <li>
                                    <a href="#backside"> Take a picture of the backside of both shoes, as shown in the
                                        demo </a>
                                </li>
                                <li>
                                    <a href="#frontisideofboth">Take a picture of the front side of both shoes, as
                                        shown in the demo </a>
                                </li>
                                <li>
                                    <a href="#sizetag">Take a CLEAR picture of the size tag inside the shoes</a>
                                </li>
                                <li> Additional for some products, Jordans : Take a picture of the wings logo, Adidas :
                                    add a
                                    picture of the bottom of the insoles + boost, as shown in the demo</li>
                                <li> Adittional, add a clear picture of receipt
                                </li>
                            </ul>
                        </div>
                        <div class="col">
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
                        <div class="col">
                            <span>Do you have a beta code?</span>
                            <input type="text" id="beta_code" name="betacode" placeholder="*******">
                            <p id="check_beta_code">Check code</p>
                            <span id="beta_code_response"></span>
                        </div>
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
                <div class="submit">
                                      
                        <span id="totalpricetoaddproduct">Total price: 10 coins </span>
                        <span class="ajaxresponse"></span> 
                        <input type="submit" value="Post Product">
                        <h1>Some people might experience issues while uploading images and adding the product. We are working to fix this problem.</h1>
                </div>
            </form>
            <div class="success"></div>
        </div>
    </section>
</div>
