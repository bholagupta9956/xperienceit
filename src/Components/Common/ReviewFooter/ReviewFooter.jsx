import React from 'react'
import './ReviewFooter.css'
const ReviewFooter = () => {
    return (
        <>
            <div className='row reviewfooter'>
                <div className="text-center _trust_section">
                    <h4>Helped 5+ Million Customers ExperienceIt Their Special Occasions</h4>
                    <div class="small-div-line"></div>
                </div>
                <div class="row no-gutters _main_content mb-5">
                    <div class="col-lg-3 col-md-6 col-sm-6 _single_section">
                        <div class="lazyload-wrapper ">
                            <img loading="lazy" decoding="async" class="img-cover-no-stretch" src="https://i.ibb.co/bFNWTv7/medal-min.png" alt="Happy Customers over 6 years" />
                        </div>
                        <div class="strong">5+ Million</div>
                        <div class="small"> Happy Customers over 6 years</div>
                    </div><div class="col-lg-3 col-md-6 col-sm-6 _single_section"><div class="lazyload-wrapper ">
                        <img loading="lazy" decoding="async" class="img-cover-no-stretch" src="https://i.ibb.co/DL0xXQ5/google-reviews-min.png" alt="from 900+ reviews on Google" />
                    </div>
                        <div class="strong">4.4/5 Rating</div>
                        <div class="small"> from 900+ reviews on Google</div>
                    </div><div class="col-lg-3 col-md-6 col-sm-6 _single_section">
                        <div class="lazyload-wrapper ">
                            <img loading="lazy" decoding="async" class="img-cover-no-stretch" src="https://i.ibb.co/cc8vcGp/news-min.png" alt="Featured by the best" />
                        </div>
                        <div class="strong">In the Media</div>
                        <div class="small">Featured by the best</div>
                    </div><div class="col-lg-3 col-md-6 col-sm-6 _single_section">
                        <div class="lazyload-wrapper ">
                            <img loading="lazy" decoding="async" class="img-cover-no-stretch" src="https://i.ibb.co/K7Dz9Bm/brands-min.png" alt="Partnered with top brands" />
                        </div>
                        <div class="strong">Top Brands</div>
                        <div class="small">Partnered with top brands</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewFooter;
