import React from 'react';

import HomeDefaultLayout from "../layouts/DefaultLayout.jsx";
import JoinFormComp from '../components/joinPage/JoinFormComp.jsx';

const JoinPage = () => {
    return (
            <>
                <br/>
                <br/>
                <br/>
                <HomeDefaultLayout>
                    <JoinFormComp/>
                </HomeDefaultLayout>
                <br/>
                <br/>
                <br/>
        </>
    );
};

export default JoinPage;