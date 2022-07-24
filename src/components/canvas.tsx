import React from 'react';
import { Affiliates } from '../models/affiliate';
import { COLS, ROWS } from '../models/_index';
import { Hexagon } from './hexagon';
import { HexType, HexParams, CanvasParams, CanvasStatus } from './models';
import { useState } from 'react';

export class Canvas extends React.Component<CanvasParams, CanvasStatus> {
  constructor(props: CanvasParams) {
    super(props);
    //this.state.affiliates = new Affiliates();
  }

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
        let hexParams: HexParams = { affs: [], affHover: this.affHover };
        params[i].push(hexParams);
      }
    }
    params = this.state.affiliates.fill(params);

    return (
      <div className="honeycomb ">
        <>
          {params.map((i, key) => this.renderColumn(i, key))}
        </>
        <div className="shadows"></div>
      </div>
    );
  }

  renderColumn(hexesParam: HexParams[], key: number) {
    return (
      <div className={'column'}>
        {hexesParam.map((hexParam, index) =>
          <Hexagon
            affs={hexParam.affs}
            key={key * ROWS + index}
            affHover={this.affHover}
          />)}
      </div>
    );
  }


  //const[this.state, setState] = useState<CanvasStatus>({ curStep: 0, affiliates: new Affiliates() });



  private affHover = (affId: number) => {
    const aff = this.state.affiliates.affiliates[affId];
    console.log(aff);
    let curStep = 1;
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.setState(curStep: this.state.curStep + 1);
      }, 800);
    });
  }

  private animateAffs = ({ curStep: number }) => {
    this.state.affiliates.update({ affId, curStep });
    curStep++;
    this.render();
  }

  renderAffs() {

  }
}

