import React from "react";
import Hour from "../CalendarEvents/Hour";

/**
 *
 * @param {Date} day 표시하는 날짜의 full string
 * @param {String} customFontClass 폰트 속성 위해서 붙일 클래스
 * @param {String} customDayClass  위해서 붙일 클래스
 * @returns
 */
const CalendarDay = ({ day, customFontClass, customDayClass }) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    const isToday =
        year === day.getFullYear() &&
        month === day.getMonth() &&
        date === day.getDate();

    return (
        <div className={`day ${customDayClass}`}>
            <div className="day-header">
                <div
                    className={`day-date ${customFontClass} ${
                        isToday ? "today" : ""
                    }`}
                >
                    {day.getDate()}
                </div>
                <div className="day-event">이벤트영역</div>
            </div>
            <div className="day-body">
                {(day.getDate() === 8 || day.getDate() === 15) && <Hour />}
            </div>
            {/* 레이드 정보는 달력 위에 float로 위치 계산해서 놓는걸로 */}
        </div>
    );
};

export default CalendarDay;
