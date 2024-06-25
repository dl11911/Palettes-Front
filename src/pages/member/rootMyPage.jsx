import {lazy, Suspense} from "react";
import { Outlet } from "react-router-dom";

const Mypage = lazy(()=> import('./myPage'));


const  rootMyPage = () =>{
    return(
        <>
        <Outlet/>
        </>
    )
}

export default rootMyPage;