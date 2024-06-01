import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "./time-investment-Recovered.png";
import Test from "./test";
import { Outlet, Link } from "react-router-dom";

function Form() {
  const [resFromAxios, setResFromAxios] = useState([
    "Hello Buddy!, Welcome to investment planner. Please Fill the above form to get investment plans based on your salary and investment Amount. Feel free to ask investment plans 😃.",
  ]);

  const [data, setData] = useState({
    salary: 0,
    expenses: 0,
    investment: 0,
    age: 0,
    kids: 0,
    risk: "Select",
    additionalInformation: "",
  });

  const inputDetails = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [question, setQuestion] = useState("");
  const questionPrompt = `Salary : ${data.salary}, Expenses : ${data.expenses}, Investment : ${data.investment}, Risk : ${data.risk} `;
  const formDetails = (e) => {
    e.preventDefault();
    console.log("Data:", data);
    setQuestion(questionPrompt);
    const prompt=`I am a salaried individual with a monthly income of Rs. ${data.salary} staying in India. I have a ${data.risk} risk tolerance and prioritize potential for safe returns. I understand that this comes with some risk.
    Considering my goals and risk tolerance, please suggest a detailed investment strategy aligned with my risk profile.
    I am open to exploring various options to achieve my desired return potential.
    For the suggested strategy, please provide the following information:
    Overall asset allocation:** Breakdown of how the invested amount would be distributed across different asset classes with specific percentages for each.
    Specific investment options:** Examples of specific assets within each category that could be considered, focusing on diverse options avoiding vague suggestions and also don't be constrained to stocks and funds, keep it diverse. Give at least 6 different options.
    Expected risk-return profile:** A detailed description of the potential risks associated with each investment option, including factors like volatility, liquidity, and market sensitivity, along with the potential return expectations.
    `
    // const jsonData={"prompt":prompt}
    // console.log(jsonData)
    axios.post("https://05e3-35-197-129-71.ngrok-free.app/model", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt
        })
      })
      .then((res) => {
        //for storing previous responses
        //setResFromAxios([...resFromAxios,...res.data.split("\n")]), console.log(res);
        //for not storing previous responses
        setResFromAxios(res.data.split("\n"));
      });
  };

  return (
    <>
      <div className="title">
        <h1
          style={{
            fontFamily: "Anditha",
            padding: "1rem",
            // textDecorationLine: "underline",
            // textDecorationColor: "pink",
          }}
        >
          INVESTMENT <span>PLANNER</span>
        </h1>
      </div>
      <div className="container">
        <div className="left">
          <img
            src={image}
            alt="did you get the image"
            style={{ height: "500px" }}
          />
        </div>

        <div className="right">
          <form className="form" onSubmit={formDetails}>
            <label>Enter your salary : </label>
            <br></br>
            <input
              className="inputbox"
              type="number"
              name="salary"
              // value={data.salary}
              onChange={inputDetails}
              placeholder="Eg : 10000"
              required
            />
            <br></br>

            <label>Monthly Expenses : </label>
            <br></br>
            {/* <div style={{position:'relative', justifyContent:'center'}}>
            <span className="unit" style={{position :'absolute',left: '7px',top: '13px',marginLeft:'25%', zIndex:'9'}}>RS</span>
            <input
              className="inputbox"
              type="number"
              name="expenses"
              // value={data.expenses}
              onChange={inputDetails}
              // placeholder="Eg : 5000"
              required
              style={{display: 'block',
              marginLeft:'25%',
              paddingLeft:'2rem'
                }}
            />
            </div> */}
            <input
              className="inputbox"
              type="number"
              name="expenses"
              // value={data.expenses}
              onChange={inputDetails}
              placeholder="Eg : 5000"
              required
              
            />
            <br></br>

            <label>Investment Amount : </label>
            <br></br>
            <input
              className="inputbox"
              type="number"
              name="investment"
              // value={data.investment}
              onChange={inputDetails}
              placeholder="Eg : 5000"
              required
            />
            <br></br>

            <label>Enter your Age : </label>
            <br></br>
            <input
              className="inputbox"
              type="number"
              name="age"
              // value={data.salary}
              onChange={inputDetails}
              placeholder="Eg : 25"
              required
            />
            <br></br>
            <label>Number of children : </label>
            <br></br>
            <input
              className="inputbox"
              type="number"
              name="kids"
              // value={data.salary}
              onChange={inputDetails}
              placeholder="Eg : 1"
              required
            />
            <br></br>
            <label>Risk Tolerance : </label>
            <br></br>
            <select
              className="selectbox"
              // id="riskTolerance"
              name="risk"
              value={data.risk}
              onChange={inputDetails}
              required
            >
              <option value="Select">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <br></br>

            <label>Please specify, if you want to mention anything</label>
            <br></br>
            <textarea
              rows="4"
              cols="35"
              style={{
                fontSize: "1rem",
                resize: "none",
                backgroundColor: "black",
                borderRadius: "10px",
                padding: "7px",
                border: "black",
                marginTop: "15px",
                marginBottom: "15px",
              }}
              name="additionalInformation"
              placeholder="Enter here"
              onChange={inputDetails}
            ></textarea>
            <br></br>
            <button type="submit">Generate</button>
          </form>
        </div>

        <div className="response-container">
          {resFromAxios.map((val) => {
            return val.includes("**") ? (
              <b style={{color:'#3bb273'}}>{val.replaceAll("**", "")}</b>
            ) : (
              <p>{val}</p>
            );
          })}
        </div>
      </div>

      {/* <Test value={question} /> */}
    </>
  );
}

export default Form;
