
import {lazy, Suspense} from "react";
import IsLogin from "./IsLogin.jsx";

const Loading = <div>Loading....</div>

const Mypage = lazy(() => import('../pages/member/myPage.jsx'))
const FollowerPage = lazy(() => import('../pages/member/followerPage.jsx'))
const FollowingPage = lazy(() => import('../pages/member/followingPage.jsx'))

const FeedComp = lazy(() => import("../components/member/feedComp.jsx"))
const SettingComp = lazy(() => import('../components/member/settingComp.jsx'))
const Profile = lazy(() => import('../components/member/profileComp.jsx'))
const FeedDetailComp = lazy(() => import('../components/member/feedDetailComp.jsx'))
const SettingPwComp = lazy(() => import('../components/member/settingPwComp.jsx'))
const SettingOtherComp = lazy(() => import('../components/member/settingOtherComp.jsx'))
const CarrotLikeComp = lazy(() => import('../components/member/carrotLikeComp.jsx'))
import {Navigate } from "react-router-dom";

const mypageRouter = () =>{
    

        return [
            {
                path: "",
                element: <Navigate replace={true} to=":nickname" />
            },
            {
                path: ":nickname",
                element: <Suspense fallback={Loading}><IsLogin Component={<Mypage/>} /></Suspense>
            },
            {
                path: "follower/:nickname",
                element: <Suspense fallback={Loading}><IsLogin Component={<FollowerPage/>} /></Suspense>
            },
            {
                path: "following/:nickname",
                element: <Suspense fallback={Loading}><IsLogin Component={<FollowingPage/>} /></Suspense>
            },
            {
                path: "feed",
                element: <Suspense fallback={Loading}><IsLogin Component={<FeedComp/>} /></Suspense>
            },
            {
                path: "setting",
                element: <Suspense fallback={Loading}><IsLogin Component={<SettingComp/>} /></Suspense>
            },
            {
                path: "image/profile",
                element: <Suspense fallback={Loading}><IsLogin Component={<Profile/>} /></Suspense>
            },
            {
                path: "feed/detail/:feedId",
                element: <Suspense fallback={Loading}><IsLogin Component={<FeedDetailComp/>} /></Suspense>
            },
            {
                path: "setting/password",
                element: <Suspense fallback={Loading}><IsLogin Component={<SettingPwComp/>} /></Suspense>
            },
            {
                path: "setting/other",
                element: <Suspense fallback={Loading}><IsLogin Component={<SettingOtherComp/>} /></Suspense>
            },
            {
                path: "carrot/like",
                element: <Suspense fallback={Loading}><IsLogin Component={<CarrotLikeComp/>} /></Suspense>
            }
        ]
}

export default mypageRouter;