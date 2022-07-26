import React from 'react';
import { Affiliates } from '../models/affiliate';
import { COLS, ROWS } from '../models/_index';
import { Hexagon } from './hexagon';
import { CanvasParams, CanvasStatus } from './models';
import { CanvasRenderer } from './canvas-renderer';

export class Canvas extends React.Component<CanvasParams, CanvasStatus> {
  constructor(props: CanvasParams) {
    super(props);

    let affiliates = new Affiliates();
    let params = CanvasRenderer.init();
    params = CanvasRenderer.affsInit(params, affiliates);

    this.state = {
      affiliates: affiliates,
      runInterval: undefined,
      hexParamss: params
    };
  }

  render() {
    return (
      <div className="container">
        <div className="honeycomb ">
          <>
            {this.state.hexParamss.map((i, key) =>
              <div className={'column'}>
                {i.map((hexParam, index) =>
                  <Hexagon
                    affs={hexParam.affs}
                    key={key * ROWS + index}
                    affHover={(affId) => this.affHover(affId)}
                    affDeHover={(affId) => this.affDeHover(affId)}
                  />)}
              </div>)}
          </>
          <div className="shadows"></div>
        </div>
      </div >
    );
  }

  private affHover = (affId: number) => {
    const aff = this.state.affiliates.list[affId];
    let runInterval = window.setInterval(() => {
      this.state.affiliates.update(affId)
      this.setState({ hexParamss: CanvasRenderer.affsFill(this.state.hexParamss, this.state.affiliates), affiliates: this.state.affiliates });
    }, 1000);
    this.setState({ runInterval: runInterval })
  }

  private affDeHover = (affId: number) => {
    //window.clearInterval(this.state.runInterval);
  }
}

