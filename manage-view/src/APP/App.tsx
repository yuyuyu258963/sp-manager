import React from 'react';
import Header from './Header/Header';
import MainContainer from './MainContainer/MainContainer';
// import Footer from './Footer/Footer'

interface IProps {

}

interface IState {

}

class App extends React.Component<IProps, IState>{
  render() {
    return (
      <div id="App">
        <MainWrap />
        {/* <Footer/> */}
      </div>
    )
  }
}

function MainWrap() {
  return (
    <>
      <Header/>
        <MainContainer/>
    </>
  )
}

export default App;