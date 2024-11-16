import { useState } from 'react'
import Inputarea from './components/Inputarea'
import usecurrency from './hooks/usecurrency'

function App() {

  const [amount,setAmount]=useState(0)
  const [fromCurrency,setFromCurrency]=useState('inr')
  const [toCurrency,setToCurrency]=useState('usd')
  const [convertedAmount,setConvertedAmount]=useState(0)


  const currencyinfo = usecurrency(fromCurrency)
  const option=Object.keys(currencyinfo)
  const swap=()=>{
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    convert();
  }
  const convert=()=>{
    setConvertedAmount(amount*currencyinfo[toCurrency])
  }
  return (
    <>
     <div 
            className="w-full h-screen flex flex-wrap justify-center items-center bg-gradient-to-r from-black to-blue-950">
     <h1 className='text-5xl text-center text-slate-300 -m-4 -my-9'>Currency Converter</h1>
            <div className="w-full -my-9">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                           convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <Inputarea
                                label="From"
                                amount={amount}
                                onamount={(amount) => setAmount(amount)}       
                                oncurrency={(currency) => setFromCurrency(currency)}  
                                currencylist={option}                          
                                selectCurrency={fromCurrency}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <Inputarea
                                label="To"
                                amount={convertedAmount}
                                oncurrency={(currency) => setToCurrency(currency)}
                                currencylist={option}
                                selectCurrency={toCurrency}
                                amountDisable={true} 
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()} 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default App
