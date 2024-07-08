import { Header } from './Header';
import { Pages } from './Pages';
import { SeeMore } from './See-more';
import { WhoWeAre } from './Who-we-are';

export const Home = () => {
  return (
    <div>
      <Header />

      <WhoWeAre />

      <Pages />

      <SeeMore />
    </div>
  );
};

export default Home;