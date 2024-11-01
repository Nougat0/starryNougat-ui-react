import "./Day.css"
import Tyranitar from "../../resource/image/Tyranitar.png";
import MegaGroundon from "../../resource/image/Mega_Groundon.png";
import Shiny from "../../resource/icons/shiny.png";
import { getFullTime } from "../../modules/CalendarFunction";
import BattleImages from "../../resource/image/BattleImages";
import defaultBattleImage from "../../resource/image/Battle_Cup_Fantasy.png";

const Day = (props) => {
    const day = props.day; //new Date() 날짜 객체
    const notThisMonth = props.notThisMonth; //현재 지정된 이번달에 속하지 않은 날짜 여부
    const dayEventList = props.dayEventList; //[{eventSeq, event, pokemonList}]
    const battleList = props.battleList; //없으면 빈 배열
    const battleStart = new Date(battleList[0]?.event.endDt).getHours() === 0; //배틀 시작날인지?
    const today = new Date().setHours(0,0,0,0);
    const isToday = today.valueOf() === day.valueOf();
    const shrinkHeader = Boolean(dayEventList);
    const hasBattle = battleList.length > 0;

    return (
        <div className={`cal-day`}>
            <div className={`cal-day-header ${hasBattle ? "cal-day-battle" : ""} ${hasBattle && shrinkHeader ? "width-60" : ""} ${hasBattle && battleStart ? "battle-start" : hasBattle && !battleStart ? "battle-end" : ""}`}>
                <div className={`cal-day-date ${notThisMonth ? "disabled" : ""}  ${isToday ? "today" : ""}`}>
                    {day.getDate()}
                </div>
                <div className="cal-day-battle-info flex-container">
                    {battleList.map((battle, index) => {
                        // const url = battle.event.url.substr(11).replace(".png","");
                        // const Component = BattleImages[url];
                        // return <Component key={index} />
                        return <img key={index} className={battleStart ? "battle-start-img" : ""} src={defaultBattleImage} />
                    })}
                </div>
            </div>
            <div className="cal-day-body flex-container">
                {Boolean(dayEventList) && dayEventList.length > 0 && dayEventList.map((dayEvent, index) => {
                    let duration = "18:00~19:00"

                    const start = new Date(dayEvent.event.startDt);
                    const end = new Date(dayEvent.event.endDt);
                    let startTime = `${getFullTime(start.getHours())}:${getFullTime(start.getMinutes())}`
                    /*자정에 끝나는 이벤트는 종료시각 23:59로 표시해주기*/
                    let endTime = end.getHours() === 0 && end.getMinutes() === 0 ? "23:59" : `${getFullTime(end.getHours())}:${getFullTime(end.getMinutes())}`
                    duration = `${startTime}~${endTime}`

                    const dayEventPokemonList = dayEvent?.pokemonList;
                    const dayEventBonusList = dayEvent?.bonusList;
                    return (
                        <div className="cal-day-event" key={index}>
                            <div className="cal-day-event-header">
                                <div className="cal-day-event-row flex-container">
                                    <div className="cal-day-event-bref">
                                        <div className="cal-day-event-pokemon-name ">{dayEventPokemonList[0]?.pokemonNmKr ?? "임시이름"}</div>
                                        <div className="cal-day-event-time ">{duration}</div>
                                    </div>
                                    <div className="cal-day-event-pokemon">
                                        <img src={dayEventPokemonList[0]?.pokemonURL ?? Tyranitar}/>
                                        {(dayEventPokemonList[0]?.shinyYn === 'Y') && //일단은 연관된 첫번째 포켓몬만 가져오기
                                            <img src={Shiny} />
                                        }
                                    </div>       
                                </div>
                                <div className="cal-day-event-title">
                                    {dayEvent?.event.eventType ?? "HaHa"}
                                </div>
                            </div>
                            <div className="cal-day-event-body">
                                {/* 이벤트 상세 보너스 있을 시 목록 표시 */}
                                {dayEventBonusList.map((bonus, index) => {
                                    /* 보너스 목록 너무 길어서 우선은 첫번째 항목만 표시 */
                                    return index == 0 && <div className="cal-day-event-bonus" key={index}>{bonus.bonusSeq}</div>
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Day;