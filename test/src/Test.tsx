interface IProps {
  index: number;
}

function Test({ index }: IProps) {
  console.log(index);
  return <p className="test">test</p>;
}

export default Test;
