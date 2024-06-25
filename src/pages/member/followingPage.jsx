import FolloingrComp from "../../components/member/followingComp";
import { useParams } from "react-router-dom";

function followingPage() {
    const { nickname } = useParams();

    return (
        <div>
            <FolloingrComp nickname={nickname} />
        </div>
    );
}

export default followingPage;