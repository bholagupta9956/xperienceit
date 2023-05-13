import React, { useEffect  } from "react";
import { useState } from "react";
import Cut from "./cut.svg";
import Logo from "./xpitlogo.png";
import Img1 from "./img1.png";
import { Modal } from "react-bootstrap";
import "./Customization.css";
import Switch from "react-switch";
import axios from "axios";
import {toast , ToastContainer} from "react-toastify";



const Customization = (props) => {

  const handleShow = () => setShowCustomization(false);
  const {
    showCustomization,
    setShowCustomization,
    setSelectedCustomization,
    selectedCustomization,
    setSelectedCustomizationId,
    selectedCustomizationId,
    setTotalPrice,
    totalPrice,
    packageIdd,
    handleBookNow

  } = props;

  console.log(packageIdd ,"packageIDD")

  const [customization , setCustomization] = useState([])

  const getCustomization = () =>{
    const data = {
      package_id: packageIdd,
    };

    const api = "https://admin.xperienceit.in/api/customization-details";
    axios
      .post(api, data)
      .then((res) => {
       
        if (res.data.status === true) {
          const val = res.data.body;
          setCustomization(val);
        } else if (res.data.status === false) {
          // toast(res.data.message, { type: "error" });
        }
      })
      .catch((err) => {
        console.log(err, " Customize data not found");
      });
  }


  useEffect(() =>{
    getCustomization()
  },[])


  const handleChange = (data) => {

    if (selectedCustomizationId.includes(data.id)) {

      const filterId = selectedCustomizationId.filter((itm) => {
        return itm !== data.id;
      });
      
      setSelectedCustomizationId(filterId);

      const filterData = selectedCustomization.filter((itmmm) => {
        return itmmm.id !== data.id;
      });

      setSelectedCustomization(filterData);
      setTotalPrice(parseInt(totalPrice) - parseInt(data.price))

    } else {
      setSelectedCustomizationId((it) => {
        return [...it, data.id];
      });

      setTotalPrice(parseInt(data.price) + parseInt(totalPrice))
      const dta = {
        id: data.id,
        title: data.title,
        quantity: data.quantity,
        price: data.price,
        singlepiece : data.singlepiece
      };

      setSelectedCustomization((itt) => {
        return [...itt, dta];
      });
    }
  };


  const handleAddQuant = (data) => {

    if (!selectedCustomizationId.includes(data.id)) {
      setSelectedCustomizationId((itt) => {
        return [...itt, data.id];
      });

      const dta = {
        id : data.id ,
        title : data.title ,
        quantity : 1 ,
        price : parseInt(data.price),
        singlepiece : data.singlepiece
      }

      setSelectedCustomization((itt) => {
        return [...itt, dta];
      });

      setTotalPrice(parseInt(totalPrice) + parseInt(data.price))

    }else {

      const choosed = selectedCustomization.filter((itm) =>{
        return itm.id === data.id
      })

      const filterData = selectedCustomization.filter((itm) =>{
        return itm.id !== data.id
      })

      const choosedDta = choosed[0]
      const choosedQuantity = choosedDta.quantity;

      if(data.quantity > choosedQuantity){

      const dta = {
        id : data.id ,
        title : data.title ,
        quantity : choosedDta.quantity + 1 ,
        price : parseInt(choosedDta.price) + parseInt(data.price),
        singlepiece : data.singlepiece
      }

      setSelectedCustomization([...filterData , dta])
      setTotalPrice(parseInt(totalPrice) + parseInt(data.price))
    }
    else {
      toast("insufficient quantity" , {type : "warning"})
    }
    }
  };

  const handleSubQuant = (data) => {
    if(selectedCustomizationId.includes(data.id)){
      
      const choosed = selectedCustomization.filter((itm) =>{
        return itm.id === data.id
      })
      const choosedDta = choosed[0]
      const choosedQuantity = choosedDta.quantity;

      if(choosedQuantity === 1){
        const filterId = selectedCustomizationId.filter((itmmm) =>{
          return itmmm !== data.id
        })
        setSelectedCustomizationId(filterId)

        const filterDta = selectedCustomization.filter((itmm) =>{
          return itmm.id !== data.id
        })

        setSelectedCustomization(filterDta)
        setTotalPrice(parseInt(totalPrice) - parseInt(data.price))
      }
      else if(choosedQuantity > 1){
        const filterDtaa = selectedCustomization.filter((itmm) =>{
          return itmm.id !== data.id
        })

        const dta = {
          id : choosedDta.id ,
          title : choosedDta.title ,
          quantity : choosedQuantity - 1 ,
          price : parseInt(choosedDta.price) - parseInt(data.price)
        }
        setTotalPrice(parseInt(totalPrice) - parseInt(data.price))
        setSelectedCustomization([...filterDtaa , dta])
      }
    }
  };


  return (
    <>
      <Modal
        show={showCustomization}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        className="customize_popup"
        centered
      >
        <div className="custom">
          <div className="custom_logo">
            <img src={Logo} alt="logo icon" />
          </div>

          <div className="custom_header"></div>

          <div className="card-container">

    {customization.length == 0 && <span className="customNodata">No customization found !</span>}

            {customization.length != 0 && customization.map((item, index) => {

              return (
                <div className=" custom_card">
                  <div className="custom_img">
                    <img
                      src={item.image}
                      alt=""
                      className="img img-responsive"
                    />
                  </div>
                  <div className="custom_content">
                    <h5>{item.title}</h5>
                    <div className="custom_title">
                      <span>{item.description}</span>
                    </div>
                    <h6>Rs.{item.price}</h6>
                    {item.singlepiece ? (
                      <label>
                        <Switch
                          onChange={() => handleChange(item)}
                          checked={selectedCustomizationId.includes(item.id)}
                        />
                      </label>
                    ) : (
                      <div className="count">
                        <div
                          className="min"
                          onClick={() => handleSubQuant(item)}
                        >
                          -
                        </div>
                        <div className="number">
                          {
                            selectedCustomizationId.includes(item.id) ?
                             selectedCustomization[selectedCustomizationId.indexOf(item.id)].quantity
                             : "0"
                          }
                        </div>
                        <div
                          className="pluse"
                          onClick={() => handleAddQuant(item)}
                        >
                          +
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="auth_cut">
            <img src={Cut} alt="cut icon" onClick={() => handleShow()} />
          </div>
          <div className="customFooter">
            <div className="totalAmt">
              <span>Total</span>
              <h6>Rs {totalPrice}</h6>
            </div>
            <div className="totalAmtbtn">
              <button type="button" class="btn checkedAvlb" onClick={handleBookNow}>
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </Modal>
    </>
  );
};

export default Customization;
