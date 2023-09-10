import MainLayout from '../layouts/main';

const Home = (props: { name: string }) => (
  <MainLayout>
    <h1>Hello {props.name}</h1>
  </MainLayout>
);

export default Home;
