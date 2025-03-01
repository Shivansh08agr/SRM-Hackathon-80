import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.scss';
import store from './store';
import {Provider} from 'react-redux'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // <>
      //   <Route path='/' element={<Layout />}>
      //     <Route path='' element={<Home />} />
      //     <Route path='videos/:videoId' element={<Video />} />
      //   </Route>
      //   <Route path='/' element={<AuthLayout />}>
      //     <Route path='register' element={<Register />} />
      //     <Route path='login' element={<Login />} />
      //   </Route>
      // </>
    )
  );

  return (
    <Provider store = {store}>
      <RouterProvider router={router}/> 
    </Provider>
  );
}

export default App;