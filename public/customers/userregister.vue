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
     <section id="register">
          <div class="content">
               <div class="con">
                    <a href="/">
                < back to homepage</a>
                    <form action="/register" method="post" class="registerform" novalidate>
                         <h1>Join Rafflestore</h1>
                         <!-- Step one -->
                         <div class="step">
                              <div class="steptitle">
                                   <div class="number">1</div>
                                   <h2>Account Details</h2>
                              </div>
                              <div class="inputs">
                                   <input type="email" name="mail" class="enterchecker" placeholder="E-Mail Address" required>
                                   <input type="password" class="enterchecker" name="password" placeholder="Password" required>
                            </div>
                              </div>
                              <!-- Step Two -->
                              <div class="step">
                                   <div class="steptitle">
                                        <div class="number">2</div>
                                        <h2>Personal Information</h2>
                                   </div>
                                   <div class="inputs">
                                        <div class="row">

                                             <div class="select">
                                                  <select name="year">
                                            <option value="" selected disabled>Year</option>
                                            <option v-for="n in range(1900,todaysyear).slice().reverse()">{{ n }}</option>
                                        </select>
                                             </div>

                                             <div class="select">
                                                  <select name="month">
                                            <option value="" disabled selected>Month</option>
                                            <option value="1"> January</option>
                                            <option value="2"> February</option>
                                            <option value="3"> March</option>
                                            <option value="4"> April</option>
                                            <option value="5"> May</option>
                                            <option value="6"> June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>
                                             </div>
                                             <div class="select">
                                                  <select name="day">
                                            <option value="" selected disabled>Day</option>
                                            <option v-for="item in 31" :value="item">{{item}}</option>
                                        </select>
                                             </div>
                                        </div>
                                        <div class="row">
                                             <input type="text" name="firstname" placeholder="First Name" required>
                                             <input type="text" name="lastname" placeholder="Last Name" required>
                                </div>
                                        </div>
                                   </div>
                                   <!-- Step three-->
                                   <div class="step">
                                        <div class="steptitle">
                                             <div class="number">3</div>
                                             <h2>Address</h2>
                                        </div>
                                        <div class="inputs">
                                             <div class="address-row">
                                                  <input type="text" name="address" class="addresspicker" placeholder="Street Address" required>
                                                  <input type="text" name="postnumber" class="postnumberpicker" placeholder="Zip Code" required>
                                </div>
                                                  <div class="select-row">
                                                       <input type="text" name="city" placeholder="City" required class="city">
                                    <select name="country">
                                        <option value="" selected disabled>Country</option>
                                        <option value="AF">Afghanistan</option>
                                        <option value="AL">Albania</option>
                                        <option value="DZ">Algeria</option>
                                        <option value="AS">American Samoa</option>
                                        <option value="AD">Andorra</option>
                                        <option value="AG">Angola</option>
                                        <option value="AI">Anguilla</option>
                                        <option value="AG">Antigua &amp; Barbuda</option>
                                        <option value="AR">Argentina</option>
                                        <option value="AA">Armenia</option>
                                        <option value="AW">Aruba</option>
                                        <option value="AU">Australia</option>
                                        <option value="AT">Austria</option>
                                        <option value="AZ">Azerbaijan</option>
                                        <option value="BS">Bahamas</option>
                                        <option value="BH">Bahrain</option>
                                        <option value="BD">Bangladesh</option>
                                        <option value="BB">Barbados</option>
                                        <option value="BY">Belarus</option>
                                        <option value="BE">Belgium</option>
                                        <option value="BZ">Belize</option>
                                        <option value="BJ">Benin</option>
                                        <option value="BM">Bermuda</option>
                                        <option value="BT">Bhutan</option>
                                        <option value="BO">Bolivia</option>
                                        <option value="BL">Bonaire</option>
                                        <option value="BA">Bosnia &amp; Herzegovina</option>
                                        <option value="BW">Botswana</option>
                                        <option value="BR">Brazil</option>
                                        <option value="BC">British Indian Ocean Ter</option>
                                        <option value="BN">Brunei</option>
                                        <option value="BG">Bulgaria</option>
                                        <option value="BF">Burkina Faso</option>
                                        <option value="BI">Burundi</option>
                                        <option value="KH">Cambodia</option>
                                        <option value="CM">Cameroon</option>
                                        <option value="CA">Canada</option>
                                        <option value="IC">Canary Islands</option>
                                        <option value="CV">Cape Verde</option>
                                        <option value="KY">Cayman Islands</option>
                                        <option value="CF">Central African Republic</option>
                                        <option value="TD">Chad</option>
                                        <option value="CD">Channel Islands</option>
                                        <option value="CL">Chile</option>
                                        <option value="CN">China</option>
                                        <option value="CI">Christmas Island</option>
                                        <option value="CS">Cocos Island</option>
                                        <option value="CO">Colombia</option>
                                        <option value="CC">Comoros</option>
                                        <option value="CG">Congo</option>
                                        <option value="CK">Cook Islands</option>
                                        <option value="CR">Costa Rica</option>
                                        <option value="CT">Cote D'Ivoire</option>
                                        <option value="HR">Croatia</option>
                                        <option value="CU">Cuba</option>
                                        <option value="CB">Curacao</option>
                                        <option value="CY">Cyprus</option>
                                        <option value="CZ">Czech Republic</option>
                                        <option value="DK">Denmark</option>
                                        <option value="DJ">Djibouti</option>
                                        <option value="DM">Dominica</option>
                                        <option value="DO">Dominican Republic</option>
                                        <option value="TM">East Timor</option>
                                        <option value="EC">Ecuador</option>
                                        <option value="EG">Egypt</option>
                                        <option value="SV">El Salvador</option>
                                        <option value="GQ">Equatorial Guinea</option>
                                        <option value="ER">Eritrea</option>
                                        <option value="EE">Estonia</option>
                                        <option value="ET">Ethiopia</option>
                                        <option value="FA">Falkland Islands</option>
                                        <option value="FO">Faroe Islands</option>
                                        <option value="FJ">Fiji</option>
                                        <option value="FI">Finland</option>
                                        <option value="FR">France</option>
                                        <option value="GF">French Guiana</option>
                                        <option value="PF">French Polynesia</option>
                                        <option value="FS">French Southern Ter</option>
                                        <option value="GA">Gabon</option>
                                        <option value="GM">Gambia</option>
                                        <option value="GE">Georgia</option>
                                        <option value="DE">Germany</option>
                                        <option value="GH">Ghana</option>
                                        <option value="GI">Gibraltar</option>
                                        <option value="GB">Great Britain</option>
                                        <option value="GR">Greece</option>
                                        <option value="GL">Greenland</option>
                                        <option value="GD">Grenada</option>
                                        <option value="GP">Guadeloupe</option>
                                        <option value="GU">Guam</option>
                                        <option value="GT">Guatemala</option>
                                        <option value="GN">Guinea</option>
                                        <option value="GY">Guyana</option>
                                        <option value="HT">Haiti</option>
                                        <option value="HW">Hawaii</option>
                                        <option value="HN">Honduras</option>
                                        <option value="HK">Hong Kong</option>
                                        <option value="HU">Hungary</option>
                                        <option value="IS">Iceland</option>
                                        <option value="IN">India</option>
                                        <option value="ID">Indonesia</option>
                                        <option value="IA">Iran</option>
                                        <option value="IQ">Iraq</option>
                                        <option value="IR">Ireland</option>
                                        <option value="IM">Isle of Man</option>
                                        <option value="IL">Israel</option>
                                        <option value="IT">Italy</option>
                                        <option value="JM">Jamaica</option>
                                        <option value="JP">Japan</option>
                                        <option value="JO">Jordan</option>
                                        <option value="KZ">Kazakhstan</option>
                                        <option value="KE">Kenya</option>
                                        <option value="KI">Kiribati</option>
                                        <option value="NK">Korea North</option>
                                        <option value="KS">Korea South</option>
                                        <option value="KW">Kuwait</option>
                                        <option value="KG">Kyrgyzstan</option>
                                        <option value="LA">Laos</option>
                                        <option value="LV">Latvia</option>
                                        <option value="LB">Lebanon</option>
                                        <option value="LS">Lesotho</option>
                                        <option value="LR">Liberia</option>
                                        <option value="LY">Libya</option>
                                        <option value="LI">Liechtenstein</option>
                                        <option value="LT">Lithuania</option>
                                        <option value="LU">Luxembourg</option>
                                        <option value="MO">Macau</option>
                                        <option value="MK">Macedonia</option>
                                        <option value="MG">Madagascar</option>
                                        <option value="MY">Malaysia</option>
                                        <option value="MW">Malawi</option>
                                        <option value="MV">Maldives</option>
                                        <option value="ML">Mali</option>
                                        <option value="MT">Malta</option>
                                        <option value="MH">Marshall Islands</option>
                                        <option value="MQ">Martinique</option>
                                        <option value="MR">Mauritania</option>
                                        <option value="MU">Mauritius</option>
                                        <option value="ME">Mayotte</option>
                                        <option value="MX">Mexico</option>
                                        <option value="MI">Midway Islands</option>
                                        <option value="MD">Moldova</option>
                                        <option value="MC">Monaco</option>
                                        <option value="MN">Mongolia</option>
                                        <option value="MS">Montserrat</option>
                                        <option value="MA">Morocco</option>
                                        <option value="MZ">Mozambique</option>
                                        <option value="MM">Myanmar</option>
                                        <option value="NA">Nambia</option>
                                        <option value="NU">Nauru</option>
                                        <option value="NP">Nepal</option>
                                        <option value="AN">Netherland Antilles</option>
                                        <option value="NL">Netherlands (Holland, Europe)</option>
                                        <option value="NV">Nevis</option>
                                        <option value="NC">New Caledonia</option>
                                        <option value="NZ">New Zealand</option>
                                        <option value="NI">Nicaragua</option>
                                        <option value="NE">Niger</option>
                                        <option value="NG">Nigeria</option>
                                        <option value="NW">Niue</option>
                                        <option value="NF">Norfolk Island</option>
                                        <option value="NO">Norway</option>
                                        <option value="OM">Oman</option>
                                        <option value="PK">Pakistan</option>
                                        <option value="PW">Palau Island</option>
                                        <option value="PS">Palestine</option>
                                        <option value="PA">Panama</option>
                                        <option value="PG">Papua New Guinea</option>
                                        <option value="PY">Paraguay</option>
                                        <option value="PE">Peru</option>
                                        <option value="PH">Philippines</option>
                                        <option value="PO">Pitcairn Island</option>
                                        <option value="PL">Poland</option>
                                        <option value="PT">Portugal</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="QA">Qatar</option>
                                        <option value="ME">Republic of Montenegro</option>
                                        <option value="RS">Republic of Serbia</option>
                                        <option value="RE">Reunion</option>
                                        <option value="RO">Romania</option>
                                        <option value="RU">Russia</option>
                                        <option value="RW">Rwanda</option>
                                        <option value="NT">St Barthelemy</option>
                                        <option value="EU">St Eustatius</option>
                                        <option value="HE">St Helena</option>
                                        <option value="KN">St Kitts-Nevis</option>
                                        <option value="LC">St Lucia</option>
                                        <option value="MB">St Maarten</option>
                                        <option value="PM">St Pierre &amp; Miquelon</option>
                                        <option value="VC">St Vincent &amp; Grenadines</option>
                                        <option value="SP">Saipan</option>
                                        <option value="SO">Samoa</option>
                                        <option value="AS">Samoa American</option>
                                        <option value="SM">San Marino</option>
                                        <option value="ST">Sao Tome &amp; Principe</option>
                                        <option value="SA">Saudi Arabia</option>
                                        <option value="SN">Senegal</option>
                                        <option value="RS">Serbia</option>
                                        <option value="SC">Seychelles</option>
                                        <option value="SL">Sierra Leone</option>
                                        <option value="SG">Singapore</option>
                                        <option value="SK">Slovakia</option>
                                        <option value="SI">Slovenia</option>
                                        <option value="SB">Solomon Islands</option>
                                        <option value="OI">Somalia</option>
                                        <option value="ZA">South Africa</option>
                                        <option value="ES">Spain</option>
                                        <option value="LK">Sri Lanka</option>
                                        <option value="SD">Sudan</option>
                                        <option value="SR">Suriname</option>
                                        <option value="SZ">Swaziland</option>
                                        <option value="SE">Sweden</option>
                                        <option value="CH">Switzerland</option>
                                        <option value="SY">Syria</option>
                                        <option value="TA">Tahiti</option>
                                        <option value="TW">Taiwan</option>
                                        <option value="TJ">Tajikistan</option>
                                        <option value="TZ">Tanzania</option>
                                        <option value="TH">Thailand</option>
                                        <option value="TG">Togo</option>
                                        <option value="TK">Tokelau</option>
                                        <option value="TO">Tonga</option>
                                        <option value="TT">Trinidad &amp; Tobago</option>
                                        <option value="TN">Tunisia</option>
                                        <option value="TR">Turkey</option>
                                        <option value="TU">Turkmenistan</option>
                                        <option value="TC">Turks &amp; Caicos Is</option>
                                        <option value="TV">Tuvalu</option>
                                        <option value="UG">Uganda</option>
                                        <option value="UA">Ukraine</option>
                                        <option value="AE">United Arab Emirates</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="US">United States of America</option>
                                        <option value="UY">Uruguay</option>
                                        <option value="UZ">Uzbekistan</option>
                                        <option value="VU">Vanuatu</option>
                                        <option value="VS">Vatican City State</option>
                                        <option value="VE">Venezuela</option>
                                        <option value="VN">Vietnam</option>
                                        <option value="VB">Virgin Islands (Brit)</option>
                                        <option value="VA">Virgin Islands (USA)</option>
                                        <option value="WK">Wake Island</option>
                                        <option value="WF">Wallis &amp; Futana Is</option>
                                        <option value="YE">Yemen</option>
                                        <option value="ZR">Zaire</option>
                                        <option value="ZM">Zambia</option>
                                        <option value="ZW">Zimbabwe</option>
                                        </select>
                                                  </div>
                                                  <div class="phone-row">
                                   <select name="phonecountry" class="selection">
                                        <option data-countryCode="US" value="1">+1</option>
                                        <option data-countryCode="GB" value="44">+44</option>
                                        <option data-countryCode="DZ" value="213">+213</option>
                                        <option data-countryCode="AD" value="376">+376</option>
                                        <option data-countryCode="AO" value="244">+244</option>
                                        <option data-countryCode="AI" value="1264">+1264</option>
                                        <option data-countryCode="AG" value="1268">+1268</option>
                                        <option data-countryCode="AR" value="54">+54</option>
                                        <option data-countryCode="AM" value="374">+374</option>
                                        <option data-countryCode="AW" value="297">+297</option>
                                        <option data-countryCode="AU" value="61">+61</option>
                                        <option data-countryCode="AT" value="43">+43</option>
                                        <option data-countryCode="AZ" value="994">+994</option>
                                        <option data-countryCode="BS" value="1242">+1242</option>
                                        <option data-countryCode="BH" value="973">+973</option>
                                        <option data-countryCode="BD" value="880">+880</option>
                                        <option data-countryCode="BB" value="1246">+1246</option>
                                        <option data-countryCode="BY" value="375">+375</option>
                                        <option data-countryCode="BE" value="32">+32</option>
                                        <option data-countryCode="BZ" value="501">+501</option>
                                        <option data-countryCode="BJ" value="229">+229</option>
                                        <option data-countryCode="BM" value="1441">+1441</option>
                                        <option data-countryCode="BT" value="975">+975</option>
                                        <option data-countryCode="BO" value="591">+591</option>
                                        <option data-countryCode="BA" value="387">+387</option>
                                        <option data-countryCode="BW" value="267">+267</option>
                                        <option data-countryCode="BR" value="55">+55</option>
                                        <option data-countryCode="BN" value="673">+673</option>
                                        <option data-countryCode="BG" value="359">+359</option>
                                        <option data-countryCode="BF" value="226">+226</option>
                                        <option data-countryCode="BI" value="257">+257</option>
                                        <option data-countryCode="KH" value="855">+855</option>
                                        <option data-countryCode="CM" value="237">+237</option>
                                        <option data-countryCode="CA" value="1">+1</option>
                                        <option data-countryCode="CV" value="238">+238</option>
                                        <option data-countryCode="KY" value="1345">+1345</option>
                                        <option data-countryCode="CF" value="236">+236</option>
                                        <option data-countryCode="CL" value="56">+56</option>
                                        <option data-countryCode="CN" value="86">+86</option>
                                        <option data-countryCode="CO" value="57">+57</option>
                                        <option data-countryCode="KM" value="269">+269</option>
                                        <option data-countryCode="CG" value="242">+242</option>
                                        <option data-countryCode="CK" value="682">+682</option>
                                        <option data-countryCode="CR" value="506">+506</option>
                                        <option data-countryCode="HR" value="385">+385</option>
                                        <option data-countryCode="CU" value="53">+53</option>
                                        <option data-countryCode="CY" value="90">+90</option>
                                        <option data-countryCode="CY" value="357">+357</option>
                                        <option data-countryCode="CZ" value="420">+420</option>
                                        <option data-countryCode="DK" value="45">+45</option>
                                        <option data-countryCode="DJ" value="253">+253</option>
                                        <option data-countryCode="DM" value="1809">+1809</option>
                                        <option data-countryCode="DO" value="1809">+1809</option>
                                        <option data-countryCode="EC" value="593">+593</option>
                                        <option data-countryCode="EG" value="20">+20</option>
                                        <option data-countryCode="SV" value="503">+503</option>
                                        <option data-countryCode="GQ" value="240">+240</option>
                                        <option data-countryCode="ER" value="291">+291</option>
                                        <option data-countryCode="EE" value="372">+372</option>
                                        <option data-countryCode="ET" value="251">+251</option>
                                        <option data-countryCode="FK" value="500">+500</option>
                                        <option data-countryCode="FO" value="298">+298</option>
                                        <option data-countryCode="FJ" value="679">+679</option>
                                        <option data-countryCode="FI" value="358">+358</option>
                                        <option data-countryCode="FR" value="33">+33</option>
                                        <option data-countryCode="GF" value="594">+594</option>
                                        <option data-countryCode="PF" value="689">+689</option>
                                        <option data-countryCode="GA" value="241">+241</option>
                                        <option data-countryCode="GM" value="220">+220</option>
                                        <option data-countryCode="GE" value="7880">+7880</option>
                                        <option data-countryCode="DE" value="49">+49</option>
                                        <option data-countryCode="GH" value="233">+233</option>
                                        <option data-countryCode="GI" value="350">+350</option>
                                        <option data-countryCode="GR" value="30">+30</option>
                                        <option data-countryCode="GL" value="299">+299</option>
                                        <option data-countryCode="GD" value="1473">+1473</option>
                                        <option data-countryCode="GP" value="590">+590</option>
                                        <option data-countryCode="GU" value="671">+671</option>
                                        <option data-countryCode="GT" value="502">+502</option>
                                        <option data-countryCode="GN" value="224">+224</option>
                                        <option data-countryCode="GW" value="245">+245</option>
                                        <option data-countryCode="GY" value="592">+592</option>
                                        <option data-countryCode="HT" value="509">+509</option>
                                        <option data-countryCode="HN" value="504">+504</option>
                                        <option data-countryCode="HK" value="852">+852</option>
                                        <option data-countryCode="HU" value="36">+36</option>
                                        <option data-countryCode="IS" value="354">+354</option>
                                        <option data-countryCode="IN" value="91">+91</option>
                                        <option data-countryCode="ID" value="62">+62</option>
                                        <option data-countryCode="IQ" value="964">+964</option>
                                        <option data-countryCode="IR" value="98">Iran (+98)</option>
                                        <option data-countryCode="IE" value="353">Ireland (+353)</option>
                                        <option data-countryCode="IL" value="972">Israel (+972)</option>
                                        <option data-countryCode="IT" value="39">Italy (+39)</option>
                                        <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                                        <option data-countryCode="JP" value="81">Japan (+81)</option>
                                        <option data-countryCode="JO" value="962">Jordan (+962)</option>
                                        <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                                        <option data-countryCode="KE" value="254">Kenya (+254)</option>
                                        <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                                        <option data-countryCode="KP" value="850">+850</option>
                                        <option data-countryCode="KR" value="82">+82</option>
                                        <option data-countryCode="KW" value="965">+965</option>
                                        <option data-countryCode="KG" value="996">+996</option>
                                        <option data-countryCode="LA" value="856">+856</option>
                                        <option data-countryCode="LV" value="371">+371</option>
                                        <option data-countryCode="LB" value="961">+961</option>
                                        <option data-countryCode="LS" value="266">+266</option>
                                        <option data-countryCode="LR" value="231">+231</option>
                                        <option data-countryCode="LY" value="218">+218</option>
                                        <option data-countryCode="LI" value="417">+417</option>
                                        <option data-countryCode="LT" value="370">+370</option>
                                        <option data-countryCode="LU" value="352">+352</option>
                                        <option data-countryCode="MO" value="853">+853</option>
                                        <option data-countryCode="MK" value="389">+389</option>
                                        <option data-countryCode="MG" value="261">+261</option>
                                        <option data-countryCode="MW" value="265">+265</option>
                                        <option data-countryCode="MY" value="60">+60</option>
                                        <option data-countryCode="MV" value="960">+960</option>
                                        <option data-countryCode="ML" value="223">+223</option>
                                        <option data-countryCode="MT" value="356">+356</option>
                                        <option data-countryCode="MH" value="692">+692</option>
                                        <option data-countryCode="MQ" value="596">+596</option>
                                        <option data-countryCode="MR" value="222">+222</option>
                                        <option data-countryCode="YT" value="269">+269</option>
                                        <option data-countryCode="MX" value="52">+52</option>
                                        <option data-countryCode="FM" value="691">+691</option>
                                        <option data-countryCode="MD" value="373">+373</option>
                                        <option data-countryCode="MC" value="377">+377</option>
                                        <option data-countryCode="MN" value="976">+976</option>
                                        <option data-countryCode="MS" value="1664">+1664</option>
                                        <option data-countryCode="MA" value="212">+212</option>
                                        <option data-countryCode="MZ" value="258">+258</option>
                                        <option data-countryCode="MN" value="95">+95</option>
                                        <option data-countryCode="NA" value="264">+264</option>
                                        <option data-countryCode="NR" value="674">+674</option>
                                        <option data-countryCode="NP" value="977">+977</option>
                                        <option data-countryCode="NL" value="31">+31</option>
                                        <option data-countryCode="NC" value="687">+687</option>
                                        <option data-countryCode="NZ" value="64">+64</option>
                                        <option data-countryCode="NI" value="505">+505</option>
                                        <option data-countryCode="NE" value="227">+227</option>
                                        <option data-countryCode="NG" value="234">+234</option>
                                        <option data-countryCode="NU" value="683">+683</option>
                                        <option data-countryCode="NF" value="672">+672</option>
                                        <option data-countryCode="NP" value="670">+670</option>
                                        <option data-countryCode="NO" value="47">+47</option>
                                        <option data-countryCode="OM" value="968">+968</option>
                                        <option data-countryCode="PK" value="92">+92</option>
                                        <option data-countryCode="PW" value="680">+680</option>
                                        <option data-countryCode="PA" value="507">+507</option>
                                        <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                                        <option data-countryCode="PY" value="595">+595</option>
                                        <option data-countryCode="PE" value="51">+51</option>
                                        <option data-countryCode="PH" value="63">+63</option>
                                        <option data-countryCode="PL" value="48">+48</option>
                                        <option data-countryCode="PT" value="351">+351</option>
                                        <option data-countryCode="PR" value="1787">+1787</option>
                                        <option data-countryCode="QA" value="974">+974</option>
                                        <option data-countryCode="RE" value="262">+262</option>
                                        <option data-countryCode="RO" value="40">+40</option>
                                        <option data-countryCode="RU" value="7">+7</option>
                                        <option data-countryCode="RW" value="250">+250</option>
                                        <option data-countryCode="SM" value="378">+378</option>
                                        <option data-countryCode="ST" value="239">+239</option>
                                        <option data-countryCode="SA" value="966">+966</option>
                                        <option data-countryCode="SN" value="221">+221</option>
                                        <option data-countryCode="CS" value="381">+381</option>
                                        <option data-countryCode="SC" value="248">+248</option>
                                        <option data-countryCode="SL" value="232">+232</option>
                                        <option data-countryCode="SG" value="65">+65</option>
                                        <option data-countryCode="SK" value="421">+421</option>
                                        <option data-countryCode="SI" value="386">+386</option>
                                        <option data-countryCode="SB" value="677"> +677</option>
                                        <option data-countryCode="SO" value="252">+252</option>
                                        <option data-countryCode="ZA" value="27">+27</option>
                                        <option data-countryCode="ES" value="34">+34</option>
                                        <option data-countryCode="LK" value="94">+94</option>
                                        <option data-countryCode="SH" value="290">+290</option>
                                        <option data-countryCode="KN" value="1869">+1869</option>
                                        <option data-countryCode="SC" value="1758">+1758</option>
                                        <option data-countryCode="SR" value="597">+597</option>
                                        <option data-countryCode="SD" value="249">+249</option>
                                        <option data-countryCode="SZ" value="268">+268</option>
                                        <option data-countryCode="SE" value="46" selected>+46</option>
                                        <option data-countryCode="CH" value="41">+41</option>
                                        <option data-countryCode="SY" value="963">+963</option>
                                        <option data-countryCode="TW" value="886">+886</option>
                                        <option data-countryCode="TJ" value="992">+992</option>
                                        <option data-countryCode="TH" value="66">+66</option>
                                        <option data-countryCode="TG" value="228">+228</option>
                                        <option data-countryCode="TO" value="676">+676</option>
                                        <option data-countryCode="TT" value="1868">+1868</option>
                                        <option data-countryCode="TN" value="216">+216</option>
                                        <option data-countryCode="TR" value="90">+90</option>
                                        <option data-countryCode="TM" value="993">+993</option>
                                        <option data-countryCode="TC" value="1649">+1649</option>
                                        <option data-countryCode="TV" value="688">+688</option>
                                        <option data-countryCode="UG" value="256">+256</option>
                                        <option data-countryCode="UA" value="380">+380</option>
                                        <option data-countryCode="AE" value="971">+971</option>
                                        <option data-countryCode="UY" value="598">+598</option>
                                        <option data-countryCode="UZ" value="998">+998</option>
                                        <option data-countryCode="VU" value="678">+678</option>
                                        <option data-countryCode="VA" value="379">+379</option>
                                        <option data-countryCode="VE" value="58">+58</option>
                                        <option data-countryCode="VN" value="84">+84</option>
                                        <option data-countryCode="VG" value="1">+1</option>
                                        <option data-countryCode="WF" value="681">+681)</option>
                                        <option data-countryCode="YE" value="969">+969</option>
                                        <option data-countryCode="YE" value="967">+967</option>
                                        <option data-countryCode="ZM" value="260">+260</option>
                                        <option data-countryCode="ZW" value="263">+263</option>
                                    </select>
                                                       <input type="text" name="phone" required placeholder="Your phone number">
                                </div>
                                                  </div>
                                             </div>
                                             <div class="terms">
                                                  <div class="wrapper">
                                                       <div class="container">
                                                            <input type="checkbox" class="checkbox" name="terms">
                                                            <span class="checkmark"></span>
                                                       </div>
                                                       <span>I have read and accept the
                                <a id="open_terms">Terms of Use</a>
                            </span>
                                                  </div>
                                             </div>
                                             <div class="loginresponse"></div>
                                             <input type="submit" value="Register" class="register">
                                             <span class="alreadyHaveAccount">Already have an account? <a href="/login">Sign In</a></span>
                    </form>

               </div>
          </div>
          <div id="terms_window">
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


                    <div class="close">
                         <a id="close_terms">I have read the Terms Of Use</a>
                    </div>

          </div>
          <div class="laststep"></div>
     </section>
</div>
