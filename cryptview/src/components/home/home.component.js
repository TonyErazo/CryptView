import React, { useEffect } from 'react';
import home from './home.module.css';

export const HomeComponent = () => {

    useEffect(() => {
        console.log(home);
    }, []);

    return (
        <div className={home.container}>
            <div className={home.first}>
                <div className={home.first_left}>
                    <h1 className={home.first_title}>Cryptview</h1>
                    <p className={home.first_body}>Keep track of your crypto with the latest price, news and updates</p>
                    <button className={home.first_button}>Start Now</button>
                </div>
                <div className={home.first_right} />
            </div>
            <div className={home.second}>
                <div className={home.second_bg}/>
                <div className={home.second_content}>
                    <div className={home.second_content_left} />
                    <div className={home.second_content_right}>
                        A cutting-edge crypto tracker, utilizes a sophisticated algorithmic approach to draw accurate charts to make use for the next movement prediction in cryptocurrency prices.
                    </div>
                </div>
            </div>
            <div className={home.third}>
                <div className={home.third_title}>Do you believe in privacy? So do we!</div>
                <div className={home.third_content}>
                    <div className={home.third_content_left}>
                        CryptView takes privacy seriously, adhering to strict principles of data protection and user confidentiality. We do not collect data nor sell it. Our focus is solely on providing a seamless and secure user experience.<br/><br/>
                        We only gather essential information necessary for our app to function as intended, ensuring that user data remains confidential and secure. <br/><br/>
                        By prioritizing privacy, CryptView aims to build trust and confidence among users, enabling them to track cryptocurrency markets with peace of mind.
                    </div>
                    <div className={home.third_content_right} />
                </div>
            </div>
            <div className={home.fourth}>
                <div className={home.fourth_title}>What are you waiting for?</div>
                <div className={home.fourth_form}>
                    <input className={home.form_input} type="text" placeholder='email'/>
                    <input className={home.form_input} type="password" placeholder='password'/>
                    <button className={home.form_button}>Register</button>
                </div>
            </div>
            <div className={home.footer}>
                <div className={home.footer_content}>
                    <div className={home.footer_title}>ViewCrypt</div>
                    <div className={home.footer_sitemap}>
                        <h1>Site Map</h1>
                        <ul>
                            <li><span>Contact Us</span></li>
                            <li><span>Affiliate Program</span></li>
                            <li><span>Terms of Service</span></li>
                            <li><span>Privacy Policy</span></li>
                        </ul>
                    </div>
                    <div className={home.footer_form}>
                        <h1>Newsletter</h1>
                        <input type="email" placeholder='email'></input>
                        <button>Subscribe</button>
                    </div>
                </div> 
                <div className={home.footer_trademark}>Copyright CryptView 2024</div>
            </div>
        </div>
    )
}