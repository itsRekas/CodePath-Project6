import React from 'react'

const History = ({history, setHistory}) => {

    const deleteRecord= (index)=>{
        setHistory(history.filter((_,i)=>{
            return i!==index;
        }));
    }
  return (
    <div>
        <div className='history'>
            <h2>History</h2>
            <p>Number of stuff: {history.length}</p>
            <div className='catalog hist'>
                {history.length > 0 ? (
                    history.map((ele, index) => (
                    <div key={index}>
                        <h3>{ele.title}</h3>
                        {ele.media_type === 'image' ? (
                        <img src={ele.url} alt={ele.title} />
                        ) : (
                        <iframe src={ele.url} title={ele.title}></iframe>
                        )}
                        <div className='histcat'>
                            <p>{ele.date}</p>
                            <button onClick={()=>deleteRecord(index)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M300.62-128q-38.85 0-64.74-25.88Q210-179.77 210-218.62V-724h-40v-66h188v-38.77h246V-790h188v66h-40v505.38q0 
                            38.35-26.14 64.48Q699.73-128 661.38-128H300.62ZM686-724H276v505.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h360.76q9.24 0 
                            16.93-7.69 7.69-7.69 7.69-16.93V-724ZM371.31-275h66v-368h-66v368Zm153.38 0h66v-368h-66v368ZM276-724v530-530Z"/></svg></button>
                        </div>
                    </div>
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default History