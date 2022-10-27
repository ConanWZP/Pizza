import React, {FC} from "react"
import ContentLoader from "react-content-loader"

const Skeleton:FC<any> = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="130" cy="130" r="130" />
        <rect x="0" y="283" rx="11" ry="11" width="280" height="28" />
        <rect x="0" y="345" rx="9" ry="9" width="280" height="88" />
        <rect x="0" y="449" rx="10" ry="10" width="95" height="30" />
        <rect x="125" y="446" rx="25" ry="25" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton