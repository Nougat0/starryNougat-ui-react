import { addDays, calcPosition, calcWidth, formatStartEndTime, getFullTime, getWeekItemShape } from "../../modules/CalendarFunction";
import WeekItemPosition from "./WeekItemPosition";
import WeekItemPolygon from "./WeekItemPolygon";
import WeekItemContent from "./WeekItemContent";

const WeekRaid = ({raid, pokemonList, weekStart, isMega, className}) => {
    const weekEnd = addDays(weekStart, 7);
    /*시작시간,종료시간*/
    const startEndTime = formatStartEndTime(raid);
    /*모양,위치*/
    const width = calcWidth(raid);
    const position = calcPosition(raid, weekStart, weekEnd);
    const shape = getWeekItemShape(position[0], position[1]);
    return (
        <WeekItemPosition left={position[0]} width={width}>
            {shape[0] && <div className="week-item-start-time">{`${startEndTime[0]}~`}</div> }
            {shape[1] && <div className="week-item-end-time">{`~${startEndTime[1]}`}</div> }
            <WeekItemPolygon className={className ?? ""} left={position[0]} width={width} shape={shape} showBorder={true} />
            <WeekItemContent isMega={isMega} eventNm={isMega ? "메가레이드" : `${pokemonList[0].pokemonNmKr} 전설 레이드`} shape={shape} pokemonList={pokemonList}/>
        </WeekItemPosition>
    )
}

export default WeekRaid;