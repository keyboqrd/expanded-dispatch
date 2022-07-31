import React from "react";
import { SidedAff } from "../canvas/models";

export type CardProps = {
    affs: SidedAff[];
    affClicked(aff: number): any;
}

export class Card extends React.Component<CardProps> {
    render(): React.ReactNode {
        return (
            <div className="card-wrap"
                ref="card"
                onClick={this.clicked}>
                <div className="card" >
                    <div className="card-bg"></div>
                    <div className="card-info">
                        <h1>Canyons</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    constructor(props: any) {
        super(props);
    }

    private clicked = () => {
        if (this.props.affs.length > 0) {
            this.props.affClicked(this.props.affs[0].affId);
        }
    }
}