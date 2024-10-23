import { useEffect, useState } from "react";
import "./Calendar.css";
import pogoLogo from "../../../src/resource/image/pogo-image.png";
import seasonImageSample from "../../../src/resource/image/pokemongo-season-adventures-abound.png";
import axiosInstance from "../axios/axiosInstance";

const Calendar = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const [yy, setYear] = useState(year); //표시할 연도
    const [mm, setMonth] = useState(month); //표시할 월
    const [currentSeason, setCurrentSeason] = useState(null); //현재 진행되는 시즌
    //현재 진행되는 시즌이 있을 경우에만 보너스 보여주기
    const [seasonBonuses, setSeasonBonuses] = useState([{text:"보너스1"}, {text:"보너스2"}]); //현재 달에 포함된 시즌보너스 정보
    const [updated, setUpdated] = useState(today.toLocaleDateString()); //업데이트 날짜 받아오기
    const [events, setEvents] = useState([]);
    
    /*
    monthlyInfo = {
        yymm: 202410, //예시(숫자형태)
        updated: "", //내부 직접적인 항목의 가장 최근 수정/등록 날짜
        season: {
            seasonName: "",
            seasonNameKr: "",
            seasonBonuses: [{},{},{},...]
        },
        weeklyInfo: [
            {
                yymm: 202410,
                weekNumberOfMonth: 0,
                dayEventList:{0:{},3:{},4:{}},
                weekEventList:[{},{},{},...],
                weekRaidList:[{},{},{},...],
            },
            ...
        ]
    }
    */
    useEffect(() => {
        //MonthlyInfo 가져오기
        axiosInstance.get(`/calendar/event?yymm=${yy}${getFullMonth(mm)}`)
        .then((res) => {
            console.log(res.data);
            const data = res.data;
            const bonusList = data.season.seasonBonus;
            const eventList = data.weeklyInfo;
            setSeasonBonuses(bonusList);
            setEvents(eventList);
        })
    }, [])

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
        //이번달 날짜 개수
        const numDays = lastDate.getDate();
        //요일 기록용 변수 - 첫날의 요일로 초기화
        // 0:일 1:월 2:화 3:수 4:목 5:금 6:토
        let dayOfWeek = firstDate.getDay();
        //해당 달의 날짜 개수만큼 for문 돌리기
        for (let date = 1; date <= numDays; date++) {
            if (dayOfWeek === 0 || weeks.length === 0) {
                //이전달의 날들 채워넣기...
                if (weeks.length === 0 && dayOfWeek !== 0) {
                    const firstWeek = [];
                    for (let prev = 1; prev <= dayOfWeek; prev++) {
                        firstWeek.push(
                            new Date(year, month, prev - dayOfWeek)
                        );
                    }
                    weeks.push(firstWeek);
                } else {
                    weeks.push([]);
                }
            }
            weeks[weeks.length - 1].push(new Date(year, month, date));
            dayOfWeek = (dayOfWeek + 1) % 7;
            //이번달의 마지막 날 넣었는데 아직 일주일이 끝나지 않았을 경우
            if (date === numDays && lastDate.getDay() !== 6) {
                const lastDay = lastDate.getDay(); //마지막날의 요일
                const nextMonthDays = 6 - lastDay; //이번달에 보이는 다음달 날짜 개수
                for (let next = 1; next <= nextMonthDays; next++) {
                    //마지막주에 다음달 날짜 채워넣기
                    weeks[weeks.length - 1].push(new Date(year, month, next + numDays));
                }
            }
        }
        return weeks;
    };
    const thisMonth = getCalendarArray(yy, mm);

    return <>
        <div className="container">
            <div className="cal-header flex-container">
                <div className="cal-title flex-container flex-item">
                    <div className="flex-item cal-pogo-image">
                        <img src={pogoLogo} />
                    </div>
                    <div className="flex-item cal-yymm">
                        {yy}.{getFullMonth(mm)}
                    </div>
                    <div className="flex-item cal-season-image">
                        <img src={seasonImageSample}/>
                    </div>
                </div>
                <div className="cal-info flex-container flex-item">
                    {seasonBonuses.length > 0 && //시즌 보너스 없을 경우 보이지 않음
                        <div className="cal-season-info flex-item">
                            <div>
                                {seasonBonuses.map((bonus, idx) => 
                                    <div key={idx}>
                                        {/* <i class="fa-light fa-candy-cane"></i> */}
                                        {bonus.contentKr}
                                    </div>
                                )}    
                            </div>
                        </div>      
                    }
                    <div className="cal-calendar-info flex-item">
                        <div className="developer">©Nougat0</div>
                        <div className="updated">{updated}</div>
                        <div className="version">v1.0</div>
                    </div>
                </div>
            </div>
            <div className="cal-body container">
                <div className="table">
                    <div className="thead">
                        <div className="tr">
                            <div className="td">일</div>
                            <div className="td">월</div>
                            <div className="td">화</div>
                            <div className="td">수</div>
                            <div className="td">목</div>
                            <div className="td">금</div>
                            <div className="td">토</div>
                        </div>
                    </div>
                    <div className="tbody">
                        {thisMonth.map((week, index) => {
                            const weekRaid = events[index]?.weekRaidList;
                            const weekEvent = events[index]?.weekEventList;
                            const dayEventMap = events[index]?.dayEventList;                          
                            return (
                                <div className="tr" key={index}>
                                    {week.map((day, index) => {
                                        //events[index].getWeekEvent() ~~ //events[index].days[index].getDayEvent()
                                        //const dayEvent = dayEventMap[index];
                                        return (
                                            <div className="td" key={index}>
                                                <div className="cal-day">
                                                    <div className="cal-day-header">
                                                        <div className={"cal-day-date " + (day.getMonth() != mm ? "disabled" : "")}>{day.getDate()}</div>
                                                        <div className="cal-day-battle-info"></div>
                                                    </div>
                                                    <div className="cal-day-body">
                                                        <div className="cal-day-event"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <table>
                    <thead>
                        <tr>
                            <th>일</th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                            <th>토</th>
                        </tr>
                    </thead>
                    <tbody>
                        {thisMonth.map((week, index) => {
                            console.log(index + " :: " +week)
                            console.log(typeof week)
                            return <tr key={index}>
                                {week.map((day, index) => <td key={index}>{day.getDate()}</td>)}
                            </tr>
                        }
                        )}
                    </tbody>
                </table> */}
            </div>
            <div className="cal-footer">Item 설명란</div>
        </div>
    </>
}

export default Calendar;