import styled from "styled-components";

/**
 * Week 이벤트 Polygon으로 구현
 */
const WeekItemPolygon = styled('div')(({shape, showBorder}) => {
    const height = "var(--week-item-height)";
    return ({
        /*모양 지정*/
        clipPath: `polygon(
            ${shape[0] ? `calc(${height}/2) 100%, 0 50%, calc(${height}/2) 0` : "0 100%, 0 0"},
            ${shape[1] ? `calc(100% - calc(${height}/2)) 0, 100% 50%, calc(100% - calc(${height}/2)) 100%` : "100% 0, 100% 100%"}
        )`, //앞부분, 뒷부분 나눠서 polygon으로 구현
        height: height,
        
        /*기타 CSS 요소들*/
        ...(showBorder && { borderBottom: "0.1vw solid rgb(0,0,0,0.5)", borderTop: "0.1vw solid rgb(0,0,0,0.5)" }),
        opacity: "70%",
        fontSize: "1vw",
        
        /*글자 속성*/
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",

        /*내부 여백 지정*/
        paddingLeft: "1vw", //컨텐츠 시작점 지정
        paddingRight: "1vw", //컨텐츠 끝점 지정
})})

export default WeekItemPolygon;