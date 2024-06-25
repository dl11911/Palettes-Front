import MyPageComp from '../../components/member/myPageComp'
import { useParams } from "react-router-dom";


const  myPage = () =>{
    const { nickname } = useParams();
    return(
        <>
        <MyPageComp nickname={nickname}></MyPageComp>
        </>
    )
}

export default myPage;