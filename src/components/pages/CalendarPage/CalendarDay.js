import React from "react";

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
                {day.getDate() === 8 && (
                    <div className="hour-container">
                        <div className="hour-header">
                            <div className="hour-header-info">
                                <div className="hour-header-text">
                                    <div className="hour-bonus">
                                        아워 보너스
                                    </div>
                                    <div className="hour-time">아워 시각</div>
                                </div>
                                <div className="hour-pm">
                                    <img
                                        src="/pm/pm200(1).png"
                                        alt="아워 포켓몬"
                                    ></img>
                                </div>
                            </div>

                            <div className="hour-title">아워 이벤트</div>
                        </div>
                        <div className="hour-body"></div>
                    </div>
                )}
            </div>
            {/* 레이드 정보는 달력 위에 float로 위치 계산해서 놓는걸로 */}
        </div>
    );
};

export default CalendarDay;
