import { Transition } from '@shinyongjun/react-transition';
import '@shinyongjun/react-transition/css';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setShow(!show)}>
        Animation Toggler
      </button>
      <Transition show={show}>
        <div className="aa">Animation</div>
      </Transition>
    </div>
  );
}

export default App;
