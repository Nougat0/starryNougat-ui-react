import styled from "styled-components";

const WeekItemPosition = styled('div') (({left, width, isEvent}) => {
    return ({
        /*해당 Bar의 위치,가로길이 지정*/
        position: `${isEvent ? "relative" : "absolute"}`,
        left: `${left/168*100}%`, //시작점
        width: `${width/168*100}%`, //지속시간
    })
});

export default WeekItemPosition;