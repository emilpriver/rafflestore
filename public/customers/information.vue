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
                    <li>
                        <a href="/allraffles">All raffles</a>
                    </li>
                    <li>
                        <a href="/dice">Dice</a>
                    </li>
                    <li class="active">
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
    <section id="information">
        <div class="hero">
            <div class="con">
                <h1>Information & FAQ</h1>
            </div>
        </div>
        <div class="content">
            <div class="bigimg small">
                <h1>How to buy</h1>
                <div class="images">
                    <div class="img-col"><img src="/img/how-to-buy/1.png"></div>
                    <div class="img-col"><img src="/img/how-to-buy/2.png"></div>
                    <div class="img-col"><img src="/img/how-to-buy/3.png"></div>
                    <div class="img-col"><img src="/img/how-to-buy/4.png"></div>
                    <div class="img-col"><img src="/img/how-to-buy/5.png"></div>
                    <div class="img-col"><img src="/img/how-to-buy/6.png"></div>
                </div>
            </div>
            <div class="bigimg">
                <h1>How to sell</h1>
                <div class="images">
                    <div class="img-col"><img src="/img/how-to-sell/1.png"></div>
                    <div class="img-col"><img src="/img/how-to-sell/2.png"></div>
                    <div class="img-col"><img src="/img/how-to-sell/3.png"></div>
                    <div class="img-col"><img src="/img/how-to-sell/4.png"></div>
                    <div class="img-col"><img src="/img/how-to-sell/5.png"></div>
                    <div class="img-col"><img src="/img/how-to-sell/6.png"></div>
                    <div class="img-col"><img src="/img/how-to-sell/7.png"></div>
                </div>
                <div id="faq"></div>
            </div>
            <div class="col">
                <h1> Frequently Asked Questions</h1>
                <div class="title">
                    <h2>Raffle</h2>
                </div>

                <div class="info">
                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>How long will my deposit take?</span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    A deposit to your Rafflestore account through paypal should be instant, if you got any problems regarding not recieving coins you should contact us at support@rafflestore.com. Please wait at least 1 hour before contacting us since there can be a delay between paypal and Rafflestore server! 

                                </p>


                            </div>

                        </div>
                    </div>
                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>How do I deposit?</span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    To make a deposit to your Rafflestore account you need to be logged in, then press
                                    the Deposit button found on your profile page. If you have any difficulties with
                                    depositing into your Rafflestore account please Contact Us and we will look to
                                    resolve this for you.
                                </p>


                            </div>

                        </div>
                    </div>

                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>What is an IBAN, Swift Code and BIC?
                                </span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    The International Bank Account Number (IBAN) is an international standard for
                                    numbering bank accounts. The IBAN consists of a two letter country code and up to
                                    thirty alphanumeric characters. If you reside in the EU, you can find the IBAN
                                    number on your bank statement.
                                    A swift code is a code that is unique to your branch of the bank (also known as a
                                    Bank Identifier Code or BIC). This code can usually be located on your cheque book
                                    and consists of either 8 or 11 characters. If you are in any doubt, please contact
                                    your branch to confirm the correct code.

                                </p>


                            </div>

                        </div>
                    </div>



                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>Are my transactions/personal details secure?</span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    Our site has been developed with your personal privacy and security as our prime
                                    concern. Using only the highest standards of data encryption to ensure your details
                                    cannot be accessed or misused.
                                </p>


                            </div>

                        </div>
                    </div>


                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>How many days do I need to wait for the raffle draw?</span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    The raffle draw takes place automatically once all available tickets are purchased.
                                    If the raffle ends before all tickets are bought we will refund you the amount you
                                    bought tickets for. (Including fees).

                                </p>


                            </div>

                        </div>
                    </div>

                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>How do I know if i won a raffle?
                                </span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    An email will be sent out to the winner after the raffle ends. You can also check
                                    the winning user under the Raffle.
                                </p>


                            </div>

                        </div>
                    </div>


                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>What happens if I am the winner? </span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    You will be notified by email if you are the winner of a Raffle. You and the raffle
                                    creator will see a new page with all details needed for shipping the product. This
                                    page also contains the Received button that is used when the winner picks up the
                                    product from the postal office.

                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>Delivery of the the prize? </span>
                            </div>
                            <div class="faqtext">
                                <p>

                                    When you register an account on Rafflestore you will provide details needed for
                                    shipping purpose. This information will be only be available to the creator off the
                                    raffle if you’re the winner.

                                </p>
                            </div>
                        </div>
                    </div>


                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>What if the number of available tickets are not sold?
                                </span>
                            </div>
                            <div class="faqtext">
                                <p>

                                    Ιf all tickets are not purchased within the expiration date of the raffle, all the
                                    ticket cost will be refunded to the users that bought tickets. (Including ticket
                                    fees).

                                </p>
                            </div>
                        </div>
                    </div>


                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>Do I pay tax on winning products?</span>
                            </div>
                            <div class="faqtext">
                                <p>You need to consult with your tax advisor if you are the winner of a prize in order
                                    to pay the necessary tax in your country.</p>
                            </div>
                        </div>
                    </div>

                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>How do I change my password?
                                </span>
                            </div>
                            <div class="faqtext">
                                <p>You can change your password by logging into your account and going to Profile ->
                                    Settings</p>
                            </div>
                        </div>
                    </div>



                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>How do I verify my account?
                                </span>
                            </div>
                            <div class="faqtext">
                                <p>In order to verify your account you will need to complete our Know Your Customer
                                    (KYC) process.
                                    To complete KYC we require a copy of either your Passport or ID Card and a document
                                    that verifies your name and address. This can be one of the following and must be
                                    dated within the last three months:
                                    a) Bank statement
                                    b) Credit/debit card statement
                                    c) Utility bill
                                    The quickest way to provide your documents is to upload a copy via the Settings
                                    page through your Profile page at the upper right corner of the page.
                                    When logged in go to your Profile -> Settings -> Scroll down to Verify. If you
                                    cannot use the upload facility, you can take a photograph of your document using
                                    your smartphone or camera and email this to us at support@rafflestore.com. Once the
                                    review is complete we will notify you by email. Please be aware that documents
                                    received by email may take up to 2-3 business days to review.
                                    If you are providing a credit or debit card statement please ensure that you
                                    obscure the card number before you send your document, leaving only the first six
                                    and last four digits of the number visible (e.g. 1234 56XX XXXX 7890).
                                    Once we have received your documents we will contact you by email to confirm your
                                    details and complete the verification of your account.
                                </p>
                            </div>
                        </div>
                    </div>



                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>I have forgotten my username/password - what can I do?

                                </span>
                            </div>
                            <div class="faqtext">
                                <p>Press the Sign-in button at the top right corner, select forgot password located
                                    under the username and password fields which will redirect you to the forgot
                                    password page.

                                    To reset your password you will need to enter your email that's associated with
                                    your account. Once you request a new password more detailed instructions will be
                                    sent to your email. If you don't receive an email please Contact Us and we will
                                    help you with restoring your password.

                                </p>
                            </div>
                        </div>
                    </div>



                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>Why do I have to validate my e-mail?


                                </span>
                            </div>
                            <div class="faqtext">
                                <p>Before you can use your account, you are required to validate your email address.
                                    Upon account registration we will send you an email to the email registered with us
                                    that contains an activation link. To activate your account, simply open the email
                                    sent upon registration and follow the instructions.

                                    If you have not received this email, please be aware that dependent upon your email
                                    provider this may take a short time to appear in your inbox. If it does not appear
                                    please check any Junk or Spam filters to ensure that the email has not got caught
                                    in one of these.
                                    Should you have any difficulty with the above please Contact Us and we shall help
                                    you.

                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>How do I view my account history?


                                </span>
                            </div>
                            <div class="faqtext">
                                <p>You can view your account transactions if you go to your Profile -> Transactions.
                                    Here you will find transactions details including the tickets you have bought,
                                    deposits and withdrawals.

                                </p>
                            </div>
                        </div>
                    </div>



                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>What online security does Rafflestore use? </span>
                            </div>
                            <div class="faqtext">
                                <p>The Rafflestore site uses LetsEncrypt SSL web server certificates to offer secure
                                    communications by encrypting all data to and from the site. SSL is used to protect
                                    the sensitive information that is sent and received including personal information
                                    and credit/debit card details. For reasons of speed of display, SSL pages are shown
                                    in pop-up windows. Secure pages can be verified by the presence of the padlock
                                    symbol that is displayed in your browser. For Internet Explorer users, you can also
                                    right-click the mouse and view the page properties, where you will observe that we
                                    use SSL (Secure Sockets Layer). Netscape users can right-click the mouse and select
                                    Page Info to view the SSL information. Opera users can right-click the mouse and
                                    select Duplicate Window to open the SSL page in a full window and observe the
                                    padlock symbol.
                                </p>
                            </div>
                        </div>
                    </div>



                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>Who can I talk to about responsible gambling?</span>
                            </div>
                            <div class="faqtext">
                                <p>Our dedicated Responsible Gambling area contains further information regarding this
                                    topic and can be accessed via the Responsible Gambling link at the bottom of this
                                    page, alternatively it can be found here(LÄNK).
                                    Should you wish to discuss this with a third party organization that offers
                                    independent, confidential and free advice, their contact details can be found
                                    below:
                                    Gambling Therapy
                                    Gambling Therapy is a non-profit organization, which offers support to those
                                    addicted to gambling and those who show problematic gambling behavior. Further
                                    information can be found by visiting their website: www.gamblingtherapy.org.
                                </p>
                            </div>
                        </div>
                    </div>




                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>Can I withdraw the value of promotional coupons?</span>
                            </div>
                            <div class="faqtext">
                                <p>The value of the coupon cannot be withdrawn in any case.</p>
                            </div>
                        </div>
                    </div>


                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>How do I know that the product is real?</span>
                            </div>
                            <div class="faqtext">
                                <p>When an user creates a raffle they are required to send detailed pictures followed by
                                    our image guidelines for a legit check. When we get the pictures we have a
                                    professional team of people that legit check the shoes carefully.

                                    If the shoes are in fact fake or if we struggle with legit checking them due to bad
                                    pictures or other reasons we won't accept the raffle. This way you can feel
                                    comfortable and secure not buying any fakes.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>How do i get my money when a raffle ends?</span>
                            </div>
                            <div class="faqtext">
                                <p>When your raffle has ended and the winner has been announced you will get the details of the winner including shipping address. When the winner receives the product and press the “Received” button on rafflestore you will get the money transfered to you. This way both parties are protected.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>What if the product gets lost?</span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    If the product sent by the creator of the raffle gets lost on the way to the winner, it's beyond Rafflestore control. We advice the creator of the raffle and the winner to contact the postal service used to ship the product.

                                </p>
                            </div>
                        </div>
                    </div>


                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>The winner claims the product is FAKE (as seller)</span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    Rafflestore recommends that the winner of the raffle records while packing the product to the winner. This way we can see that it's the right product getting shipped. This way both parties are secured.


                                </p>
                            </div>
                        </div>
                    </div>




                    <div class="faq">
                        <div class="before">+</div>
                        <div class="content">
                            <div class="faqtitle">
                                <span>The winner says he didn’t get the product, what should I do?</span>
                            </div>
                            <div class="faqtext">
                                <p>
                                    You will need to Contact Us, from there we will check the tracking number provided by you, if the winner picked up the product without pressing the received button on Rafflestore we will take immediate action.

                                </p>
                            </div>
                        </div>
                    </div>




                </div>
            </div>

        </div>
    </section>
</div>
