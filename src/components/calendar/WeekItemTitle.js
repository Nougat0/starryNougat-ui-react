import styled from "styled-components";

const WeekItemTitle = styled(`div`)(({shape}) => {
    /* 디폴트값 */
    let flexDirection = `row`;
    /* 종료 모양일 시 반대로 하기 */
    if(!shape[0] && shape[1]) {
        flexDirection = `row-reverse`;
    } 
    return ({
        flexDirection: flexDirection,

})});

export default WeekItemTitle;