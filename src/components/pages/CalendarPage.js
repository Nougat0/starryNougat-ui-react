import React, { useState } from "react";
import Calendar from "../calendar/Calendar";
import "./CalendarPage.css";

const navLT = "/resource/icons/nav-button-lt.png"
const navGT = "/resource/icons/nav-button-gt.png"
const navDoubleLT = "/resource/icons/nav-button-double-lt.png"
const navDoubleGT = "/resource/icons/nav-button-double-gt.png"

/**
 * 달력페이지
 */
const CalendarPage = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const [yy, setYear] = useState(year); //표시할 연도
    const [mm, setMonth] = useState(month); //표시할 월 (0~11)

    /**
     * 다음달 버튼 onClick 함수
     */
    const nextMonth = () => {
        setMonth((prevMonth) => {
            let month = prevMonth+1;
            if (month > 11) { //month(0~11)
                setYear((prevYear) => prevYear+1);
                month = 0;
            }
            return month;
        });
    }
    /**
     * 이전달 버튼 onClick 함수
     */    
    const prevMonth = () => {
        setMonth((prevMonth) => {
            let month = prevMonth-1;
            if (month < 0) { //month(0~11)
                setYear((prevYear) => prevYear-1);
                month = 11;
            }
            return month;
        });
    }
    /**
     * 다음연도 버튼 onClick 함수
     */
    const nextYear = () => {
        setYear((year) => year+1);
    }
    /**
     * 이전연도 버튼 onClick 함수
     */
    const prevYear = () => {
        setYear((year) => year-1);
    }
    return (
        <div className="page-container">
            <div className="navbar lt flex-container">
                <div className="nav-button" onClick={() => prevMonth()}>
                    <img src={navLT} />
                </div>
                <div className="nav-button" onClick={() => prevYear()}>
                    <img src={navDoubleLT} />
                </div>
            </div>
            <div className="navbar gt flex-container">
                <div className="nav-button" onClick={() => nextMonth()}>
                    <img src={navGT}/>
                </div>
                <div className="nav-button" onClick={() => nextYear()}>
                    <img src={navDoubleGT}/>
                </div>
            </div>
            <Calendar
                yy={yy}
                mm={mm}
            />
        </div> 
    );
};

export default CalendarPage;