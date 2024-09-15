import { BUY_CAKE } from "./cakeTypes";

export const buyCake = (point) =>{
     
     return {
          type : BUY_CAKE,
          payload: point
     }

}