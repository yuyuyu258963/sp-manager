import React from 'react'
import './FundsDetail.css'
import { useLocation } from 'react-router-dom';



export default function FundsDetail() {
  let location = useLocation();

  const foundID:number = Number(location.pathname.split('/').reverse()[0]);

  return (
    <div id='FundsDetail'>
        <div className='BaseData'>
          <div className='BaseDataTitle'>
            <h1 className='FundsName'>FundsName</h1>&nbsp;&nbsp;
            <span>{foundID}</span>&nbsp;&nbsp;
            <span className='FoundTips'>&nbsp;&nbsp; FoundTips &nbsp;&nbsp;</span>&nbsp;&nbsp;
            <span className='FoundRisks'>&nbsp;&nbsp; FoundRisks &nbsp;&nbsp;</span>&nbsp;&nbsp;
          <div className="ti-right"><span>加自选</span></div>
          </div>
          <div className='BaseDataContainer'>
            <div className='cartogram'>
              <div className=''></div>
            </div>
          </div>
        </div>
      </div>
  )
}



// class FundsDetail extends React.Component<IProps, IState> {

//   navigation = useNavigate();

//   componentDidMount(){
//     console.log("match",this.navigation);

// }

//   render() {
//     return (
//       <div id='FundsDetail'>
//         <div className='BaseData'>
//           <div className='BaseDataTitle'>

//             <h1>FundsName</h1>
//             <span>FoundCode</span>
//             <span>FoundTips</span>
//             <span>FoundRisks</span>
//           <div className="ti-right"><span>加自选</span></div>
//           </div>
//           <div className='BaseDataContainer'>
//             <div className='cartogram'>
//               <div className=''></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default FundsDetail