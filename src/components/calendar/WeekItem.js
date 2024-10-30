const WeekItem = (props) => {
    //let duration = "18:00~19:00"
    const weekStart = props.weekStart;
    const weekEnd = addDays(weekStart, 7);
    const start = new Date(props.startDt);
    const end = new Date(props.endDt);
    let startTime = `${getFullTime(start.getHours())}:${getFullTime(start.getMinutes())}`
    /*자정에 끝나는 이벤트는 종료시각 23:59로 표시해주기*/
    let endTime = end.getHours() === 0 && end.getMinutes() === 0 ? "23:59" : `${getFullTime(end.getHours())}:${getFullTime(end.getMinutes())}`
    //duration = `${startTime}~${endTime}`
    return (
        <div className="week-item">
            <div className="week-item-start-time">{startTime}</div>
            <div className="week-item-end-time">{endTime}</div>
            {props.children}
        </div>
    )
}