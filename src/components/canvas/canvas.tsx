import React from 'react';
import { Affiliates } from '../../models/affiliate';
import { COLS, ROWS } from '../../models/_index';
import { Hexagon } from './hexagon';
import { HexParams } from './models';
import { CanvasRenderer } from './canvas-renderer';
import { AffContext } from '../..';

type CanvasProps = {}
type CanvasState = {
  //affiliates: Affiliates;
  //runInterval: number | undefined;
  hexParamss: HexParams[][];
  //context: AffContectContent;
}

export class Canvas extends React.Component<CanvasProps, CanvasState> {

  constructor(props: CanvasProps) {
    super(props);

    this.affiliates = new Affiliates();
    let params = CanvasRenderer.init(this.affiliates);

    this.state = {
      hexParamss: params,
    };
  }
  private affiliates: Affiliates;
  private runInterval?: number;

  useeffect() { }
  render() {
    return (
      <AffContext.Consumer>
        {({ activeAff, setActiveAff }) => (
          <div className="container">
            <div className="honeycomb ">
              <>
                {this.state.hexParamss.map((i, key) =>
                  <div className={'column'}>
                    {i.map((hexParam, index) =>
                      <Hexagon
                        affs={hexParam.affs}
                        key={key * ROWS + index}
                        affHover={(affId) => {
                          setActiveAff(affId);
                          this.affHover(affId);
                        }}
                        affDeHover={(affId) => {
                          setActiveAff(-1);
                          this.affDeHover(affId);
                        }}
                      />)}
                  </div>)}
              </>
              <div className="shadows"></div>
            </div>
          </div >)}
      </AffContext.Consumer>
    );
  }

  private affHover = (affId: number) => {
    window.clearInterval(this.runInterval);
    const aff = this.affiliates.list[affId];
    this.runInterval = window.setInterval(() => {
      CanvasRenderer.updateAff(aff);
      let paramss = CanvasRenderer.init(this.affiliates)
      paramss = CanvasRenderer.affsFill(paramss, this.affiliates.list[affId]);
      this.setState({ hexParamss: paramss });
    }, 300);
  }

  private affDeHover = (affId: number) => {
    window.clearInterval(this.runInterval);
    const aff = this.affiliates.list[affId];
    CanvasRenderer.resetAff(aff);
    let paramss = CanvasRenderer.init(this.affiliates)
    this.setState({ hexParamss: paramss });
  }
}

