
export default function Modal( {expense={}, setCashFlow=()=>{}, setShowDetail=()=>{}} ) {

    const handleDelete = () =>{
        setCashFlow(prevExpenses => {
            const newExpenses = prevExpenses.filter(prevExpense => prevExpense.title!== expense.title)
            return newExpenses
        })

        setShowDetail(false)
    }    

    const handleClose =()=>{
        setShowDetail(false)
    }
    
    return(
        <div className='parent-modal'>
            <div className='modal-content'>
                <h3>{expense?.title}</h3>
                <ul className='modal-content-details'>
                    <li><p>Tipo: </p><p>{expense?.type}</p></li>
                    <li><p>Cantidad: </p><p>{expense?.mount}</p></li>
                </ul>
                <div className='buttons'>
                    <button className='btn btn-trash btn-modal' onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                    <button className='btn btn-aceptar btn-modal' onClick={handleClose}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}