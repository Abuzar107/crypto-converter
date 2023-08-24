import React, { useEffect, useState } from 'react'
import {Button, Card, Form, Input, Select} from 'antd'

function Converter() {

  const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';
  const defaultFirstSelectValue = "Bitcoin";
  const defaultSecondSelectValue = "Ether";

  const [cryptoList , setCryptoList] = useState([]);
  const [inputValue , setInputValue] = useState("0");
  const [firstSelect , setFirstSelect] = useState(defaultFirstSelectValue);
  const [secondSelectValue , setSecondSelectValue] = useState(defaultSecondSelectValue);
  const [result , setResult] = useState("0");

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData(){
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const data = jsonData.rates;

    const tempArray = Object.entries(data).map(item => {
      return{
        value : item[1].name,
        lable : item[1].name,
        rate : item[1].value
      }
    })

    setCryptoList(tempArray);
  }

  useEffect(() => {
    if(cryptoList.length == 0) return;

    const firstSelectRate = cryptoList.find((item) => {
      return item.value === firstSelect;
    }).rate;

    const secondSelectRate = cryptoList.find((item) => {
      return item.value === secondSelectValue
    }).rate;

    const resultValue = (inputValue * secondSelectRate)/firstSelectRate;
    setResult(resultValue);

  }, [inputValue, firstSelect, secondSelectValue])

  return (
    <div className='container'>
      <Card className='crypto-card' title={<h1>crypto-converter</h1>}>
          <Form>
            <Form.Item>
              <Input onChange={(event) => setInputValue(event.target.value)}/>
            </Form.Item>
          </Form>

          <div className='select-box'>
            <Select defaultValue={defaultFirstSelectValue} style={{width : '120px'}} options={cryptoList} onChange={(value) => setFirstSelect(value)}/>
            <Select defaultValue={defaultSecondSelectValue} style={{width : '120px'}} options={cryptoList} onChange={(value) => setSecondSelectValue(value)}/>
          </div>
          <p>{inputValue} {firstSelect} = {result} {secondSelectValue}</p>
      </Card>
    </div>
  )
}

export default Converter