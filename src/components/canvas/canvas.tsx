import React, { FC, useContext, useEffect, useState } from 'react';
import { affiliates, Affiliates } from '../../models/affiliate';
import { COLS, ROWS } from '../../models/_index';
import { Hexagon } from './hexagon';
import { CanvasState, HexParams } from './models';
import { CanvasRenderer } from './canvas-renderer';
import { AffContext } from '../..';

type CanvasProps = {}

export const Canvas: FC<CanvasProps> = () => {
  const [hexParamss, setHexParamss] = useState(CanvasRenderer.init(affiliates));
  const [intervalHandle, setIntervalHandle] = useState(-1);
  const [canvasState, setCanvasState] = useState(CanvasState.default);
  const { activeAff, setActiveAff } = useContext(AffContext);
  useEffect(() => {
    if (activeAff === -1) {
      affDeHover();
    }
    else {
      affHover(activeAff);
    }
  }, [activeAff])

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

  return (
    <div className="container">
      <div className="honeycomb ">
        <>
          {hexParamss.map((i, key) =>
            <div className={'column'}>
              {i.map((hexParam, index) =>
                <Hexagon
                  affs={hexParam.affs}
                  key={key * ROWS + index}
                  affHover={(affId) => setActiveAff(affId)}
                  affDeHover={(affId) => setActiveAff(-1)}
                />)}
            </div>)}
        </>
        <div className="shadows"></div>
      </div>
    </div >)
}

