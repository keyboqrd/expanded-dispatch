import React, { FC, useContext, useEffect, useState } from "react";
import { AffContext } from "../..";
import { affiliates } from "../../models/affiliate";
import { Card } from "./card";
import { SidedRenderer } from "./sidedRenderer";

type SidedProps = {}


export const Sided: FC<SidedProps> = () => {
    const [sidedAffs, setSidedAffs] = useState(SidedRenderer.init(affiliates));
    const [hoveredAff, setHoveredAff] = useState(-1);
    const { activeAff, setActiveAff } = useContext(AffContext);

    useEffect(() => {
        activeAffChanged(activeAff);
    }, [activeAff])

    const activeAffChanged = (affId: number) => {
        if (affId === -1 || affId === hoveredAff) {
            setSidedAffs(SidedRenderer.init(affiliates));
            setHoveredAff(-1);
        }
        else {
            setSidedAffs(SidedRenderer.updateAff(affiliates, affId));
            setHoveredAff(affId);
        }
    }
    return (
        <div className="sided">
            {sidedAffs.map((aff, affId) =>
                <Card aff={aff}
                    updateAff={(affId) => {
                        setActiveAff(affId);
                    }} />
            )}
        </div>
    )
}