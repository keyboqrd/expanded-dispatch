import React from 'react';
import ReactDOM from 'react-dom/client';
import { Hexagon, HexagonColumn } from './hexagon';
import { Cell } from './models';

export class Canvas extends React.Component {
  render() {
    return (
      <div className="container">
        {this.renderColumns()}
      </div >
    );
  }

  renderColumns() {
    const hexes: Cell[][] = [
      [Cell.show, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.show, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.none, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.show, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.none, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.show, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.none, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.show, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.none, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.show, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.none, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.show, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.none, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.show, Cell.show, Cell.show, Cell.show, Cell.show, Cell.show],
      [Cell.none, Cell.show, Cell.show, Cell.none, Cell.show, Cell.wo]
    ];


    return (
      <div className="honeycomb ">
        <>
          {hexes.map((i, key) => this.renderColumn(i, key))}
        </>
        <div className="shadows"></div>
      </div>
    );
  }
  renderColumn(i: Cell[], key: number) {
    return (
      <HexagonColumn key={key} hexes={i} />
    )
  }
  renderAffs() {

  }
}

