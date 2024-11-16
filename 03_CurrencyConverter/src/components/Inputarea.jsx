/* eslint-disable react/prop-types */
import {useId} from 'react'


function Inputarea({
    label,
    amount=0,
    onamount,
    oncurrency,
    currencylist=[],
    selectCurrency="usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {

    const id = useId()
    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label 
                htmlFor={id}
                className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={id}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onamount && onamount(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e) => oncurrency && oncurrency(e.target.value)}
                    disabled={currencyDisable}
                    >
                    {currencylist.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))} 
                </select>
            </div>
        </div>
    );
}

export default Inputarea;
