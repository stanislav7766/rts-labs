import React, {useState, Fragment} from 'react';
import Form from '../../components/form';
import validate from '../../tools/validation/validate';
import {makeSignal, calcExpected, calcDispersion} from '../../utils/mathFunctions';
import {withTime} from '../../utils/measureTime';
import ButtonGroup from '../../components/common/ButtonGroup';
import Greeting11 from '../../components/greeting/Greeting11';
import {transformDots} from '../../utils/transformDots';
import MakePlot from '../../components/plot';

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

const calcTask1 = n => {
  const N = Number(((1500 - 256) / 31).toFixed(0));
  const argument_x_N = [
    ...Array(N)
      .fill()
      .map((_, i) => 256 + i * 31),
  ];

  const function_y_D = argument_x_N.map(_ => {
    const phi = Math.random();
    const amplitude = Math.random();
    const function_y_axis = makeSignal({N, n, phi, amplitude});
    const [, {dispersionValue}] = calcMD({function_y_axis, N});
    return dispersionValue;
  });

  return transformDots(argument_x_N, function_y_D);
};

const Lab11 = () => {
  const [data, setData] = useState({
    W: '',
    n: '',
    N: '',
  });
  const [out, setOut] = useState('');
  const [errors, setErrors] = useState({});
  const [dots, setDots] = useState([]);
  const [dots1, setDots1] = useState([]);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const solveEquations = () => {
    const phi = Math.random();
    const amplitude = Math.random();
    const N = Number(data.N);
    const n = Number(data.n);

    const function_y_axis = makeSignal({N, n, phi, amplitude});
    const [{expectedValue, expectedTime}, {dispersionValue, dispersionTime}, MDdots] = calcMD({function_y_axis, N});

    const NDdots = calcTask1(n);
    setOut(`Мат. очікування: ${expectedValue}, Час обчислення: ${expectedTime};
Дисперсія: ${dispersionValue}, Час обчислення: ${dispersionTime}`);
    setDots(MDdots);
    setDots1(NDdots);
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
    isSuccessSubmit && dots.length > 0
      ? out.split(';').map((el, i) => (
          <span key={i}>
            {el}
            <br />
          </span>
        ))
      : null;
  const Graph = <MakePlot shown={isSuccessSubmit && dots.length > 0} dots={dots} title="Графік залежностей x(t) и N" />;
  const Graph1 = <MakePlot shown={isSuccessSubmit && dots1.length > 0} dots={dots1} title="Графік залежностей D и N" />;

  return (
    <div className="landing">
      <div className="light-overlay">
        <ButtonGroup />
        <div className="container-fluid">
          <div style={{marginTop: '20vh'}} className="row">
            <Greeting11 />
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
                {Graph}
                {Graph1}
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lab11;
