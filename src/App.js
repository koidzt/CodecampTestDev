import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [answer1, setAnswer1] = useState([]);
  const [answer2, setAnswer2] = useState({});
  const [answer3, setAnswer3] = useState({});

  useEffect(() => {
    axios
      .get(`https://oclmyk0vd0.execute-api.us-east-1.amazonaws.com/codecamp7/q1?token=koi`)
      .then((res) => {
        const data = res.data.sort((a, b) => a - b);
        const filterData = data.filter((number) => number >= 100 && number <= 500);
        let result = [];
        for (let i = 0; i < filterData.length; i++) {
          if (filterData[i] % 3 === 0 || filterData[i] % 5 === 0) {
            result.push(filterData[i]);
          }
        }
        const answer = [...new Set(result)];
        setAnswer1(answer);
      })
      .catch((err) => {});

    axios
      .get(`https://oclmyk0vd0.execute-api.us-east-1.amazonaws.com/codecamp7/q2?token=koi`)
      .then((res) => {
        const east = res.data
          .filter((order) => order.location === 'East')
          .reduce((acc, order) => {
            return acc + order.grandTotal;
          }, 0);

        const west = res.data
          .filter((order) => order.location === 'West')
          .reduce((acc, order) => {
            return acc + order.grandTotal;
          }, 0);

        const south = res.data
          .filter((order) => order.location === 'South')
          .reduce((acc, order) => {
            return acc + order.grandTotal;
          }, 0);

        const central = res.data
          .filter((order) => order.location === 'Central')
          .reduce((acc, order) => {
            return acc + order.grandTotal;
          }, 0);

        const north = res.data
          .filter((order) => order.location === 'North')
          .reduce((acc, order) => {
            return acc + order.grandTotal;
          }, 0);

        setAnswer2({ east, west, south, central, north });
      })
      .catch((err) => {});

    axios
      .get(`https://oclmyk0vd0.execute-api.us-east-1.amazonaws.com/codecamp7/q3?token=koi`)
      .then((res) => {
        const orders = res.data.filter((order) => order.member !== null);

        console.log('Question3', orders);

        let names = [];
        for (let i = 0; i < orders.length; i++) {
          names.push(orders[i].member.name);
        }
        const memberNames = [...new Set(names)];

        let members = {};
        for (let i = 0; i < memberNames.length; i++) {
          members[memberNames[i]] = orders
            .filter((order) => order.member.name === memberNames[i])
            .reduce((acc, order) => {
              return acc + order.grandTotal;
            }, 0);
        }
        setAnswer3(members);
      })
      .catch((err) => {});
  }, []);

  console.log('Answer1', answer1);
  console.log('Answer2', answer2);
  console.log('Answer3', answer3);

  return (
    <div className="">
      <div className="question1" style={{ padding: '5ex' }}>
        <h1>Question 1</h1>
        <ul>
          <h4>โจยท์ ดึงข้อมูลชุดตัวเลขจาก API : q1 แล้ว process ดังนี้</h4>
          <li>เรียงลำดับ จากน้อยไปมาก</li>
          <li>เอาตัวเลขเฉพาะ between 100 - 500 (รวมตัวเลข 100, 500ด้วย)</li>
          <li>เอาตัวเลขเฉพาะ หารด้วย แม่3 หรือ แม่5 ลงตัว</li>
          <li>แสดงเฉพาะเลขที่ unique (ไม่ต้องแสดงเลขซ้ำ เช่น 9 สี่ตัว ให้แสดงแค่ 9ตัวเดียว)</li>
        </ul>
        <h3>Answer</h3>
        <span style={{ width: '500px' }}>{JSON.stringify(answer1)}</span>
      </div>
      <div className="question2" style={{ padding: '5ex' }}>
        <h1>Question 2</h1>
        <ul>
          <h4>โจยท์ ดึงข้อมูลธุรกรรมการขาย API : q2 แล้ว process ดังนี้</h4>
          <li>รวมยอดขายของแต่ละภาค location</li>
        </ul>
        <h3>Answer</h3>
        <div>{JSON.stringify(answer2)}</div>
      </div>
      <div className="question3" style={{ padding: '5ex' }}>
        <h1>Question 3</h1>
        <ul>
          <h4>โจยท์ ดึงข้อมูลธุรกรรมการขาย API : q3 แล้ว process ดังนี้ (ข้อมูลโครงสร้างเดียวกับข้อ2)</h4>
          <li>รวมยอดขายของสมาชิกแต่ละคนโดยชื่อ member.name</li>
        </ul>
        <h3>Answer</h3>
        <div>{JSON.stringify(answer3)}</div>
      </div>
    </div>
  );
}

export default App;
