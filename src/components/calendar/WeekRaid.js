import { addDays, calcPosition, calcWidth, getWeekItemShape } from "../../modules/CalendarFunction";
import WeekRaidBox from "./WeekRaidBox";

const WeekRaid = ({raid, weekStart, isMega}) => {
    const weekEnd = addDays(weekStart, 7);
    const position = calcPosition(raid, weekStart, weekEnd);
    const start = position[0];
    const end = position[1];
    const width = calcWidth(raid);
    const shape = getWeekItemShape(start, end);
    const raidDetails = raid.raidDetailList;
    return (
        <WeekRaidBox left={start} width={width} shape={shape}>
            {isMega ? `[메가레이드:${raidDetails[0].pokemonNm}]` : raidDetails.map((detail) => detail.pokemonNm)}
        </WeekRaidBox>
    )
}

export default WeekRaid;