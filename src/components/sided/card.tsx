import React from "react";
import { SidedAff } from "../canvas/models";
import { CardType } from "./sidedRenderer";

export type CardProps = {
    aff: SidedAff;
    hover(aff: number): any;
}

export class Card extends React.Component<CardProps> {
    render(): React.ReactNode {
        return (
            <div className="card-wrap"
                ref="card"
                onMouseEnter={this.hover}
                onMouseLeave={this.deHover}>
                <div className={this.getCardClassName(this.props.aff.type)} >
                    <div className="card-bg"></div>
                    <div className="card-info">
                        <h1>{this.props.aff.name}</h1>
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

    private getCardClassName = (type: CardType) => {
        return type === CardType.plain ? "card" : "card-highlighted-" + this.props.aff.affId;
    }
    private hover = () => {
        this.props.hover(this.props.aff.affId);
    }

    private deHover = () => {
        this.props.hover(-1);
    }

}