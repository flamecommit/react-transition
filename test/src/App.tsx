import { Transition } from '@shinyongjun/react-transition';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setShow(!show)}>
        Animation Toggler
      </button>
      <Transition show={show} duration={300}>
        <div className="example">Animation</div>
      </Transition>
      <Transition name="custom" show={show} duration={300}>
        <div className="example">Animation</div>
      </Transition>
    </div>
  );
}

export default App;
