import WeekItem from "./WeekItem";
import "./Week.css";

/**
 * 일주일의 이벤트/레이드를 표시해주는 컴포넌트
 * @param {Array} week 이번주 날짜 배열
 * @param {int} index 이번달의 몇 번째 주인지 index(0~)
 * @param {Object} events 이번주의 이벤트/레이드
 * @returns 
 */
const Week = ({week, index, events}) => {
    /**
     * WeekItem의 시작/끝 모양 변동여부 확인용 메소드
     * 일주일의 시작 위치:0, 끝 위치:168 임을 이용함.
     * @param {int} start 시작위치
     * @param {int} end 종료위치
     * @returns {Array} [시작모양, 끝모양] -- true: 삼각형 모양, false: 네모모양(기존 그대로)
     */
        const getWeekItemShape = (start, end) => {
            let startShape = false;
            let endShape = false;
            if(start > 0) startShape = true;
            if(end < 168) endShape = true; 
            return [startShape, endShape];
        }
    /**
     * 한 주의 길이를 7*24 = 168 이라고 했을 때, 
     * 주어진 레이드/이벤트가 몇칸을 차지하는지 확인
     * @param {Object} incident 레이드/이벤트
     */
    const calcWidth = (incident) => {
        const hours = (Date.parse(incident.endDt) - Date.parse(incident.startDt)) / 36e5;
        return hours;
    }
    /**
     * 한 주의 길이를 7*24 = 168 이라고 했을 때, 
     * 주어진 레이드/이벤트가 어디서부터 시작하는지 확인
     * @param {Object} incident 레이드/이벤트
     * @param {Date} weekStart 레이드,이벤트가 포함된 주의 시작시간
     * @param {Date} weekEnd 레이드,이벤트가 포함된 주의 끝시간
     * @returns {Array} [시작 위치, 끝 위치]
     */
    const calcPosition = (incident, weekStart, weekEnd) => {
        const eventStart =  Date.parse(incident.startDt);
        const eventEnd =  Date.parse(incident.endDt);
        weekStart = weekStart.getTime();
        weekEnd = weekEnd.getTime();
        let startPosition = 0;
        let endPosition = 168;
        if(eventStart > weekStart) {
            startPosition = (eventStart - weekStart) / 36e5;
        }
        if(eventEnd < weekEnd) {
            endPosition -= ((weekEnd - eventEnd) / 36e5);
        }
        return [startPosition, endPosition]; 
    }
    /**
     * 날짜추가
     * @param {Date} date 
     * @param {int} days 
     * @returns 
     */
    const addDays = (date, days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }
    /**
     * 2자릿수의 시간 정보 반환
     */
    const getFullTime = (time) => {
        if (time < 10) return "0" + time;
        else return time;
    };

    const weekRaid = events[index].weekRaidList;
    const legendRaids = weekRaid.filter((raid) => raid.raidType === "LG");
    const megaRaids = weekRaid.filter((raid) => raid.raidType === "ME");
    /*현재 접속자가 속한 국가 위주로 이벤트 뿌려줄 예정 (Worldwide는 임시조치)*/
    const weekEvent = events[index].weekEventList.filter((weekEvent) => weekEvent.location === "Worldwide");
    const nextWeekStart = addDays(week[6], 1);
    const weekStart = week[0];
    const weekEnd = nextWeekStart;

    return (
        <div className="week flex-container">
            {/*이벤트 정보*/}
            {weekEvent.length > 0 &&
                weekEvent.map((oneEvent, index) => {
                    const position = calcPosition(oneEvent, weekStart, weekEnd);
                    const start = position[0];
                    const end = position[1];
                    const width = calcWidth(oneEvent);
                    const shape = getWeekItemShape(start, end);
                    return (
                        <WeekItem key={index} className={"week-event"} left={start} width={width} shape={shape}>
                            {oneEvent.eventNm}
                        </WeekItem>
                    );
                })}
            {/*레이드 정보*/}
            {legendRaids.length > 0 && 
                <div className="week-raid legend-raid">
                    {legendRaids.map((raid, index) => {
                        const position = calcPosition(raid, weekStart, weekEnd);
                        const start = position[0];
                        const end = position[1];
                        const width = calcWidth(raid);
                        const shape = getWeekItemShape(start, end);
                        return (
                            <WeekItem key={index} left={start} width={width} shape={shape}>
                                {raid.pokemonSeq}
                            </WeekItem>
                        )
                    })}
                </div> }
            {megaRaids.length > 0 &&
                <div className="week-raid mega-raid">
                    {megaRaids.map((raid, index) => {
                        const position = calcPosition(raid, weekStart, weekEnd);
                        const start = position[0];
                        const end = position[1];
                        const width = calcWidth(raid);
                        const shape = getWeekItemShape(start, end);
                        return (
                            <WeekItem key={index} left={start} width={width} shape={shape}>
                                {raid.pokemonSeq}
                            </WeekItem>
                        )
                    })}
                </div> }
        </div>
    );
}

export default Week;