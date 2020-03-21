import React, {Fragment} from 'react';
import Plot from './Plot';

const MakePlot = ({shown, dots, title}) =>
  shown ? (
    <Fragment>
      <p className="text-light">{title}</p>
      <Plot dots={dots} />
    </Fragment>
  ) : null;
export default MakePlot;
