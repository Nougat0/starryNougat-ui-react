import React from "react";

const Hour = () => {
    return (
        <div className="hour-container">
            <div className="hour-header">
                <div className="hour-header-info">
                    <div className="hour-header-text">
                        <div className="hour-bonus">아워 보너스</div>
                        <div className="hour-time">아워 시각</div>
                    </div>
                    <div className="hour-pm">
                        <img src="/pm/pm200(1).png" alt="아워 포켓몬"></img>
                    </div>
                </div>

                <div className="hour-title">아워 이벤트</div>
            </div>
            <div className="hour-body">
                <div className="hour-body-text">아워 보너스 정보</div>
            </div>
        </div>
    );
};

export default Hour;
