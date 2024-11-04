/*******************************************
 * 전체 사용
 *******************************************/

/**
 * 2자릿수의 시간 정보 반환
 * @param {int} time 1~2 자리수 숫자
 * @returns {String} 한자리일 경우 앞에 0을 붙여서 반환
 */
export const getFullTime = (time) => {
    if (time < 10) return "0" + time;
    else return time;
};
/**
 * 이벤트 시작/끝시간 hh:mm 으로 구성해서 반환
 * @param {Object} event 이벤트 객체 (startDt, endDt)
 * @returns {Array} [시작시간, 끝시간] -- hh:mm 형식
 */
export const formatStartEndTime = (event) => {
    const start = new Date(event.startDt);
    const end = new Date(event.endDt);
    let startTime = `${getFullTime(start.getHours())}:${getFullTime(start.getMinutes())}`
    let endTime = end.getHours() === 0 && end.getMinutes() === 0 
        ? "23:59" /*자정에 끝나는 이벤트는 종료시각 23:59로 표시해주기*/
        : `${getFullTime(end.getHours())}:${getFullTime(end.getMinutes())}`
    return [`${startTime}`, `${endTime}`];
}

/*******************************************
 * Week 에서 사용
 *******************************************/
/**
 * WeekItem의 시작/끝 모양 변동여부 확인용 메소드
 * 일주일의 시작 위치:0, 끝 위치:168 임을 이용함.
 * @param {int} start 시작위치
 * @param {int} end 종료위치
 * @returns {Array} [시작모양, 끝모양] -- true: 삼각형 모양, false: 네모모양(기존 그대로)
 */
export const getWeekItemShape = (start, end) => {
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
export const calcWidth = (incident) => {
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
export const calcPosition = (incident, weekStart, weekEnd) => {
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
 * 날짜 추가
 * @param {Date} date 
 * @param {int} days 
 * @returns {Date} date로부터 days만큼 지난 시간
 */
export const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}
/**
 * 날짜 빼기
 * @param {Date} date 
 * @param {int} days 
 * @returns {Date} date로부터 days만큼 이전 시간
 */
export const minusDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
}

/**
 * 입력받은 2개의 날짜를 Day 단위로 같은지 비교
 * @param {Date} date1
 * @param {Date} date2
 * @returns {Boolean} 날짜가 같을 경우 True, 다를 경우 False
 */
export const sameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() 
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
    )
}