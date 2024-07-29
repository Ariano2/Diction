import Head from './components/Head';
import Search from './components/Search';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './appStore';

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Head />
        <Search />
        <Body />
      </Provider>
    </>
  );
}

export default App;
