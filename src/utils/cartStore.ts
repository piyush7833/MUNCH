import { ActionTypes, CartItemType, CartType } from "@/types/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const INITIAL_STATE={
    products:[],
    totalItems:0,
    totalPrice:0,
    itemQuantity:0,
    shopId:""
}

const CheckSameItem=(item1:CartItemType,item2:CartItemType)=>{
    if(item1.id==item2.id && item1.optionTitle==item2.optionTitle){
        return true;
    }
    else{
        return false;
    }
}
export const userCartStore=create(persist<CartType & ActionTypes>((set,get)=>({
    products:INITIAL_STATE.products,
    totalItems:INITIAL_STATE.totalItems,
    totalPrice:INITIAL_STATE.totalPrice,
    shopId:INITIAL_STATE.shopId,
    addToCart(item){
        const products=get().products;
        const productInState=products.find(product=>CheckSameItem(product,item))
        if(productInState){

            const updatedProduct=products.map(product=>CheckSameItem(product,item)?{
                ...item,
                quantity:item.quantity+product.quantity,
                price:item.price+product.price
            }:item)
            set((state)=>({
                products:updatedProduct,  //logic need to be more clear and refined
                totalItems:state.totalItems+item.quantity,
                totalPrice:state.totalPrice+ item.price,
                shopId:item.shopId
            }));
        }
        else{
            set((state)=>({
                products:[...state.products,item],  //logic need to be more clear and refined
                totalItems:state.totalItems+item.quantity,
                totalPrice:state.totalPrice+ item.price,
                shopId:item.shopId
            }));
        }
    },
    removeFromCart(item){
        console.log("product",get().products[0].optionTitle ," d ",get().products[0].id)
        console.log("item",item.optionTitle," d ", item.id)
        console.log(get().products.filter(product=>product.id !== item.id && product.optionTitle !==item.optionTitle),)
        set((state)=>({
            products:state.products.filter(product=>product.id !== item.id && product.optionTitle!==item.optionTitle),
            totalItems:state.totalItems-item.quantity,
            totalPrice:state.totalPrice - item.price
        }));
    },
    removeAllFromcart() {
        set(INITIAL_STATE)
    }
}),{name:"cart",skipHydration:true}))  //we need to skip hydration to prevent hydration error as in the beginning nextjs is trying to change component type as we are using client side component