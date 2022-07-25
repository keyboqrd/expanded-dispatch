import React from 'react';
import { Affiliates } from '../models/affiliate';
import { COLS, ROWS } from '../models/_index';
import { Hexagon } from './hexagon';
import { HexType, HexParams, CanvasParams, CanvasStatus } from './models';
import { useState } from 'react';

export class Canvas extends React.Component<CanvasParams, CanvasStatus> {
  constructor(props: CanvasParams) {
    super(props);

    let affiliates = new Affiliates();
    const params = this.updateParams(affiliates);
    this.state = {
      curStep: 0,
      affiliates: affiliates,
      runInterval: undefined,
      hexParams: params
    };
  }

  render() {
    return (
      <div className="container">
        {this.renderColumns()}
      </div >
    );
  }

  renderColumns() {


    return (
      <div className="honeycomb ">
        <>
          {this.state.hexParams.map((i, key) => this.renderColumn(i, key))}
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
            affHover={(affId) => this.affHover(affId)}
            affDeHover={(affId) => this.affDeHover(affId)}
          />)}
      </div>
    );
  }
  private updateParams = (affiliates: Affiliates): HexParams[][] => {
    let params: HexParams[][] = [];
    for (var i = 0; i < COLS; i++) {
      params.push([]);
      for (var j = 0; j < ROWS; j++) {
        let hexParams: HexParams = {
          affs: [],
          affHover: this.affHover,
          affDeHover: this.affDeHover
        };
        params[i].push(hexParams);
      }
    }
    params = affiliates.fill(params);
    return params;
  }

  //const[this.state, setState] = useState<CanvasStatus>({ curStep: 0, affiliates: new Affiliates() });

  private affHover = (affId: number) => {
    const aff = this.state.affiliates.affiliates[affId];
    console.log(aff);
    let runInterval = window.setInterval(() => {
      setTimeout(() => {
        let nextStep = this.state.curStep < aff.Radius ? this.state.curStep + 1 : 0;
        this.state.affiliates.update(affId, this.state.curStep);
        const params = this.updateParams(this.state.affiliates)
        this.setState({ curStep: nextStep, hexParams: params });
      }, 1000);
    });
    this.setState({ runInterval: runInterval })
  }

  private affDeHover = (affId: number) => {
    window.clearInterval(this.state.runInterval);
  }
}

