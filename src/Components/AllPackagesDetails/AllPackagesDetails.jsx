import React, { useEffect } from "react";
import "./AllPackagesDetails.css";
import Skeleton from "@mui/material/Skeleton";
import { useHistory, useLocation , generatePath} from "react-router-dom";
import Star from "./star.svg";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";


const AllPackagesDetailsCard = (props) => {

  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;
  const history = useHistory();
  const {title , titleId} = props;

  const renderToAllPackagesDetails = (data) => {
    const sub_category_name = title.replace(' ' ,'-')
    const name = data.heading ;
    const packageName = name.replaceAll(' ', '_');
    const path  = generatePath("/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id" ,
    {
      sub_category_name : sub_category_name ,
      location : cityLocattion.name ,
      sub_category_id : titleId ,
      package_name : packageName ,
      package_id : data.id
    })

    history.push(path )
  };


  return (
    <>


<div class='col-lg-3 col-md-6 col-12' >
                <div className="package-col">
                    <div className="media-img  coman-img">
                        {props.img ? <img src={props.img} /> : <Skeleton height={250} variant="rectangular" />}
                        <div className="wishlist">
                            <span><AiOutlineHeart /></span>
                        </div>
                    </div>
                    <div className="details">
                        <h3>{props.heading}</h3>
                        <div className="rating-and-discount">
                            <h5><span>{props.discount}%off </span></h5>
                            <div className="rating">
                                <span>{props.rating}</span>
                                <AiOutlineStar />
                            </div>
                        </div>
                        <div className="price-and-btn">
                            <h4><span>₹</span>{props.discountPrice}
                                <s>₹{props.price}</s></h4>
                            <button className='btn' onClick={() => renderToAllPackagesDetails(props)}>
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>


    </>
  );
};


const AllPackagesDetails = (props) => {
  
  const history = useHistory();

  const location = useLocation();
  const packages = location.state;

  useEffect(() => {
    if (packages == undefined) {
      history.push("/");
    }
  }, []);
 
  const allHomePackages = packages?.homePackages;
  const homePkg =  allHomePackages && JSON.parse(allHomePackages);
  
  return (
    <>
   {allHomePackages && 
<div className="all-pack-slider inner-row-package">

                <div className="package-section-slider common-container">
                    <div className="container-fluid">
                        <div className="title-with-button">
                            <div className="row">
                                <div className="title-col">
                                    <h2 ><span>{homePkg.heading.replaceAll("-" , " ")}</span></h2>

                                </div>
                            </div>
                        </div>

                        



                        {homePkg.content.length != 0 ? (
                          <div className='row comman-card'>
            {homePkg.content.map((itmm, index) => {
              return (
                <>
                  <AllPackagesDetailsCard
                    img={itmm.image_id}
                    heading={itmm.title}
                    price={itmm.outlay_price}
                    discountPrice={itmm.discounted_price}
                    discount={itmm.discount_percnt}
                    key={index}
                    // review={item.review}
                    rating={itmm.rating}
                    id={itmm.id}
                    title={homePkg.heading}
                    titleId={0}
                  />
                </>
              );
            })}
          </div>
        ) : (
          <h5 style={{ marginLeft: "40px", color: "grey", marginTop: "20px" }}>
            Sorry no package available !
          </h5>
        )}

                    

                    </div>
                </div>



            </div>

}









    
    </>
  );
};

export default AllPackagesDetails;
