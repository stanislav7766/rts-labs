import React, {useState, Fragment} from 'react';
import Form from '../../components/form';
import validate from '../../tools/validation/validate';
import MakePlot from '../../components/plot';
import ButtonGroup from '../../components/common/ButtonGroup';
import Greeting22 from '../../components/greeting/Greeting22';
import {withTransformDots} from '../../utils/withTransformDots';
import {makeSignal, calcFft} from '../../utils/mathFunctions';

const Lab22 = () => {
  const [data, setData] = useState({
    W: '',
    n: '',
    N: '',
  });
  const [errors, setErrors] = useState({});
  const [dots1, setDots1] = useState([]);
  const [dots2, setDots2] = useState([]);
  const [dots3, setDots3] = useState([]);

  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const solveEquations = () => {
    const phi = Math.random();
    const amplitude = Math.random();
    const N = Number(data.N);
    const n = Number(data.n);

    const function_y_axis = makeSignal({N, n, phi, amplitude});
    const [fftReal, fftImagine, fftFinal] = withTransformDots(calcFft, N)(function_y_axis);
    setDots1(fftReal);
    setDots2(fftImagine);
    setDots3(fftFinal);
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

  const Graph1 = <MakePlot shown={isSuccessSubmit && dots1.length > 0} dots={dots1} title="Графік fftReal" />;
  const Graph2 = <MakePlot shown={isSuccessSubmit && dots2.length > 0} dots={dots2} title="Графік fftImagine" />;
  const Graph3 = <MakePlot shown={isSuccessSubmit && dots3.length > 0} dots={dots3} title="Графік fftFinal(спектр)" />;

  return (
    <div className="landing">
      <div className="light-overlay">
        <ButtonGroup />
        <div className="container-fluid">
          <div style={{marginTop: '20vh'}} className="row">
            <Greeting22 />
            <Fragment>
              <div className="mt-5 col-10 col-sm-12 col-md-4 mx-auto">
                <Form data={data} onSubmit={onSubmit} onChange={onChange} errors={errors} />
              </div>
              <div className="mt-5 col-10 col-sm-12 mx-auto">
                <h1 className="display-5 text-light text-center">Графіки:</h1>
                {Graph1}
                {Graph2}
                {Graph3}
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lab22;
