import React from "react";
import "./CalendarPage.css";

const CalendarPage = () => {
    return (
        <div>
            <div className="calendar-title">캘린더 페이지입니다</div>
            <div className="calendar">
                <div className="calendar-header">
                    <div className="calendar-yymm">2023.08</div>
                    <div className="calendar-updateInfo">
                        <div className="calendar-author">
                            네이버카페_포켓몬GO한국_별밤 편집
                        </div>
                        <div className="calendar-updateDate">
                            2023.08.30 업데이트
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
