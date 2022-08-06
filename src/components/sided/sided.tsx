import React, { FC, useContext, useEffect, useState } from "react";
import { AffContext, WoContext } from "../..";
import { affiliates } from "../../models/affiliate";
import { Trade } from "../../models/types";
import { WoCalculator } from "../../models/wo";
import { Card } from "./card";

type SidedProps = {}


export const Sided: FC<SidedProps> = () => {
    //const [hoveredAff, setHoveredAff] = useState(-1);
    const { activeAff, setActiveAff } = useContext(AffContext);
    const { wo, setWo } = useContext(WoContext);


    const ReorderAffList = () => {
        if (wo.p === undefined || wo.trade === undefined || wo.trade === Trade.NotYet) {
            return affiliates.list;
        } else {
            const woAffs = WoCalculator.GetAffs(wo);
            return woAffs.map(x => affiliates.list.find(i => i.Id === x.id));
        }
    }


    return (
        <div className="sided">
            {ReorderAffList().map((aff, i) =>
                <Card affId={aff!.Id}
                    key={i}
                />
            )}
        </div>
    )
}