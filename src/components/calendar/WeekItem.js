import styled from "styled-components";
const height = "var(--week-item-height)";

const WeekItem = styled(`div`)(({shape}) => {
    /* 디폴트값 */
    let justifyContent = `left`;
    let flexDirection = `row`;
    /* 종료 모양일 시 반대로 하기 */
    if(!shape[0] && shape[1]) {
        justifyContent = `right`;
        flexDirection = `row-reverse`;
    } else if(shape[0] == shape[1]) {
        justifyContent = `center`;
    }
    return ({
        /* 위치 지정 */
        position: "absolute",
        top: 0,
        left: 0,
        
        /* 내부 콘텐츠 정렬 */
        justifyContent: justifyContent,
        flexDirection: flexDirection,
        
        /* 글자 정렬 */
        height: height,
        lineHeight: height,
        width: "100%", /* 너비 수동으로 지정해줘야 정렬가능 */
        overflowX: "clip",
})})

export default WeekItem;