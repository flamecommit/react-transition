import { useEffect } from 'react';

function Test2() {
  useEffect(() => {
    console.log('hook');
  }, []);

  return (
    <div className="test2">
      <div>test2</div>
    </div>
  );
}

export default Test2;
