import counter from "./counter";

export interface Imodel{
  namespace:string,
  state:any,
  reducers:any,
  effects:any
}

export default {
  counter
}
