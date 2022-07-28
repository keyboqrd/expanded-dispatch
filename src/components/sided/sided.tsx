import React, { useContext } from "react";
import { AffContext } from "../..";
import { Affiliates } from "../../models/affiliate";
import { Card } from "./card";




export class Sided extends React.Component {
    //static contextType = GlobalContext;
    render(): React.ReactNode {
        return (
            <div className="sided">
                {this.affiliates.list.map(aff =>
                    <Card />
                )}
            </div>
        )
    }


    constructor(props: any) {
        super(props);
        this.affiliates = new Affiliates();
    }
    affiliates: Affiliates;

    init = () => {
        //  this.context.;
    }
}