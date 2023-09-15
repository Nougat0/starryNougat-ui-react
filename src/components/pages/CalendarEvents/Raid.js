import React from "react";

const Raid = ({ index, raidRefs, raidType, raidList }) => {
    const raidKr = raidType === "mega" ? "메가" : "전설";
    /**
     * 숫자형식으로 저장한 %값 (% 붙여서 써야 함)
     */
    const RAID_WIDTH = {
        calc: {
            dawn: 2.86,
            morning: 5.72,
            evening: 11.5,
            midnight: 14.3,
        },
        sun: {
            dawn: 2.86,
            morning: 5.72,
            evening: 11.5,
            midnight: 14.3,
        },
        mon: {
            dawn: 17.16,
            morning: 20.02,
            evening: 25.69,
            midnight: 28.55,
        },
        tue: {
            dawn: 31.41,
            morning: 33.27,
            evening: 39.99,
            midnight: 42.85,
        },
        wed: {
            dawn: 45.71,
            morning: 48.57,
            evening: 54.29,
            midnight: 57.15,
        },
        thu: {
            dawn: 60.01,
            morning: 62.87,
            evening: 68.59,
            midnight: 71.45,
        },
        fri: {
            dawn: 74.31,
            morning: 77.17,
            evening: 82.84,
            midnight: 85.7,
        },
        sat: {
            dawn: 88.56,
            morning: 91.42,
            evening: 97.14,
            midnight: 100,
        },
    };

    /**
     * 레이드 div의 모양을 clip-path : polygon으로 변형
     * @param {*} raidNum
     * @returns
     */
    const makeClipPath = (raidNum) => {
        // ref를 사용할 때 DOM이 로딩되지 않았을 때 가져오면 undefined라서 오류 뜸,
        // 이 현상 방지를 위해 if문 추가
        if (document.readyState === "complete") {
            const ref = raidRefs.current[raidNum];

            const boundingClientRect = ref.getBoundingClientRect();
            const width = boundingClientRect.width * 2;

            const elemHeight = boundingClientRect.height;
            const remainWidth = width - elemHeight;

            //clipPath 에 비율을 사용해야 할 경우
            const remainPercent = (remainWidth / width) * 100;
            const elemPercent = (elemHeight / width) * 100;

            const raidCount = raidList.length;

            //레이드가 하나일 경우 clipPath 반환 안 함
            if (raidCount === 1) {
                return "";
            }

            let clipPath = "";
            if (raidNum === 0) {
                clipPath = `polygon(0 0, ${remainPercent}% 0, 100% 50%, ${remainPercent}% 100%, 0 100%)`;
            } else if (raidNum === raidCount - 1) {
                clipPath = `polygon(${elemPercent}% 0, 100% 0, 100% 100%, ${elemPercent}% 100%, 0 50%)`;
            } else {
                clipPath = `polygon(${elemPercent}% 0%, ${remainPercent}% 0%, 100% 50%, ${remainPercent}% 100%,${elemPercent}% 100%, 0% 50%)`;
            }
            return clipPath;
        } else {
            return false;
        }
    };
    const width = index === 0 ? `${RAID_WIDTH.thu.morning}%` : "";

    return (
        <div
            key={index}
            ref={(element) => (raidRefs.current[index] = element)}
            className={`raid-event ${raidType}`}
            style={{
                width: width,
                clipPath: `${makeClipPath(index)}`,
                flex: `${index !== 0 ? 1 : ""}`,
            }}
        >
            {raidKr} 레이드1
        </div>
    );
};

export default Raid;

//필요한 칸만큼 데이터를 배열에 넣어서?
