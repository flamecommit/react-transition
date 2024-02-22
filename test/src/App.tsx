import { Transition } from '@shinyongjun/react-transition';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setShow(!show)}>
        Animation Toggler
      </button>
      <Transition show={show}>
        <div className="example">Animation</div>
        <div className="example">Animation2</div>
      </Transition>
      {/* <Transition name="custom" show={show} duration={1000}>
        <div className="example">Animation</div>
      </Transition> */}
    </div>
  );
}

export default App;
