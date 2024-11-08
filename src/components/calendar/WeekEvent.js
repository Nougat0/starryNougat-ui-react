import { addDays, calcPosition, calcWidth, formatStartEndTime, getFullTime, getWeekItemShape } from "../../modules/CalendarFunction";
import WeekItemPosition from "./WeekItemPosition";
import WeekItemPolygon from "./WeekItemPolygon";
import WeekItemContent from "./WeekItemContent";

const WeekEvent = ({event, pokemonList, weekStart, className}) => {
    const weekEnd = addDays(weekStart, 7);
    /*시작시간,종료시간*/
    const startEndTime = formatStartEndTime(event);
    /*모양,위치*/
    const width = calcWidth(event);
    const position = calcPosition(event, weekStart, weekEnd);
    const shape = getWeekItemShape(position[0], position[1]);
    return (
        <WeekItemPosition left={position[0]} width={width} isEvent={true}>
            {shape[0] && <div className="week-item-start-time">{`${startEndTime[0]}~`}</div> }
            {shape[1] && <div className="week-item-end-time">{`~${startEndTime[1]}`}</div> }
            <WeekItemPolygon className={className ?? ""} shape={shape} showBorder={true} />
            <WeekItemContent eventNm={event.eventNm} shape={shape} pokemonList={pokemonList}/>
        </WeekItemPosition>
    );
}

export default WeekEvent;