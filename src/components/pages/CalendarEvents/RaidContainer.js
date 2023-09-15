import React, { useEffect, useRef, useState } from "react";
import Raid from "./Raid";

/**
 * 레이드 이벤트 표시줄
 * @param {String} raidType 레이드 종류 구분 문자열 / legend, mega
 * @returns
 */
const RaidContainer = ({ raidType }) => {
    const [raids, setRaids] = useState([1, 2, 3]);
    const ref = useRef();
    const raidRefs = useRef([]);

    useEffect(() => {
        // 해당 주에 들어가는 레이드의 개수에 따라 ref를 추가해줌
        const length = raids.length;
        if (length !== 0) raidRefs.current = raidRefs.current.slice(0, length);
    }, [raids]);

    return (
        <div className={`raid-container ${raidType}-raid-event`} ref={ref}>
            {raids.map((oneRaid, raidNum) => {
                return (
                    <Raid
                        key={raidNum}
                        index={raidNum}
                        raidRefs={raidRefs}
                        raidType={raidType}
                        raidList={raids}
                    />
                );
            })}
        </div>
    );
};

export default RaidContainer;
