import React, { useState, useEffect } from 'react'

const HomePage = () => {

  const [inputs, setInputs] = useState([{ id: 0, inputName: "My arguments", value: false }]);
  const [symbols, setSymbols] = useState("oprations");
  const [ans, setAns] = useState(false);
  const [booleans, SetBooleans] = useState({ value1: false, value2: false });

  const setData = (e, index) => {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = { ...newInputs[index], inputName: e };
      return newInputs;
    });
  };

  const setValues = (e, index) => {
    setAns(e)
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = { ...newInputs[index], value: e };
      return newInputs;
    });
  }


  const addArgs = () => {
    setInputs([...inputs, { id: inputs.length, inputName: "", value: false }])
  }

  useEffect(() => {
    if (symbols === "AND") {
      setAns(booleans.value1 && booleans.value2);
    } else {
      setAns(booleans.value1 || booleans.value2);
    }
  }, [booleans])


  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        {
          inputs.length ? inputs.map((fields, index) => (
            <div key={index}>
              <input type='text' defaultValue={fields.inputName} onChange={(e) => setData(e.target.value, index)} />
              <select defaultValue={false} onChange={(e) => setValues(e.target.value, index)}>
                <option value={false}>false</option>
                <option value={true}>True</option>
              </select>
            </div>
          )) : ""
        }

      </form>
      <button onClick={addArgs}>Add Arguments</button>
      <br />

      <div>

        {
          symbols === "oprations" ?
            <select onChange={(e) => setSymbols(e.target.value)}>
              <option defaultValue={undefined}>select</option>
              <option value={"Constant"}>Constants</option>
              <option value={"my_args"}>My Arguments</option>
              <option value={"AND"}>AND</option>
              <option value={"OR"}>OR</option>
            </select>
            : ""
        }

        {
          symbols === "Constant" &&
          <>
            <select onChange={(e) => setAns(e.target.value)}>
              <option>select</option>
              <option value={"true"}>true</option>
              <option value={"false"}>false</option>
            </select>
            <button onClick={() => setSymbols("oprations")}>X</button>

          </>
        }
        {
          symbols === "my_args" &&
          <>
            <select onChange={(e) => setAns(e.target.value)}>
              <option>select</option>
              {
                inputs.length ? inputs.map((fields, index) => (
                  <option value={fields.value} key={index}>{fields.inputName}</option>
                )) : ""
              }
            </select>
            <button onClick={() => setSymbols("oprations")}>X</button>

          </>
        }
        {
         (symbols === "OR" || symbols === "AND") ?
          <>
            <select onChange={(e) => SetBooleans({ ...booleans, value1: e.target.value })}>
              <option>select</option>
              {
                inputs.length ? inputs.map((fields, index) => (
                  <option value={fields.value} key={index}>{fields.inputName}</option>
                )) : ""
              }
            </select>
            <select onChange={(e) => SetBooleans({ ...booleans, value2: e.target.value })}>
              <option>select</option>
              {
                inputs.length ? inputs.map((fields, index) => (
                  <option value={fields.value} key={index}>{fields.inputName}</option>
                )) : ""
              }
            </select>
            <button onClick={() => setSymbols("oprations")}>X</button>
          </>:""
        }

        
      </div>
      {`Results: ${ans}`}
    </div>
  )
}

export default HomePage