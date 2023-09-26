import React, { useState } from "react";
import "./CalendarPage.css";
import CalendarDay from "./CalendarPage/CalendarDay";
import WeeklyRaidContainer from "./CalendarEvents/RaidContainer";

const CalendarPage = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const [yy, setYear] = useState(year); //표시할 연도
    const [mm, setMonth] = useState(month); //표시할 월

    /**
     * 2자릿수의 월 정보 반환
     * 0~11을 받아서 1~12로 반환함(주의)
     */
    const getFullMonth = (month) => {
        if (month < 9) return "0" + (month + 1);
        else return month + 1;
    };

    /**
     *
     * @param {*} year
     * @param {*} month 1월 = 0, 12월 = 11
     */
    const getCalendarArray = (year, month) => {
        const weeks = [];
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);
        //요일정보
        // 0:일 1:월 2:화 3:수 4:목 5:금 6:토
        const numDays = lastDate.getDate();

        //첫날의 요일 구하기
        let dayOfWeekCounter = firstDate.getDay();

        //해당 달의 날짜 개수만큼 for문 돌리기
        for (let date = 1; date <= numDays; date++) {
            if (dayOfWeekCounter === 0 || weeks.length === 0) {
                //이전달의 날들 채워넣기...
                if (weeks.length === 0 && dayOfWeekCounter !== 0) {
                    const firstWeek = [];
                    for (let before = 1; before <= dayOfWeekCounter; before++) {
                        firstWeek.push(
                            new Date(year, month, before - dayOfWeekCounter)
                        );
                    }
                    weeks.push(firstWeek);
                } else {
                    weeks.push([]);
                }
            }

            weeks[weeks.length - 1].push(new Date(year, month, date));
            dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;

            //마지막 날 넣었을 경우
            if (date === numDays && lastDate.getDay() !== 6) {
                const lastDay = lastDate.getDay();
                const nextMonth = 6 - lastDay;
                for (let next = 1; next <= nextMonth; next++) {
                    weeks[weeks.length - 1].push(new Date(year, month, next));
                }
            }
        }

        return weeks;
    };

    const thisMonth = getCalendarArray(yy, mm);

    return (
        <div>
            <div className="calendar-navbar">
                <button
                    onClick={() => {
                        //1달 제거된 날짜
                        const date = new Date(yy, mm - 1);
                        //표시할 때는 +1 해줘야 함
                        setYear(date.getFullYear());
                        setMonth(date.getMonth());
                    }}
                >
                    &lt;
                </button>
                <button
                    onClick={() => {
                        //1달 추가된 날짜
                        const date = new Date(yy, mm + 1);
                        //표시할 때는 +1 해줘야 함
                        setYear(date.getFullYear());
                        setMonth(date.getMonth());
                    }}
                >
                    &gt;
                </button>
            </div>
            <div className="calendar container">
                <div className="calendar-title">⭕</div>
                <div className="calendar">
                    <div className="calendar-header">
                        <div className="header-yymm">
                            <div className="header-yymm-logo">
                                <img src="/logo.png" alt="pokemon go logo" />
                            </div>
                            <div>
                                {yy}.{getFullMonth(mm)}
                            </div>
                        </div>
                        <div className="header-season">
                            <div className="header-season-pic">
                                <img
                                    src="/season/pokemongo-season-adventures-abound.png"
                                    alt="pokemon go season"
                                />
                            </div>
                            <div className="header-season-info">
                                시즌보너스정보
                            </div>
                        </div>
                        <div className="header-updateInfo">
                            <div className="header-author">
                                네이버카페_포켓몬GO한국_별밤 편집
                            </div>
                            <div className="header-updateDate">
                                2023.08.30 업데이트
                            </div>
                        </div>
                    </div>
                    <div className="calendar-body">
                        <div className="calendar-weekday">
                            <div className="weekday weekday-sun">일</div>
                            <div className="weekday weekday-mon">월</div>
                            <div className="weekday weekday-tue">화</div>
                            <div className="weekday weekday-wed">수</div>
                            <div className="weekday weekday-thu">목</div>
                            <div className="weekday weekday-fri">금</div>
                            <div className="weekday weekday-sat">토</div>
                        </div>
                        <div className="calendar-day">
                            {thisMonth.map((week, weekIndex) => {
                                const weekNum = thisMonth.length;
                                return (
                                    <div
                                        className={`week week-${weekIndex + 1}`}
                                        key={weekIndex}
                                    >
                                        {week.map((day, dayIndex) => {
                                            const date = day.getDate();
                                            let customFontClass = "";
                                            let customDayClass = "";
                                            //일주일 시작/끝 명시용 클래스
                                            if (dayIndex === 0)
                                                customDayClass = "week-start";
                                            else if (dayIndex === 6)
                                                customDayClass = "week-end";
                                            //이전달/다음달 날짜 명시용 클래스
                                            if (weekIndex === 0 && date > 7)
                                                customFontClass =
                                                    "before-month";
                                            else if (
                                                weekIndex + 1 === weekNum &&
                                                date < 7
                                            )
                                                customFontClass = "after-month";
                                            return (
                                                <CalendarDay
                                                    key={dayIndex}
                                                    customFontClass={
                                                        customFontClass
                                                    }
                                                    customDayClass={
                                                        customDayClass
                                                    }
                                                    day={day}
                                                />
                                            );
                                        })}
                                        <WeeklyRaidContainer
                                            raidType={"legend"}
                                        />
                                        <WeeklyRaidContainer
                                            raidType={"mega"}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="calendar-footer">
                        <div className="symbol-description">도구모음</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
