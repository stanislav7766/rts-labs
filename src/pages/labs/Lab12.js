import React, {useState, Fragment} from 'react';
import Form from '../../components/form';
import validate from '../../tools/validation/validate';
import MakePlot from '../../components/plot';
import {
  makeSignal,
  calcExpected,
  calcDispersion,
  calcCorrelation,
  correlationStabilizer,
  makeZero,
} from '../../utils/mathFunctions';
import {withTime} from '../../utils/measureTime';
import ButtonGroup from '../../components/common/ButtonGroup';
import {transformDots} from '../../utils/transformDots';
import Greeting12 from '../../components/greeting/Greeting12';

const calcMD = ({function_y_axis, N}) => {
  const argument_x_axis = [...Array(N).keys()];

  const [expectedValue, expectedTime] = withTime(calcExpected)(function_y_axis, N);

  const [dispersionValue, dispersionTime] = withTime(calcDispersion)(expectedValue, function_y_axis, N);

  return [
    {expectedTime, expectedValue},
    {dispersionTime, dispersionValue},
    transformDots(argument_x_axis, function_y_axis),
  ];
};

const calcMDZ1 = ({function_z1_axis, N}) => {
  const argument_x_axis = [...Array(N).keys()];

  const [expectedValueZ1, expectedTime] = withTime(calcExpected)(function_z1_axis, N);

  const [dispersionValue, dispersionTime] = withTime(calcDispersion)(expectedValueZ1, function_z1_axis, N);

  return [
    {expectedTime, expectedValueZ1},
    {dispersionTime, dispersionValue},
    transformDots(argument_x_axis, function_z1_axis),
  ];
};

const calcCorrelationXX = (halfN, function_y_axis, expectedValue) => {
  const argument_x_half_axis = [...Array(halfN).keys()];

  const function_y_half_axis = function_y_axis.slice(0, halfN);
  const function_y_tau_axis = Array(halfN)
    .fill()
    .map((_, i) => function_y_axis[i + halfN]);

  const [correlationValue, correlationTime, arrCorr] = withTime(calcCorrelation)(
    function_y_half_axis,
    function_y_tau_axis,
    {mx: expectedValue, my: expectedValue},
    halfN,
  );

  const stabilizedArrCorr = correlationStabilizer(arrCorr);

  return [{correlationValue, correlationTime}, transformDots(argument_x_half_axis, stabilizedArrCorr)];
};
const calcCorrelationXY = (halfN, function_y_axis, expectedValueX) => {
  const [{expectedValue}] = calcMD({function_y_axis, N: halfN * 2});

  const argument_x_half_axis = [...Array(halfN).keys()];

  const function_y_half_axis = function_y_axis.slice(0, halfN);
  const function_y_tau_axis = Array(halfN)
    .fill()
    .map((_, i) => function_y_axis[i + halfN]);

  const [correlationXYValue, correlationXYTime, arrCorr] = withTime(calcCorrelation)(
    function_y_half_axis,
    function_y_tau_axis,
    {mx: expectedValueX, my: expectedValue},
    halfN,
  );

  const stabilizedArrCorr = correlationStabilizer(arrCorr);

  return [{correlationXYValue, correlationXYTime}, transformDots(argument_x_half_axis, stabilizedArrCorr)];
};

const calcCorrelationXZ1 = (halfN, function_z1_axis, expectedValueX) => {
  const [{expectedValue}] = calcMD({function_y_axis: function_z1_axis, N: halfN * 2});

  const argument_x_half_axis = [...Array(halfN).keys()];

  const function_z1_half_axis = function_z1_axis.slice(0, halfN);
  const function_z1_tau_axis = Array(halfN)
    .fill()
    .map((_, i) => function_z1_axis[i + halfN]);

  const [correlationXZ1Value, correlationXZ1Time, arrCorr] = withTime(calcCorrelation)(
    function_z1_half_axis,
    function_z1_tau_axis,
    {mx: expectedValueX, my: expectedValue},
    halfN,
  );

  const stabilizedArrCorr = correlationStabilizer(arrCorr);

  return [{correlationXZ1Value, correlationXZ1Time}, transformDots(argument_x_half_axis, stabilizedArrCorr)];
};

