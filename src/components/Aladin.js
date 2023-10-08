import React from "react";

const Aladin = ({target}) => {

    React.useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:0.035, target: target })
        aladin.setFov(1)
    }, [])

    return (
        <div id='aladin-lite-div' style={{ width: '400px', height: '400px' }} />
    )
}

export default Aladin