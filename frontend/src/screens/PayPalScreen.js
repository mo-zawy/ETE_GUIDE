import React , {useRef , useEffect} from 'react'

const PayPalScreen = () => {

    const paypal = useRef()
useEffect(()=>{
    window.paypal.Buttons({
        createOrder:(data,actions,error)=>{
          return actions.order.create({
            intent:"CAPTURE",
            purchase_units:[
              {
                description:"table",
                reference_id: "YOURID",
                amount:{
                    currency_code:"CAD",
                  value:300.00
                }
              }
            ]
          })
        },
        onApprove:async (data,actions) =>{
          const ordera = await actions.order.capture()
          console.log(ordera)
        },
        onError:(err)=>{
          console.log(err)
        }
      }).render(paypal.current)

},[])
    
    
    return (
        <div ref={paypal}>
            
        </div>
    )
}

export default PayPalScreen
