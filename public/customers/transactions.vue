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
    <section id="transactions">
        <div v-if="login === true" class="con">
            <h1>Transactions</h1>
            <div class="filter-items">
                <span>Filter items</span>
                <select id="filteritems">
                    <option value="all">All</option>
                    <option value="Bought coins">Bought coins</option>
                    <option value="Bought Ticket(s)">Bought Ticket(s)</option>
                    <option value="Rolled dice">Rolled dice</option>
                    <option value="Sent product for review">Sent product for review</option>
                    <option value="Declined product">Bought coins</option>
                    
                </select>

            </div>
            <div class="filter-date">
                <span>Filter Date</span>
                <input type="date" :value="DateOneYearBack" class="filter-date-input" id="first-date">
                <div class="spacer">-</div>
                <input type="date" :value="todaysdate" class="filter-date-input" id="last-date">
            </div>
            <div class="content">
                <div class="title">
                    <div class="item small">+/-</div>
                    <div class="item">Transaction</div>
                    <div class="item small">Amount</div>
                    <div class="item">Date</div>
                    <div class="item">Balance</div>

                </div>
                <div v-if="transactions.length > 0">
                    <div v-for="item in transactions" class="transaction" :data-type="item.type" :data-date="item.date">
                        <div class="item small">
                            <span v-if="item.status == 'plus'" class="green">+</span>
                            <span v-else class="red">-</span>
                        </div>
                        <div class="item">{{item.type}}</div>
                        <div class="item small">
                            <span v-if="item.status == 'plus'" class="green">{{item.coins}} $</span>
                            <span v-else class="red">{{item.coins}} $</span>
                        </div>
                        <div class="item">{{item.date}}</div>
                        <div class="item">{{item.balance}}$</div>
                        <div class="item">
                            <span class="moreinfobtn">More Info</span>
                        </div>
                        <div v-if="item.type == 'Bought coins'" class="moreinfo">
                            <p>Transaction id: {{item.id}}</p>
                            <p>PaymentID: {{item.PaymentID}}</p>
                            <p>PayerID: {{item.PayerID}}</p>
                        </div>
                        <div v-else-if="item.type == 'Bought Ticket(s)'" class="moreinfo">
                            <p>Transaction id: {{item.id}}</p>
                            <p>Product name: <a :href="'/product/' + item.productid" v-html="item.product_name"></a></p>
                            <p v-html="'Sellers name: ' + item.sellername"></p>
                            
                        </div>
                        <div v-else-if="item.type== 'Rolled dice'" class="moreinfo">
                            <p>Transaction id: {{item.id}}</p>
                            <p>Your picked number: {{item.dicepicked}}</p>
                            <p>Rolled: {{item.rollednumber}} </p>
                            <p>Your bet multiplied: {{item.rolledtimes}}x</p>
                            <p v-if="item.rolledside == 'Direct pick'">Your bet was an direct pick</p>
                            <p v-else> Rolled side: {{item.rolledtype}}</p>
                        </div>
                        <div v-else-if="item.type== 'Sent product for review'"   class="moreinfo">
                            <p>Coupon code: {{item.code}}</p>
                            <p>Transaction id: {{item.id}}</p>
                        </div>
                        <div v-else-if="item.type== 'Declined product'" class="moreinfo">
                            <p>Transaction id: {{item.id}}</p>
                        </div>
                        <div v-else class="moreinfo">
                            <p>Sorry,we dont have any data to show you about this transaction</p>
                        </div>
                    </div>
                    <div class="javascriptResponse"></div>
                </div>
                <div v-else class="notransactions">
                    <p>No transactions found</p>
                </div>
            </div>
        </div>
        <div v-else class="con">
            <h1>You need to be loggedin to see this page</h1>
        </div>
    </section>
</div>