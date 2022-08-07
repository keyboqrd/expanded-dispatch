import React, { FC, useContext, useEffect, useState } from "react";
import { AffContext, WoContext } from "../..";
import { affiliates } from "../../models/affiliate";
import { Trade } from "../../models/types";
import { Reason, WoCalculator } from "../../models/wo";
import { Card } from "./card";


import { Flipper, Flipped } from 'react-flip-toolkit'

type SidedProps = {}


export const Sided: FC<SidedProps> = () => {
    const { activeAff, setActiveAff } = useContext(AffContext);
    const { wo, setWo } = useContext(WoContext);

    const ReorderAffList = (): { id: number, reason: Reason | undefined }[] => {
        if (wo.p === undefined || wo.trade === undefined || wo.trade === Trade.NotYet) {
            return affiliates.list.map(x => { return { id: x.Id, reason: undefined } });
        } else {
            const woAffs = WoCalculator.GetAffs(wo);
            return woAffs.map(x => { return { id: x.id, reason: x.reason } });
        }
    }
    const affList = ReorderAffList();

    return (
        <div className="sided">
            <Flipper flipKey={affList.map(x => x.id).join('')}>
                {affList.map((aff) => (
                    <Flipped key={aff.id} flipId={aff.id}>
                        <div>
                            <Card affId={aff.id} reason={aff.reason}
                            />
                        </div>
                    </Flipped>)
                )}
            </Flipper>
        </div>
    )
}