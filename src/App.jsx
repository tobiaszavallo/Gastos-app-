import { useEffect, useRef, useState } from 'react';
import './App.css';
import Modal from './Components/Modal';

function App() {
  const [title, setTitle] = useState('');
  const [mount, setMount] = useState('');
  const [cashFlow, setCashFlow] = useState([]);
  const [money, setMoney] = useState('0');
  const [showDetail, setShowDetail] = useState(false);
  const detailRef = useRef();

  const handleChangeTitle = e => {
    setTitle(e.target.value)
  }
  const handleChangeMount = e => {
    if ( e.target.value === '' || e.target.value === 0 || mount === 0 ) {
      setMount(''); 
    } else {
      setMount(Number(e.target.value))
    } 
  }

  const addEntry = () => {
    if( mount !== '' && mount !== 0 && title !== '' ){
      setCashFlow(prevExpenses => {
        return [...prevExpenses, { title: title, type:'ingreso', mount: mount}]
      })
      setTitle('');
      setMount('');
    }
  }

  const addExpense = () => {
    if( mount !== '' && mount != undefined && mount !== 0 && title !== '' ){
      setCashFlow(prevExpenses => {
        return [...prevExpenses, { title: title, type:'gasto', mount: mount}]
      })
      setTitle('');
      setMount('');
    }
  }

  const handleDetail = (e, expense) => {
    detailRef.current = expense
    setShowDetail(true)
  }

  useEffect(() => {
    const cashFlowLocal = localStorage.getItem('cashFlow')
    setCashFlow(JSON.parse(cashFlowLocal) || [])
  },[setCashFlow])

  useEffect(() => {
    setMoney('0')
    cashFlow.map(expense => {
      expense.type ==='ingreso'
        ?  setMoney(prevMoney => String(Number(prevMoney) + Number(expense.mount)))
        : expense.type === 'gasto' 
          ? setMoney(prevMoney => String(Number(prevMoney) - Number(expense.mount)))
          :null
    })
  }, [setMoney,cashFlow])

  useEffect(() => (
    
     localStorage.setItem('cashFlow', JSON.stringify(cashFlow))
    
  ), [cashFlow])

  return (
    <div className="App">
      <header className="App-header">
        <h2>Gestor de gastos</h2>
        <p>Cartera Pricipal</p>
      </header>

      <div className='saldo'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
           d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
          />
        </svg>
        <p className={Number(money) < 0 ? 'red': ''}>{money ? Number(money) : '0'}$</p>
      </div>
      {
        showDetail 
        ? <Modal expense={detailRef.current}  
            setCashFlow={setCashFlow}
            setShowDetail={setShowDetail}
          />
        : null 
      } 

      {
        cashFlow.length !== 0
        ? <h3>Historial</h3>
        : null
      }
      <div className='historial'>  
        {
          cashFlow.map((expense, index) => {
            return(
              <p className='historial-item' key={index} onClick={ e => handleDetail(e, expense)}>
                {expense.title}
                <span className={expense.type}>${expense.mount}</span>
              </p>
            )
          })
        }
      </div>

      <h3>Nueva entrada</h3>
      <form className='entrada'>

        <input  type='text' 
          placeholder='Introduce un concepto' 
          value={title} 
          onChange={handleChangeTitle}
        />

        <input  type='number' 
          placeholder='Introduce una cantidad' 
          min={1}
          value={mount}
          onChange={handleChangeMount}
        />

        <div className='buttons'>
          <button type='button' className='btn blue' onClick={addEntry}>Añadir ingreso</button>
          <button type='button' className='btn violet' onClick={addExpense}>Añadir gasto</button>
        </div>
      </form>
    </div>
  )
}

export default App
