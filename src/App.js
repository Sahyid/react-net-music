import './assets/css/reset.css'
import KyAppHeader from './components/app-header' 
import KyAppFooter from './components/app-footer'
import KyBottomPlayer from './components/bottom-player'

import renderRoutes from '@/routes/renderRoutes.js'
import routesConfig from '@/routes/config.js' 
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  return (
    <Provider store={store}>
      <KyAppHeader/>
      {renderRoutes(routesConfig)}
      <KyAppFooter/>
      <KyBottomPlayer/>
    </Provider>
  );
}

export default App;
