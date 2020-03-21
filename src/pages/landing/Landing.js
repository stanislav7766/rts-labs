import React from 'react';
import ButtonGroup from '../../components/common/ButtonGroup';
import MainGreeting from '../../components/greeting/MainGreeting';

import './Landing.css';

const Landing = ({location}) => {
  const isRoot = location && location.pathname === '/';
  return isRoot ? (
    <div className="landing">
      <div className="light-overlay">
        <div className="container-fluid">
          <div
            style={{
              marginTop: '40vh',
            }}
            className="row"
          >
            <MainGreeting />
            <ButtonGroup />
          </div>
          <div className="row">
            <div className="mt-5 mx-auto text-center text-light text-lead">
              Варіант - 24 <br />
              у формах вказуйте наступні дані(або за іншим варіантом):
              <br />
              W - 2100
              <br />
              n - 6<br />
              N - 256
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default Landing;
