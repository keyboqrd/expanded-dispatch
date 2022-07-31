import React, { useContext } from "react";
import { AffContext } from "../..";
import { Affiliates } from "../../models/affiliate";
import { SidedAff } from "../canvas/models";
import { Card } from "./card";

type SidedProps {}

type SidedState = {
    affs: SidedAff[]
}



export class Sided extends React.Component<SidedProps, SidedState> {

    render(): React.ReactNode {
        return (
            <AffContext.Consumer>
                {({ activeAff, setActiveAff }) => (
                    <div className="sided">
                        {this.affiliates.list.map((aff, affId) =>
                            <Card affs={this.affiliates.list}
                                clicked={(affId) => {
                                    setActiveAff(affId);
                                    this.affClicked(affId);
                                }} />
                        )}
                    </div>
                )}
            </AffContext.Consumer>
        )
    }

    constructor(props: any) {
        super(props);
        this.affiliates = new Affiliates();
    }
    affiliates: Affiliates;

    private affClicked = (affId: number) => {


    }

    init = () => {
        //  this.context.;
    }
}