import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../../../assets/images/TopBannerImage.png";

const TopBanner: React.FC = () => {
    return (
        <div className="w-full">
            <Link to = "/">
                <img 
                    className="w-full rounded-xl"
                    src={Banner}
                    alt="main component"
                    />
            </Link>
        </div>
    );
}

export default TopBanner;