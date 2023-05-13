import React from "react";
import "./megaMenu.css";
import { useHistory , generatePath } from "react-router-dom";


const MegaMenu = (props) => {

  const { showMegaMenu, setShowMegaMenu, subCategoryData } = props;

    const pkgLocation = localStorage.getItem("locationDetails");
    const cityLocattion = JSON.parse(pkgLocation);
    const cityID = cityLocattion && cityLocattion.id;
    
  const history=useHistory();

    const toRenderNextPackeges = (data) => {

      console.log(data , "data here");
      
      // const name = data.name ;
      // const subCategoryName = name.replaceAll(' ', '-');
      // const path = generatePath("/experiences/:location/:sub_category_name/:sub_category_id" , {
      //   sub_category_name : subCategoryName ,
      //   location : cityLocattion.name ,
      //   sub_category_id : data.id

      // })
      // history.push(path ,{allpackeges : data})

       var subCategoryName = data.subcategory_nm ;
       subCategoryName = subCategoryName.replaceAll(' ', '-');

       var childCategoryName = data.name;
       childCategoryName = childCategoryName.replaceAll(' ' , '-');

      const path = generatePath("/experiences/:location/:sub_category_name/:sub_category_id/child-category/:child_category_name/:child_category_id" , {
        sub_category_name : subCategoryName ,
        location : cityLocattion.name ,
        sub_category_id : data.subcategory_id ,
        child_category_name : childCategoryName ,
        child_category_id : data.id
      })

      console.log(path ,"path here");
      history.push(path ,{allpackeges : data})

    }

    
  return (
    <>
      {showMegaMenu && (
        <div className="megamenu">
          {subCategoryData.map((item, index) => {
           

            const childCategory = item.child_category;
            return (
              <div className="megaMenuCol">
                <h4>{item.name}</h4>
                {childCategory.map((itmm, indd) => {
                  return (
                    <>
                      <ul>
                        <li>
                          <h6 onClick={() => toRenderNextPackeges(itmm)}>{itmm.name}</h6>
                        </li>
                      </ul>
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MegaMenu;