const Lab12 = () => {
  const [data, setData] = useState({
    W: '',
    n: '',
    N: '',
  });
  const [out, setOut] = useState('');
  const [errors, setErrors] = useState({});
  const [dots1, setDots1] = useState([]);
  const [dots2, setDots2] = useState([]);
  const [dots3, setDots3] = useState([]);
  const [dots4, setDots4] = useState([]);
  const [dots5, setDots5] = useState([]);

  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const solveEquations = () => {
    const phi = Math.random();
    const amplitude = Math.random();
    const N = Number(data.N);
    const n = Number(data.n);

    const function_y_axis = makeSignal({N, n, phi, amplitude});
    const [{expectedValue, expectedTime}, {dispersionValue, dispersionTime}] = calcMD({function_y_axis, N});

    const [{correlationValue, correlationTime}, dotsCorrelation] = calcCorrelationXX(
      N / 2,
      function_y_axis,
      expectedValue,
    );
    const [{correlationXYValue, correlationXYTime}, XYdotsCorrelation] = calcCorrelationXY(
      N / 2,
      makeSignal({N, n, phi: Math.random(), amplitude: Math.random()}),
      expectedValue,
    );

    setOut(`Мат. очікування: ${expectedValue}, Час обчислення: ${expectedTime};
Дисперсія: ${dispersionValue}, Час обчислення: ${dispersionTime};Автокореляція: ${correlationValue}, Час обчислення: ${correlationTime};Кореляція: ${correlationXYValue}, Час обчислення: ${correlationXYTime}`);
    setDots1(dotsCorrelation);
    setDots2(XYdotsCorrelation);
    const function_z1_axis = makeZero(1, makeSignal({N, n, phi: Math.random(), amplitude: Math.random()}));

    const function_z2_axis = makeZero(0, makeSignal({N, n, phi: Math.random(), amplitude: Math.random()}));

    const [, XZ1dotsCorrelation] = calcCorrelationXZ1(N / 2, function_z1_axis, expectedValue);

    const [, XZ2dotsCorrelation] = calcCorrelationXZ1(N / 2, function_z2_axis, expectedValue);
    const [{expectedValueZ1}] = calcMDZ1({function_z1_axis, N});
    const [, Z1Z2dotsCorrelation] = calcCorrelationXZ1(N / 2, function_z2_axis, expectedValueZ1);

    setDots3(XZ1dotsCorrelation);
    setDots4(XZ2dotsCorrelation);
    setDots5(Z1Z2dotsCorrelation);
  };

  const onChange = e => setData({...data, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    const {errors, isValid} = validate(data);
    if (!isValid) {
      setErrors(errors);
      setIsSuccessSubmit(false);
    } else {
      setErrors({});
      setIsSuccessSubmit(true);
      solveEquations();
    }
  };

  const Properties =
    isSuccessSubmit && dots2.length > 0
      ? out.split(';').map((el, i) => (
          <span key={i}>
            {el}
            <br />
          </span>
        ))
      : null;

  const Graph1 = (
    <MakePlot shown={isSuccessSubmit && dots1.length > 0} dots={dots1} title="Графік залежностей Rxx и N/2" />
  );

  const Graph2 = (
    <MakePlot shown={isSuccessSubmit && dots2.length > 0} dots={dots2} title="Графік залежностей Rxy и N/2" />
  );
  const Graph3 = (
    <MakePlot shown={isSuccessSubmit && dots3.length > 0} dots={dots3} title="Графік залежностей RxZ1 и N/2" />
  );
  const Graph4 = (
    <MakePlot shown={isSuccessSubmit && dots4.length > 0} dots={dots4} title="Графік залежностей RxZ2 и N/2" />
  );
  const Graph5 = (
    <MakePlot shown={isSuccessSubmit && dots5.length > 0} dots={dots5} title="Графік залежностей RZ1Z2 и N/2" />
  );

  return (
    <div className="landing">
      <div className="light-overlay">
        <ButtonGroup />
        <div className="container-fluid">
          <div style={{marginTop: '20vh'}} className="row">
            <Greeting12 />
            <Fragment>
              <div className="mt-5 col-10 col-sm-12 col-md-4 mx-auto">
                <Form data={data} onSubmit={onSubmit} onChange={onChange} errors={errors} />
                {isSuccessSubmit && (
                  <small className="form-text text-white">
                    <div className="mb-1"> Характеристики сигналів:</div>
                    <br /> {Properties}
                  </small>
                )}
              </div>
              <div className="mt-5 col-10 col-sm-12 mx-auto">
                <h1 className="display-5 text-light text-center">Графіки:</h1>
                {Graph1}
                {Graph2}
                {Graph3}
                {Graph4}
                {Graph5}
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lab12;
