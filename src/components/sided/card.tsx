import React from "react";


export class Card extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="card-wrap"
                ref="card">
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
}