import FollowerComp from "../../components/member/followerComp";
import { useParams } from "react-router-dom";

function followerPage() {
    const { nickname } = useParams();

    return (
        <div>
            <FollowerComp nickname={nickname} />
        </div>
    );
}

export default followerPage;
