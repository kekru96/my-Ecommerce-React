import React, { useState, useContext } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import "./StylesItemDetailContainer.css";
import { Link } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";
import Swal from 'sweetalert2'


function ItemCount({ detail }) {
  // estado para guardar la cantidad del producto elegido
  const [countToBuy, setcountToBuy] = useState(0);
  const [disablerAddBtn, setDisablerAddBtn] = useState(false);
  const [disablerRestBtn, setdisablerRestBtn] = useState(false);

  const handleAddOne = () => {
    if (detail.stock >= 1) {
      setcountToBuy(countToBuy + 1);
      detail.stock = detail.stock - 1;

      disablerRestBtn && setdisablerRestBtn(!disablerRestBtn);
    }
    detail.stock < 1 && setDisablerAddBtn(!disablerAddBtn);
  };

  const handleRestOne = () => {
    if (countToBuy >= 1) {
      setcountToBuy(countToBuy - 1);
      detail.stock = detail.stock + 1;

      disablerAddBtn && setDisablerAddBtn(!disablerAddBtn);
    }
    countToBuy === 0 && setdisablerRestBtn(!disablerRestBtn);
  };

  // agregar productos al carrito
  const context = useContext(cartContext);
  const [RenderingButtons, setRenderingButtons] = useState(true);

  //funcion para agregar al carrito
  const handleAddToCart = (countToBuy) => {
    if( countToBuy !==0){ 
      context.AddToCart({ ...detail, quantity: countToBuy  })
    }else{
      Swal.fire({
        title: 'Nothing to add',
        text: '🔎Verify your item count',
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2000 ,
        timerProgressBar: true
      })
    }

    // countToBuy !== 0
    //   ? context.AddToCart({ ...detail, quantity: countToBuy  })
    //   : alert("no tenes nada para agregar");
    countToBuy !== 0 && setRenderingButtons(!RenderingButtons);
  };

  //eliminar producto del carrito
  const handleRestItemOfCart = (detail) => {
    console.log( detail.title)
    context.RemoveToCart( detail );
    setRenderingButtons(!RenderingButtons);
  };

  return (
    <div>
      {RenderingButtons ? (
        <>
          <div className="add-rest-cant">
            <div className="add-rest-cant-box1">
              <ButtonComponent
                onDisabler={disablerRestBtn}
                handlerOnclick={handleRestOne}
                text={<GrFormSubtract />}
              />
              <span>{countToBuy}</span>
              <ButtonComponent
                onDisabler={disablerAddBtn}
                handlerOnclick={handleAddOne}
                text={<GrFormAdd />}
              />
            </div>
            <div className="add-rest-cant-box2">
              <ButtonComponent
                onDisabler={false}
                handlerOnclick={() => handleAddToCart(countToBuy)}
                text={"Add to cart"}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="box-finish-pay">
          {" "}
          {` ${countToBuy}x ${detail.title} was added to cart `}
          <div>
            <span>
              <Link to={'/Cart'}> {`>>> Click to complete your purchase <<<`} </Link>
            </span>

          </div>
          <div>
            <ButtonComponent
              text={"Delete this ❌"}
              handlerOnclick={()=> handleRestItemOfCart(detail)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCount;
