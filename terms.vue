<div id="app">
        <header class="notfrontpage">
                <div class="con">
                    <div class="navimg">
                        <a href="/">
                            <img src="/img/rafflestoreimg.png"> </a>
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
                                    <a href="/login">Sign In</a>
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
    <section id="privacy">
        <div class="con">
            <h1>Terms of use</h1>
            <div class="privacyContent">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam scelerisque, felis vel tempus
                    lobortis,
                    nunc neque volutpat
                    sapien, aliquet pellentesque nisl urna non turpis. Sed id erat mi. Interdum et malesuada fames ac
                    ante
                    ipsum primis in faucibus. Vivamus vehicula felis vitae metus malesuada, at egestas arcu pulvinar.
                    Nam
                    vel bibendum mi. Vivamus ligula metus, ultricies ac massa non, tempus tempor ipsum. Donec facilisis
                    nisi
                    id dolor laoreet, vitae efficitur urna interdum. Vestibulum sodales diam at arcu facilisis feugiat.
                    Donec
                    viverra lectus quis augue condimentum, nec porttitor justo tempor. Donec vitae mauris sit amet
                    velit
                    interdum auctor.</p>
                <p>
                    Maecenas velit lectus, malesuada nec tellus a, accumsan ultrices elit. Duis id commodo sem, in
                    mattis
                    ante. Mauris aliquet
                    enim et velit varius, eget suscipit tortor laoreet. Vivamus et dolor ullamcorper, viverra erat sed,
                    pellentesque
                    mauris. Sed et eleifend est. Quisque suscipit ex urna, nec consectetur purus consequat id. Interdum
                    et
                    malesuada fames ac ante ipsum primis in faucibus. Ut tempus fermentum molestie. Quisque mollis
                    sollicitudin
                    urna in pulvinar. Aenean imperdiet laoreet nisl at auctor. Mauris luctus tempus nunc, vitae
                    ullamcorper
                    risus luctus quis. Donec vitae placerat enim. In ullamcorper faucibus augue viverra cursus.
                    Maecenas
                    scelerisque in diam finibus tincidunt. Ut sit amet arcu lacus.</p>

                <p>Pellentesque vel lacus tristique, feugiat mi at, mattis ante. Nunc vitae feugiat est. Pellentesque
                    luctus
                    feugiat tellus quis ullamcorper. Sed sagittis sem sit amet ex elementum iaculis. Vestibulum
                    elementum,
                    mi nec consequat ultrices, lorem odio gravida tortor, vel finibus risus tellus ac velit. Nam magna
                    libero,
                    condimentum pulvinar mauris quis, ornare gravida mi. Sed tristique, orci sit amet sodales sagittis,
                    odio
                    enim sagittis ligula, a accumsan justo neque quis sem. Vestibulum lacus augue, dictum nec nulla
                    sed,
                    dapibus rhoncus lacus. Vivamus semper, ex vitae bibendum tincidunt, nulla augue suscipit lorem,
                    vulputate
                    posuere lacus lorem ac nulla. Curabitur nec dui ut leo dapibus pellentesque. Integer lacinia odio
                    nisi,
                    sit amet viverra leo venenatis id. Curabitur vitae rhoncus sem. Vestibulum dolor nisl, consequat
                    sed
                    feugiat nec, fermentum et lacus. Nam at consequat magna, id sodales nunc.</p>
                <p>

                    Quisque finibus ipsum purus, non bibendum orci pretium eu. Morbi tempor venenatis vehicula. Lorem
                    ipsum
                    dolor sit amet, consectetur
                    adipiscing elit. Etiam eu auctor dui. Nullam tortor sem, aliquam vel velit sed, mollis auctor
                    risus.
                    Vestibulum sagittis sem et pulvinar rhoncus. Vestibulum ut dolor et augue consequat congue. Quisque
                    quis
                    mauris fringilla, varius lacus maximus, malesuada nunc. Aenean sit amet placerat dui. Integer eros
                    augue,
                    aliquam at elit non, tristique imperdiet nunc. Integer vel neque massa. Proin ut sapien imperdiet,
                    luctus
                    velit quis, vehicula est. Curabitur euismod luctus orci sed scelerisque. Mauris elementum placerat
                    eros,
                    sit amet porta augue lacinia vel. Etiam consequat elit ullamcorper condimentum bibendum. Donec
                    velit
                    odio, varius ut ante quis, pellentesque volutpat massa.
                </p>
                <p>
                    Vestibulum ipsum ante, maximus scelerisque feugiat quis, convallis id velit. Nullam porta ornare
                    dictum. Donec pharetra odio
                    ut egestas consectetur. Integer a commodo elit. Nullam luctus, urna vel dapibus ullamcorper, velit
                    magna
                    vestibulum nibh, ut tempor sem turpis vitae leo. Donec molestie pretium dignissim. Integer mi diam,
                    malesuada
                    in imperdiet vitae, eleifend eu dui. Nullam vel suscipit purus. Aliquam erat volutpat. Praesent
                    condimentum
                    accumsan mauris tincidunt sodales. Aenean eu viverra augue. Donec eget maximus tortor. Ut in
                    molestie
                    nisl. Nulla at mi vel nunc rhoncus elementum nec ac orci. Praesent pharetra consectetur
                    scelerisque.
                </p>

            </div>
        </div>
    </section>
</div>