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
    <section id="privacy">
        <div class="con">
            <h1>Terms of use</h1>
            <div class="privacyContent">
            <h1>TERMS AND CONDITIONS</h1>

               <span>Welcome to <a href="//rafflestore.com">www.rafflestore.com</a>. Your use of this website (including the website’s contents, other services, and any information) in any way means that you accept to be legally and fully bound by
               these terms and conditions as detailed hereinafter, as your use of this website and our unique services is conditioned upon your full acceptance of the same.
               If you do not agree fully with all of our terms, we advise that you stop using this website and exit it immediately.
               We may at any time using our sole discretion (and without prior notice to you and other users) revise, modify, or totally change these terms and conditions. We will however make sure to indicate the last updated date at the top
               center of this page. Your use of the Rafflestore website after we have made and updated any amendments and modifications shall be deemed as your acceptance of the amended terms.</span>



               <h3>GENERAL INFORMATION</h3>
               <span>The Rafflestore website is run and its services provided by Trannel (International) Ltd, a company registered on 28 May 2018 under the laws of Malta, with Company Registration No. C 26127, and having its registered office and
               business address at “Fawwara Bldgs", Msida Road, Gzira GZR1405, Malta.</span>



               <h3>HOW THE RAFFLESTORE WEBSITE WORKS</h3>
               <span>Rafflestore is an online platform supplying raffles in the shoe merchandise industry. Registered users have the opportunity to buy or sell their limited fashion merchandise (including but not limited to shoes, hoodies, jackets,
               pants, etc) on the website through the mechanism of a raffle draw. Once a seller puts up a pair of limited merchandise up for sale for a number of tickets, those tickets are sold to intending buyers; and the limited merchandise
               will thereafter be raffled to only one of the buyers whose ticket is picked through a raffle draw.
               You understand and accept that this is a sell/buy platform that operates through the mechanism of raffle draws. You however accept and agree that while www.rafflestore.com acts as a platform for the raffle draws, it does not by
               itself offer or provide limited merchandise for sale.</span>





               <h3>LICENSE AND PERMISSION</h3>
               <span>We provide our website for the use of individuals who are at least 18 years old or older, and grant such persons a limited, rescindable, nonexclusive, nonassignable and nonsublicensable license to access and use <a href="//rafflestore.com">www.rafflestore.com</a>
               in compliance with all the provisions of these terms and conditions.
               Our website and services are made available for use for users who are located in Malta as well as all other countries of the world. All international users however understand and accept that they link and use our website at their
               own risk and will be answerable for their compliance with all applicable local laws.</span>



               <h3>REGISTERING A USER ACCOUNT</h3>
               <span>In order be able to fully use all aspects of website (rather than being a visitor), you must first register for and consequently maintain an active Rafflestore user account. This required registration process will necessitate you
               to make available private information about yourself such as name, contact information, country of residence, phone number and payment information.
               You understand that registration with Rafflestore is absolutely free.
               A Rafflestore Account Holder is hereby defined as an individual having a contractual relationship with Rafflestore by creating a Rafflestore Account on the Website. Your Rafflestore Account must be held only for bonafide
               transactions, and with a strict aim to establish a normal commercial relationship with Rafflestore and with the strict purpose of conducting a selling/buying relationship through raffle draws.
               To continue to gain access to the Rafflestore website and your Rafflestore Account, you agree to retain only correct, honest, complete, and current information under your user profile. We may partially restrict your access to the
               website or completely terminate such if your account information is discovered by us to be inaccurate, incomplete and/or untruthful.
               You agree to be personally and legally responsible for every activity that occurs under your Rafflestore account. You must preserve the privacy and security of your account including your username and password, and other relevant
               log in details, and must inform us immediately if you suspect that a third party has compromised your account security.</span>



               <h3>COPYRIGHTS AND INTELLECTUAL PROPERTY</h3>
               <span>All graphics, pictures, text, designs, icons, video clips, written materials and all other materials made available on and through this website are copyrighted, trademarked, controlled and/or licensed by Trannel (International)
               Ltd, its affiliates or by their corresponding creators. All such materials are protected by Maltese laws and international copyright laws.
               The Trannel (International) Ltd and Rafflestore names, our website, page headers, logos, button icons, service names, and scripts included in or made available through www.rafflestore.com are trademarks or trade dress of Trannel
               (International) Ltd in Malta and in other countries.</span>



               <h3>USER PROVIDED CONTENT</h3>
               <span>Registered users of the Rafflestore website may upload their comments and other materials to the website, whether to share their raffle draw experiences or otherwise. You represent that you are the sole proprietor of your user
               provided content uploaded and/or that you have obtained all the rights and licenses necessary to grant Trannel (International) Ltd and Rafflestore the license to your user provided content. Such user provided content must not
               infringe, disregard or misappropriate a third party’s rights to publicity or privacy, and must under no circumstances result in the violation of any law or regulation.
               While any user content provided by you remains your property, you grant us by such a provision an international, infinite, irrevocable, transferrable, royalty-free license, to use such user provided content with full rights to
               adapt, replicate, sub-license, make derivative works of, publicly perform, openly show, allocate, and to otherwise use such user provided content without requiring further consent from you, and without having to provide
               notification or compensation to you or any other entity.</span>



               <h3>SPECIFIC TERMS FOR SELLERS</h3>
               <span>Below are our terms of sales for sellers. By making your services as a seller available on the website, you accept these terms and agree to be bound by them.
               Listing fees: You understand and accept that while there is no fee involved in creating a Rafflestore account, you will be required to pay a listing fee of $5 for every product that you upload for sale. You also understand and
               accept that this fee is non-refundable, regardless of the outcome of the raffle draw.
               Approval/Rejection of merchandise: We reserve the right to approve or reject the offer for sale of any merchandise that you make available using our discretion, with or without any reason. You accept that you will have no legal
               recourse against Rafflestore for the rejection of your merchandise.
               Products: You may sell only your own limited merchandise on our website and may not under any circumstances sell or offer for sale any merchandise of which you are not an authorized owner.</span>



               <span>Product check: We have the right to conduct a professional product check to determine if your merchandise is authentic or not. You however accept that we may do this only through checking the pictures of your products. The
               responsibility of ensuring that all products you offer for sale are legitimate are ultimately yours, and we will not bear any responsibility to any buyer (whether legal, financial or otherwise) for illegitimate products offered
               by you for sale.</span>


          <span>Pricing information: You understand that all merchandise are quoted in their equivalent ticket numbers (and not in any country’s currency), due to our unique service offering.</span>

          <span>Obligations to purchaser: Every seller shall be responsible to a winning customer in respect to order delivery. You are responsible for contacting buyer directly to clarify processing time and delivery time for products bought.
               You or the buyer shall bear responsibility for shipping charges, as decided by the two of you. Rafflestore shall not be liable in any way for shipping charges. As a seller, you must however send won products to buyers with a
               unique tracking code that allows for easy tracking by you, the buyer and Rafflestore.</span>

          <span>Taxes/customs and other charges: You are responsible for declaring your own taxes (if applicable) to the appropriate government authorities.
               Return and refund Policy: You are absolutely responsible for setting your refund and return policy. Rafflestore shall bear no responsibility toward any customer in lieu of refunds and/or returns of purchased items.
               Customer relations: Sellers shall be responsible for answering all sales-related questions posed by purchasing customers and are charged with the responsibility of managing customer relations. It is not Rafflestore’s
               responsibility to mediate in conflict or to resolve any issue between seller and buyer.
               Paypal/Visa refunds: To continue to use your Rafflestore account, you must always make a withdrawal to your bank account, rather than on PayPal or Visa for coins bought.</span>


               <h3>BUYER TERMS</h3>
               <span>By purchasing limited merchandise (merchandise) and related goods on the website, you as a buyer hereby agree to the following:

               Participating fees: You understand and accept that while there is no fee involved in creating a Rafflestore account, you will be required to make payment for tickets for every merchandise you express an interest in. You also
               understand and accept that this fee is non-refundable, regardless of the outcome of the raffle draw.
               Pricing information: You understand that all merchandise are quoted in their equivalent ticket numbers (and not in any country’s currency), due to our unique service offering.
               Delivery: You are to take delivery of goods ordered at the address specified on, or as close as is possible to the date agreed upon by the seller and you. You shall make all arrangements necessary to take delivery of the limited
               merchandise whenever they are tendered for delivery.
               Verification of merchandise’s authenticity: Rafflestore will under no circumstances be responsible for confirming if any limited merchandise offered by a seller is real. This is your responsibility, and you are charged with the
               responsibility of making a police report or pursuing legal means should you have any problems with the seller. Since we strive to be as fair as possible, we will release the funds involved in any such disputed case to whichever
               party is adjudged by a relevant court as the winner.
               Communication with seller: You are charged with the responsibility of communicating with a selling seller in respect to detailed products description; shipping policy; and all other details. You expressly agree that Rafflestore
               will not be held responsible for communications and details of communication between you and seller. You must ask your seller to send won products to you with a unique tracking code that allows for easy tracking by you, the
               seller and Rafflestore.
               Received merchandise: Rafflestore has a “Received” button on every buyer’s profile. Once you click on that button after a raffle draw, it means that you have received the merchandise in question from the seller. We will go ahead
               to make payment to the corresponding seller after this, and will not be able to offer you a refund or help with resolution of sales issues.
               Taxes/customs and other charges: You are responsible for declaring your own taxes (if applicable) to the appropriate government authorities.
               Indemnity: You must indemnify and hold Rafflestore, its related companies, officers, directors, employees and agents harmless from and against all liabilities, attorneys’ fees and costs, damages, losses, costs and other expenses
               in relation to your purchase of any products made available on or through this website and its services.
               Paypal/Visa refunds: To continue to use your Rafflestore account, you must always make a withdrawal to your bank account, rather than on PayPal or Visa for coins bought.</span>




               <h3>OTHER RULES ABOUT THE USE OF THE WEBSITE</h3>
               <span>Every user is answerable for his/her conduct and activities on www.rafflestore.com, including without limitation all usernames and passwords, graphics, photographs, text, items, audio, images, data, video, and links uploaded and
               presented on the website.
               You accept that information posted by any other profiled user on his/her profile is only an illustration of how he/she describes him/herself, and you are not to assume that any information filled in any profile is authentic.
               Rafflestore will not be liable or answerable for any fake profile or merchandise uploaded and maintained by any user, and for any damages, hurts and losses incurred by any other user in dependence upon that false information.
               You agree that we are not in any way obligated to authenticate that user profiles and/or merchandise are real and not fake. We will not be liable for the inaccuracy or falsehood of information on profiles.
               You understand and accept that other Rafflestore users will be able to view your user profile, and may use such user profile to connect with you. You may also view the profiles of other registered users as well. Any uploads that
               you make are done at your discretion, and you divulge or make available any sensitive information about yourself solely at your own risk.
               We will under no event be held liable for any loss, hurt or damage that any user may incur in connection or relating to the use of the website.
               As a Rafflestore user, you must not allot, license, exhibit, make derivative works of, or sell content from www.rafflestore.com, except with our prior written permission.
               You must not purposely introduce viruses, worms, Trojans, logic bombs or any other malicious or technologically harmful software to our website, and are proscribed from removing any trademark, copyright or other proprietary
               notices from any part of our website.
               You may not transmit or post any information, picture or any other material, which in the rational opinion of Rafflestore is racist, libelous, sexually suggestive or explicit, menacing, and/or obnoxious; and/or transmit or post
               any image, information or any other material, which in the sensible opinion of Rafflestore is capable of offending any other users’ religious or political beliefs.
               You are not to mirror, link to, or frame any part of the website and its services; or try to gain unlicensed access to or incapacitate any part of our website and related systems.
               You may not restrict or inhibit any other person’s use of the website; and must not create, transfer or store electronic replicates of materials that are copyright-protected without the consent of the owner.
               You may not send junk e-mail to other users; ill-use any part of the website for any illegal purposes; or use the website to disseminate content that encourages criminal offenses.
               You may not transfer, allocate or allow any other person to use your account in any way; and are not to ill use the Rafflestore website to harass or threaten other users.
               If you are discovered to be in the breach of any of the provisions of this agreement, you will be held personally responsible for all legal costs and losses arising out of your breach. Also, we may terminate your use of the
               Rafflestore website without any prior warning if you breach any of these terms.</span>



               <h3>LINKS</h3>
               <span>We may occasionally make available third party hyperlinks to other websites and resources on Rafflestore. It is recommended that you not take the presence of such third party links as Rafflestore’s endorsement and recommendation
               of the procedures, policies, content, services and/or products of that linked website, except we specifically state so.
               Your access to and use of such these websites and resources is at your own personal risk, and we recommend that you always check third party websites’ terms, policies and conditions before using them.</span>



               <h3>LIMITATION OF LIABILITY AND DISCLAIMER</h3>
               <span>The Rafflestore website and its services are provided only on an “as is” and ‘”as available” basis. We make no representation and give no guarantees that they will meet your requirements or your expectations. We make no
               representation of any type, whether direct or otherwise regarding the operation of the website and/or regarding the user profiles, content, information, and all other materials displayed on and provided through the website.
               We plainly disclaim all warranties, direct or otherwise (including but not in any way limited to implied warranties of fitness for a particular purpose, suitability, and/or merchantability) to the full degree that is allowable by
               relevant law.
               Rafflestore shall not be held responsible for any loss, hurt or damage (whether direct, supplementary, associated, penal, or comprehensive) in connection with any user’s use of the Rafflestore site.
               We will not bear liability towards you or any third party for any adverse circumstance or situation brought about by events that are past our reasonable control that may cause our services to be disrupted, late, or degraded; and
               for any losses, hurts, or damages of any kind that may be incurred as a result of using www.rafflestore.com.
               We will not have any duty to you or any other individual for any unforeseeable disasters or harms. Rafflestore will not under any circumstances be responsible for any harm, hurts or damages suffered by users who use this website
               to meet with other users or exchange merchandise with them.
               Nothing included in this agreement is intended to exclude or limit any legal responsibility for injury or death arising from our deception, carelessness, or any other liability which may not be exempted or limited by law, or that
               is aimed at affecting your statutory rights as a consumer.
               Should certain applicable law not allow the limitation of liability set forth above, this limitation of liability will not be applicable to you.</span>



               <h3>INDEMNITY</h3>
               <span>You agree to defend and indemnify Rafflestore, its subsidiaries and affiliates, their officers, executives, and managers, blameless and free from any claims, liabilities, damages, compensations, and expenses, including without
               limitation accounting fees and reasonable legal fees, that are in any way connected with your use of the Rafflestore website and services or that are related to your breach of theseterms and conditions.</span>



               <h3>CHOICE OF LAW/REGULATOR</h3>
               <span>In all respects and regards, these terms and conditions are construed and governed by the laws of Malta. The Regulator is the Malta Gaming Authority. The Malta Gaming Authority is a regulatory authority established under the laws
               of Malta to govern all forms of gaming in Malta. For more information, please visit www.mga.org.mt.</span>



               <h3>SEVERANCE</h3>
               <span>Should any provision of these terms be adjudged to be invalid or unenforceable for any reason by a Maltese court having expert jurisdiction, then such a provision shall be made void while the remaining provisions shall survive
               and remain binding and enforceable.</span>



               <h3>WAIVERS</h3>
               <span>You understand and admit that no waiver of any provision of these terms and conditions will be deemed a waiver of any similar provision, or a waiver of that provision at a later date. Rafflestore’s failure to enforce any term of
               this contract shall not be taken as a waiver of Rafflestore’s rights hereunder at any time to enforce the strict compliance thereafter with every term hereof.</span>



               <h3>ENTIRE AGREEMENT</h3>
               <span>You agree that these terms and conditions and all other materials referenced within them are the entire agreement between Rafflestore and you in connection with our website and services, and shall supersede all other
               communications (be it spoken, written, or electronic) between you and Rafflestore concerning our services and will strictly govern our future relationship.</span>

            </div>
        </div>
    </section>
</div>
