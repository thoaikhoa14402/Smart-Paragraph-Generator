  import React, { useState } from 'react';
import axios from 'axios';
import styles from "./App.module.css";

function App() {

  const [data, setData] = useState({ input: '', max_length: 0 });
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/generate', { data: {
      input: data.input,
      max_length: data.max_length
      } }, {
        headers: {
          contentType: 'application/json'
        }
      })
    .then((res) => {
      setResponse(res.data.message)
      setIsLoading(false);
    })
    .catch((err) => console.log(err));
  };

  const handleChange = (e) => { 
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
      setResponse('');
      setIsLoading(true);
  }

  return (
    <>
      <div className={styles["title"]}>
        <h1>Smart Paragraph Generator</h1>
      </div>
      <span className ={isLoading ? `${styles["loader"]}` : `${styles["loader"]} ${styles["loader-hidden"]}`}/>
      <div className={styles["main-content"]}>
        <form onSubmit={handleSubmit} className = {styles["generate-form"]}>
          <div className={styles["paragraph"]}>
            <label for= "paragraph">Type some text here (*)</label>
            <textarea name='input' onChange={handleChange} placeholder='Paragraph' className = {styles["paragraph"]}></textarea>
          </div>
          <div className={styles["generate"]}>
            <input type='number' name='max_length' onChange={handleChange} placeholder='Max length' className = {styles["paragraph-length"]}/>
            <button type='submit' className = {styles["generate-btn"]} onClick = {handleClick}>Generate</button>
          </div>
        </form>
        {/* response */}
        {/* <div>{response}</div> */}
        {response ? <div className={styles["result"]}>
          <div className={styles["res-title"]}>Review your results (*)</div>
          <div className={styles["response"]}>{response}</div> 
        </div> : <div className={styles["result"]}>
          <div className={styles["res-title"]}>Review your results (*)</div>
          <textarea name='input' onChange={handleChange} placeholder='Paragraph' className = {styles["response-paragraph"]}></textarea>
        </div>
        }
      </div>
    </>
  );
}

export default App;
