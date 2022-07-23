import React from 'react';
import { Affiliates } from '../models/affiliate';
import { COLS, ROWS } from '../models/_index';
import { HexagonColumn } from './hexagon-column';
import { Hex, HexParams } from './models';

export class Canvas extends React.Component {
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
        var hexParams: HexParams = { hex: Hex.plain };
        params[i].push(hexParams);
      }
    }
    var affiliates = new Affiliates();
    params = affiliates.Fill(params);

    return (
      <div className="honeycomb ">
        <>
          {params.map((i, key) => this.renderColumn(i, key))}
        </>
        <div className="shadows"></div>
      </div>
    );
  }
  renderColumn(i: HexParams[], key: number) {
    return (
      <HexagonColumn key={key} hexeParams={i} />
    )
  }
  renderAffs() {

  }
}

