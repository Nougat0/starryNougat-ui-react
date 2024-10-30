import { styled } from "@mui/material/styles";

/**
 * weekEvent/Raid의 위치와 모양은 동적으로 지정이 필요하여
 * styled component로 구현함
 */
const WeekRaidBox = styled('div')(({width, left, shape}) => {
    const height = "var(--week-item-height)";
    return ({
        /*해당 Bar의 위치,크기 지정*/
        position: "absolute",
        left: `${left/168*100}%`, //시작점
        width: `${width/168*100}%`, //지속시간
        height: "var(--week-item-height)",
        top: 0,
        
        /*여백 지정*/
        //marginBottom: "0.2vw",
        paddingLeft: "1vw", //내부 글자 잘 보이게 하기
        paddingRight: "1vw", //내부 글자 잘 보이게 하기,
        
        /*모양 지정*/
        clipPath: `polygon(
            ${shape[0] ? `calc(${height}/2) 100%, 0 50%, calc(${height}/2) 0` : "0 100%, 0 0"},
            ${shape[1] ? `calc(100% - calc(${height}/2)) 0, 100% 50%, calc(100% - calc(${height}/2)) 100%` : "100% 0, 100% 100%"}
        )`, //앞부분, 뒷부분 나눠서 polygon으로 구현
        
        /*기타 CSS 요소들*/
        borderBottom: "1px solid",
        borderTop: "1px solid",
        opacity: "70%",
        fontSize: "1vw",
        //overflow: "hidden",
        //textOverflow: "ellipsis", //글자 길이가 width를 넘을 경우 생략부호 표시
})})

export default WeekRaidBox;