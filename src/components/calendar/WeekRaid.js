import { addDays, calcPosition, calcWidth, formatStartEndTime, getFullTime, getWeekItemShape } from "../../modules/CalendarFunction";
import WeekItemPosition from "./WeekItemPosition";
import WeekItemPolygon from "./WeekItemPolygon";

const WeekRaid = ({raid, weekStart, isMega, className}) => {
    const weekEnd = addDays(weekStart, 7);
    const position = calcPosition(raid, weekStart, weekEnd);
    /*시작시간,종료시간*/
    const startEndTime = formatStartEndTime(raid);
    const width = calcWidth(raid);
    const shape = getWeekItemShape(position[0], position[1]);
    const raidDetails = raid.raidDetailList;
    return (
        <WeekItemPosition left={position[0]} width={width}>
            {shape[0] && <div className="week-item-start-time">{`${startEndTime[0]}~`}</div> }
            {shape[1] && <div className="week-item-end-time">{`~${startEndTime[1]}`}</div> }
            <WeekItemPolygon className={className ?? ""} left={position[0]} width={width} shape={shape} showBorder={true} />
        </WeekItemPosition>
    )
}

export default WeekRaid;