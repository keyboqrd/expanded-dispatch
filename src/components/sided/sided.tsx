import React, { useContext } from "react";
//import { GlobalContext } from "../..";
import { Affiliates } from "../../models/affiliate";
import { Card } from "./card";




export class Sided extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="sided">
                {this.affiliates.list.map(aff =>
                    <Card />
                )}
            </div>
        )
    }

    //activeAff = useContext(GlobalContext);

    constructor(props: any) {
        super(props);
        this.affiliates = new Affiliates();
    }
    affiliates: Affiliates;
}