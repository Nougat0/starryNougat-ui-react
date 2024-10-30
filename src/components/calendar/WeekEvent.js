import { addDays, calcPosition, calcWidth, getWeekItemShape } from "../../modules/CalendarFunction";
import WeekEventBox from "./WeekEventBox";

const WeekEvent = ({oneEvent, weekStart}) => {
    const event = oneEvent.event;
    const weekEnd = addDays(weekStart, 7);
    const position = calcPosition(event, weekStart, weekEnd);
    const start = position[0];
    const end = position[1];
    const width = calcWidth(event);
    const shape = getWeekItemShape(start, end);
    return (
        <WeekEventBox className={"week-event"} left={start} width={width} shape={shape}>
            {event.eventNm}
        </WeekEventBox>
    );
}

export default WeekEvent;