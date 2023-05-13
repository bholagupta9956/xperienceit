import React from "react";
import "./birthdayGifts.css";
import Gifts from "../../assets/images/comboGifts.png";

const Info = () => {

  return (
    <div className="infor">
      <div className="infoLeft" >
        <div className="infoLeftText" data-aos="fade-left" data-aos-animation = "600">
          <h3>
            Send Flowers Online With Xperienceit : India's Biggest Florist Chain
          </h3>
          <p>
            For over 25 years, Xperienceit is helping you to celebrate your
            special moments by delivering fresh flowers and fabulous gifts to
            your loved ones. Ferns N Petals was established in 1994 and flower
            bouquet delivery was the first and only thing that we were doing.
            From there on, FNP grew to what it is today including the current
            gifting options that feature the choicest personalized gifts, cakes,
            chocolates along with artificial flowers fresh cut flowers and
            flower basket. From just 1 flower shop in Delhi during 1994, F erns
            N Petals is now the largest florist chain with more than 300+ stores
            (and still counting) across all th
          </p>
        </div>

        <div className="infoLeftText">
          <h3>Internation Presence</h3>
          <p>
            After having established ourselves as market leaders in India, Ferns
            N Petals has expanded its international footprints into the South
            East Asia and Middle East. In addition to a physical presence, with
            two stores in UAE and one in to the t Singapore, we also have built
            a strong online presence with separate websites in Qatar and Saudi
            Arabia. You can check out our websites catering to different
            regions; www.fnp.ae in UAE, www.fnp.sg in Singapore, www.fnp.qa in
            Qatar, and sa.fnp.com in Saudi Arabia.
          </p>
        </div>
      </div>
      <div className="infoRight"  data-aos="fade-right" data-aos-animation = "600">
        <img src={Gifts} alt="" />
      </div>
    </div>
  );
};

export default Info;
