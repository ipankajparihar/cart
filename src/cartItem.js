import React from "react";
const Cartitem=(props)=>{
      
        const{price,title,qty}=props.product;
        const {
            product,
            onIncreaseQuantity,
            onDecreaseQuantity,
            onDeleteProduct
        } = props;
        return (

            <div className="cart-item">
                
                 <div className="left-block">
                  <img style={styles.image} src={product.img} />
                 </div>
                 <div className="right-block">
                        <div style={{fontSize:25}}>{title}</div>
                        <div style={{color:'#777'}}>{price}</div>
                        <div style={{color:'#777'}}>{qty}</div>
                        <div className="cart-item-actions">
                            {/* {buttons} */}
                            <img 
                            alt="increase" 
                            className="action-icons" 
                            src="https://cdn-icons-png.flaticon.com/128/1828/1828925.png"
                            onClick={()=> onIncreaseQuantity(product)}
                             />
                           <img 
                            alt="decrease" 
                            className="action-icons" 
                            src="https://cdn-icons-png.flaticon.com/512/43/43625.png" 
                            onClick = {()=>onDecreaseQuantity(product)}
                            />
                            

                            <img 
                            alt="delete" 
                            className="action-icons" 
                            src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png" 
                            onClick = {()=> onDeleteProduct(product.id)}
                            />
                        </div>
                 </div>

            </div>
        )
    }


const styles ={
    image:{
        height:110,
        width:110,
        borderRadius:4,
        background:'#ccc'
    }
}

export default Cartitem;