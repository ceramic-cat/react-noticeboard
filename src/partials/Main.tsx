import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

interface MainProps {
  stateAndSetter : [any, Function]
}

export default function Main({stateAndSetter} : MainProps) {

  return <main className="mt-5">
    <Container className="mt-5 mb-4">
      <Outlet context={stateAndSetter} />
    </Container>
  </main>;
}