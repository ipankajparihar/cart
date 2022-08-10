import React from "react";
import Cartitem from "./cartItem";
import Cart from "./Cart";
import Navbar from "./Navbar";
import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



class App extends React.Component {

    constructor(){
     super();
     this.state={
      products:[ ],
      loading :true
    }
    this.db = firebase.firestore();
 }


  componentDidMount(){
    // firebase
    //  .firestore()
    //  .collection('products')
    //  .get()
    //  .then((snapshot)=>{
    //   console.log(snapshot);

    //    snapshot.docs.map((docs)=>{
    //     console.log(docs.data());
    //     });

    //     const products = snapshot.docs.map((doc)=>{
    //           const data = doc.data();
    //           data['id'] = doc.id;
    //       return data;
    //     })
    //     this.setState({
    //       products,
    //       loading:false
    //     })


    //  })

    this.db
     .collection('products')
     
     .onSnapshot((snapshot)=>{
      console.log(snapshot);

       snapshot.docs.map((docs)=>{
        console.log(docs.data());
        });

        const products = snapshot.docs.map((doc)=>{
              const data = doc.data();
              data['id'] = doc.id;
          return data;
        })
        this.setState({
          products,
          loading:false
        })

      })
     

}

  handleIncreaseQuantity=(product)=>{
  console.log("increase quantity in cart",product);
  const {products} = this.state;
  const index = products.indexOf(product);
  // products[index].qty +=1;
  // this.setState({
  //   products
  // })

  const docRef =this.db.collection('products').doc(products[index].id);
  docRef
  .update({
    qty:products[index].qty+1
  })
  .then(()=>{
    console.log("updated quantity");
  })
  .catch((error)=>{
    console.log("error in update",error)
  })

  }

handleDecreaseQuantity=(product)=>{
console.log("decrese quantiy of product",product)
const{products} =this.state;
const index = products.indexOf(product);
if( products[index].qty===0){
     return;
}//else{
//     products[index].qty=0;
// }

// this.setState({
//     products,
    
// })

const docRef = this.db.collection('products').doc(products[index].id);
 docRef
  .update({
     
     
      qty:products[index].qty -1
     
         
     

  })

   .then(()=>{
      console.log('quantity decreased',docRef)
  })
  .catch((error)=>{
    console.log("error in update",error)
  })

 
 


}

handleDeleteProduct=(id)=>{
  const{products} =this.state;



// const items = products.filter((item)=>item.id!==id);

// this.setState({
//     products:items
// })
const docRef = this.db.collection('products').doc(id);
docRef
 .delete()
 .then((docRef)=>{
   console.log('deleted successfully')
 })
 .catch((error)=>{
  console.log("error in update",error)
 })

}

getCartCount=()=>{
  const {products} =this.state;
  let count =0;
  products.forEach((product) => {
    count+=product.qty;
  });
  return count;
}

getCartTotal=()=>{
  const{products}=this.state;
  let cartTotal =0;

  products.map((product)=>{
    if(product.qty>0){
       cartTotal =cartTotal+product.qty*product.price;
    }
   return '';
  })
  return cartTotal;
}

addProduct=()=>{
   this.db
    .collection('products')
    .add({
      img :'',
      price:3245,
      title:"wash machine",
      qty:3
       
    })
    .then((docRef)=>{
        console.log('product has been added',docRef)
    })
    .catch((error)=>{
          console.log('there is an error while adding product ',error)
    })
}

render(){
  const {products,loading} = this.state;
  return (
    <div className="App">
     <Navbar count={this.getCartCount()} />
     {/* <button onClick={this.addProduct} style={{padding:20,fontSize:20}} > Add a product</button> */}
     <Cart
     products={products}
     onIncreaseQuantity ={this.handleIncreaseQuantity}
     onDecreaseQuantity ={this.handleDecreaseQuantity}
     onDeleteProduct = {this.handleDeleteProduct}
     />
     {loading && <h1>loading products ...</h1>}
      menu:
        color :'grey',
        marginTop:-8,
        marginLeft:'-2rem',
        height:30,
       
      
     <div style ={{padding:10 , fontSize:20}}>
      TOTAL:{this.getCartTotal()}
     </div>
     </div>
   );
}
  
}




export default App;
