import { Transition } from '@shinyongjun/react-transition';
import { useState } from 'react';
import Test from './Test';
import Test2 from './Test2';

function App() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);

  return (
    <div>
      <div>
        <button type="button" onClick={() => setShow(!show)}>
          Animation Toggler 1
        </button>
        <Transition show={show}>
          <div className="example">Animation 1</div>
        </Transition>
      </div>
      <div>
        <button type="button" onClick={() => setShow2(!show2)}>
          Animation Toggler 2
        </button>
        <Transition show={show2} name="custom">
          <div className="example">Animation 2</div>
        </Transition>
      </div>
      <div>
        <button type="button" onClick={() => setShow3(!show3)}>
          Animation Toggler 3
        </button>
        <Transition show={show3} name="delay">
          <div className="example">Animation 3</div>
        </Transition>
      </div>
      <div>
        <button type="button" onClick={() => setShow4(!show4)}>
          Animation Toggler 4
        </button>
        <Transition show={show4} name="custom">
          {Test()}
        </Transition>
      </div>
      <div>
        <button type="button" onClick={() => setShow4(!show4)}>
          Animation Toggler 4
        </button>
        <Transition show={show4} name="custom" className="ss">
          <Test />
        </Transition>
      </div>
      <div>
        <button type="button" onClick={() => setShow4(!show4)}>
          Animation Toggler 4
        </button>
        <Transition show={show4} name="custom2">
          <>
            <Test2 />
          </>
        </Transition>
      </div>
    </div>
  );
}

export default App;
