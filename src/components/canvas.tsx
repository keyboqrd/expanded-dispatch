import React from 'react';
import { Affiliates } from '../models/affiliate';
import { COLS, ROWS } from '../models/_index';
import { Hexagon } from './hexagon';
import { HexType, HexParams, CanvasParams } from './models';

export class Canvas extends React.Component<CanvasParams> {
  constructor(props: CanvasParams) {
    super(props);
    this.affiliates = new Affiliates();
  }
  private affiliates: Affiliates;

  render() {
    return (
      <div className="container">
        {this.renderColumns()}
      </div >
    );
  }

  renderColumns() {
    let params: HexParams[][] = [];
    for (var i = 0; i < COLS; i++) {
      params.push([]);
      for (var j = 0; j < ROWS; j++) {
        let hexParams: HexParams = { type: HexType.plain, affHover: this.affHover };
        params[i].push(hexParams);
      }
    }
    params = this.affiliates.Fill(params);

    return (
      <div className="honeycomb ">
        <>
          {params.map((i, key) => this.renderColumn(i, key))}
        </>
        <div className="shadows"></div>
      </div>
    );
  }

  renderColumn(x: HexParams[], key: number) {
    return (
      <div className={'column'}>
        {x.map((i, index) =>
          <Hexagon type={i.type}
            affs={i.affs}
            key={key * ROWS + index}
            affHover={this.affHover}
          />)}
      </div>
    );
  }
  private affHover(affId: number) {
    const aff = this.affiliates.affiliates[affId];
    console.log(aff);
    
  }
  renderAffs() {

  }
}

