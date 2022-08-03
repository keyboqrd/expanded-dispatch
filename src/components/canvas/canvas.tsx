import React, { FC, useContext, useEffect, useState } from 'react';
import { affiliates, Affiliates } from '../../models/affiliate';
import { COLS, ROWS } from '../../models/_index';
import { Hexagon } from './hexagon';
import { CanvasRenderer } from './canvas-renderer';
import { AffContext, WoContext } from '../..';



type CanvasProps = {}

export const Canvas: FC<CanvasProps> = () => {
  const [hexParamss, setHexParamss] = useState(CanvasRenderer.init(affiliates));
  const [intervalHandle, setIntervalHandle] = useState(-1);

  const { activeAff, setActiveAff } = useContext(AffContext);
  const { wo, setWo } = useContext(WoContext);


  useEffect(() => {
    if (activeAff === -1) {
      affDeHover();
    }
    else {
      affHover(activeAff);
    }
  }, [activeAff])

  useEffect(() => {

  }, [wo]);

  const affHover = (affId: number) => {
    window.clearInterval(intervalHandle);
    const aff = affiliates.list[affId];
    setIntervalHandle(window.setInterval(() => {
      CanvasRenderer.updateAff(aff);
      let paramss = CanvasRenderer.init(affiliates)
      paramss = CanvasRenderer.affsFill(paramss, affiliates.list[affId]);
      setHexParamss(paramss);
    }, 300));
  }
  const affDeHover = () => {
    window.clearInterval(intervalHandle);
    CanvasRenderer.resetAff();
    let paramss = CanvasRenderer.init(affiliates)
    setHexParamss(paramss);
  }
  const updateWo = () => { }
  return (
    <div className="container">
      <div className="honeycomb ">
        <>
          {hexParamss.map((i, key) =>
            <div className={'column'}>
              {i.map((hexParam, index) =>
                <Hexagon
                  affs={hexParam.affs}
                  col={hexParam.col}
                  row={hexParam.row}
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

