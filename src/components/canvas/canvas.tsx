import React, { FC, useContext, useEffect, useState } from 'react';
import { affiliates, Affiliates } from '../../models/affiliate';
import { COLS, ROWS } from '../../models/_index';
import { Hexagon } from './hexagon';
import { CanvasCalculator } from './canvas-calculator';
import { AffContext, WoContext } from '../..';



type CanvasProps = {}

export const Canvas: FC<CanvasProps> = () => {
  const [hexParamss, setHexParamss] = useState(CanvasCalculator.init(affiliates));
  const [intervalHandle, setIntervalHandle] = useState(-1);

  const { activeAff, setActiveAff } = useContext(AffContext);
  const { wo, setWo } = useContext(WoContext);


  useEffect(() => {
    if (activeAff === -1) {
      clearAnim();
    }
    else {
      startAnim();
    }
  }, [activeAff])

  useEffect(() => {
    updateWo();

  }, [wo]);

  const startAnim = () => {
    window.clearInterval(intervalHandle);
    setIntervalHandle(window.setInterval(() => {
      let paramss = CanvasCalculator.Calculate(affiliates, activeAff, wo)
      setHexParamss(paramss);
    }, 150));
  }
  const clearAnim = () => {
    window.clearInterval(intervalHandle);
    let paramss = CanvasCalculator.Calculate(affiliates, -1, wo);
    setHexParamss(paramss);
  }

  const updateWo = () => {
    let paramss = CanvasCalculator.Calculate(affiliates, activeAff, wo);
    setHexParamss(paramss)
  }
  return (
    <div className="container">
      <div className="honeycomb ">
        <>
          {hexParamss.map((i, key) =>
            <div className={'column'}>
              {i.map((hexParam, index) =>
                <Hexagon
                  aff={hexParam.aff}
                  col={hexParam.col}
                  row={hexParam.row}
                  trade={hexParam.trade}
                  key={`${hexParam.col}.${hexParam.row}`}
                  setAff={(affId) => setActiveAff(affId)}
                  unsetAff={(affId) => setActiveAff(-1)}
                  updateWo={updateWo}
                />)}
            </div>)}
        </>
        <div className="shadows"></div>
      </div>
    </div >)
}

