import "./Day.css"
import Tyranitar from "../../resource/image/Tyranitar.png";
import MegaGroundon from "../../resource/image/Mega_Groundon.png";
import Shiny from "../../resource/icons/shiny.png";

const Day = (props) => {
    const day = props.day; //new Date() 날짜 객체
    const notThisMonth = props.notThisMonth; //현재 지정된 이번달에 속하지 않은 날짜 여부
    const dayEvent = props.dayEvent;
    const today = new Date().setHours(0,0,0,0);
    const isToday = today.valueOf() === day.valueOf();
    /**
     * 2자릿수의 시간 정보 반환
     */
    const getFullTime = (time) => {
        if (time < 10) return "0" + time;
        else return time;
    };
    
    let duration = "18:00~19:00"
    if(Boolean(dayEvent)) {
        const start = new Date(dayEvent.startDt);
        const end = new Date(dayEvent.endDt);
        let startTime = `${getFullTime(start.getHours())}:${getFullTime(start.getMinutes())}`
        /*자정에 끝나는 이벤트는 종료시각 23:59로 표시해주기*/
        let endTime = end.getHours() === 0 && end.getMinutes() === 0 ? "23:59" : `${getFullTime(end.getHours())}:${getFullTime(end.getMinutes())}`
        duration = `${startTime}~${endTime}`
    }

    return (
        <div className={`cal-day`}>
            <div className={`cal-day-header ${Boolean(dayEvent) ? "width-60" : ""}`}>
                <div className={`cal-day-date ${notThisMonth ? "disabled" : ""}  ${isToday ? "today" : ""}`}>
                    {day.getDate()}
                </div>
                <div className="cal-day-battle-info"></div>
            </div>
            <div className="cal-day-body">
                {Boolean(dayEvent) && 
                    <div className="cal-day-event">
                        <div className="cal-day-event-header">
                            <div className="cal-day-event-row flex-container">
                                <div className="cal-day-event-bref flex-item">
                                    <div className="cal-day-event-pokemon-name ">마기라스</div>
                                    <div className="cal-day-event-time ">{duration}</div>
                                </div>
                                <div className="cal-day-event-pokemon flex-item">
                                    <img src={Tyranitar}/>
                                    {(dayEvent.shinyYn === 'Y') && 
                                        <img src={Shiny} />
                                    }
                                </div>       
                            </div>
                            <div className="cal-day-event-title">
                                {dayEvent?.eventType ?? "HaHa"}
                            </div>
                        </div>
                        <div className="cal-day-event-body">
                            {/* 이벤트 상세 보너스 있을 시 목록 표시 */}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Day;