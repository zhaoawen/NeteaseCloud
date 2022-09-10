import { Swipe,SwipeItem,Button, Popup ,Pagination,Field ,Dialog} from "vant";

let plugins = [
    Swipe,SwipeItem,Button, Popup ,Pagination,Field,Dialog
] 
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item);
    })
}