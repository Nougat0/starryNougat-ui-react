import "./Week.css";
import WeekEvent from "./WeekEvent";
import WeekRaid from "./WeekRaid";

/**
 * 일주일의 이벤트/레이드를 표시해주는 컴포넌트
 * @param {Array} week 이번주 날짜 배열
 * @param {Array} weekEventList 이번주의 이벤트
 * @param {Array} weekRaidList 이번주의 레이드
 * @returns 
 */
const Week = ({week, weekEventList, weekRaidList}) => {

    const legendRaids = weekRaidList.filter((raid) => raid.raidType === "LG");
    const megaRaids = weekRaidList.filter((raid) => raid.raidType === "ME");
    /*현재 접속자가 속한 국가 위주로 이벤트 뿌려줄 예정 (Worldwide는 임시조치)*/
    const weekEvent = weekEventList.filter((weekEvent) => weekEvent.event.location === "Worldwide");

    return (
        <div className="week flex-container">
            {/*이벤트 정보*/}
            {weekEvent.length > 0 &&
                weekEvent.toReversed().map((oneEvent, index) => 
                    <WeekEvent key={index} className={"week-event"} event={oneEvent.event} weekStart={week[0]}/>
                )}
            {/*레이드 정보*/}
            {legendRaids.length > 0 && 
                <div className="week-raid legend-raid">
                    {legendRaids.map((raid, index) => 
                        <WeekRaid key={index} className={"week-raid-box"} raid={raid} weekStart={week[0]} isMega={false}/>
                    )}
                </div> }
            {megaRaids.length > 0 &&
                <div className="week-raid mega-raid">
                    {megaRaids.map((raid, index) => 
                        <WeekRaid key={index} className={"week-raid-box"} raid={raid} weekStart={week[0]} isMega={true}/>
                    )}
                </div> }
        </div>
    );
}

export default Week;