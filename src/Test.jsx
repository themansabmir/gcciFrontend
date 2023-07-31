import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCustomer } from "./features/customerSlice";

const Test = () => {

  const [fields, setFields] = useState([{
    name: "",
    email: "",
    userDetails:[{age:"", marks:""}]
  }])

  const handleChange = (index,e) => {
    e.preventDefault()
    const { name, value } = e.target
    const data = [...fields]

    data[index][name] = value
    setFields(data)

  }

  const addFields = (index, e) => {
    e.preventDefault()
    const newArr = [...fields];

    newArr[index].userDetails.push({ age: "", marks: "" })
    setFields(newArr)


  }

  const handleNestChange = (mainIndex,index, e) => {
    e.preventDefault()
    const { name, value } = e.target
    const data = [...fields]


    data[mainIndex].userDetails[index][name] = value
    setFields(data)




  }

  const createForm = () => {


    setFields((prev) => [
      ...prev,
      {
        name: "",
        email: "",
        userDetails: [{ age: "", marks: "" }],
      },
    ]);
  }


  const customerData = useSelector((state) => state.customer.customerData)


  console.log(customerData)

  const [search, setSearch] = useState('')
  const dispatch = useDispatch()



  const searchHanler = (e) => {
    setOpen(true)
    e.preventDefault()
    setSearch(e.target.value)

    dispatch(searchCustomer(search))


  }
const [open, setOpen]= useState(false)
  return (
    <div>

      <div>
        <label htmlFor="">Live search</label>
        <textarea type="text" value={ search} onChange={searchHanler } />
      </div>
      {open &&
        <div className="relative">
          {
            customerData.map((item, index) => {
              return (
                <div className="hover:bg-gray-300 p-8 w-full absolute" onClick={() => { console.log(item._id) }}>
                  {item.customerAddress.map((elem, i) => {
                    return (
                      <div
                        className='bg-gray-200 absolute top-0 w-full'
                        onClick={() =>
                          {setSearch(
                             ` ${item.companyName} ${elem.gstNumber} ${elem.city} ${elem.country}`
                          );
                          setOpen(false)}

                        }
                      >{` ${item.companyName}- ${elem.city} `}</div>
                    );
                  })}
                </div>
              )
            })
          }
        </div>}











      <div>
        {/* {
          fields.map((item, index) => {
            return (

              <form action=''>
                <div>
                  <label for=''>Name</label>
                  <input
                    type='text'
                    name='name'
                    onChange={(e) => handleChange(index, e)}
                    value={item.name}
                    className='bg-gray-100'
                  />
                </div>
                <div>
                  <label for=''>email</label>
                  <input
                    type='text'
                    name='email'
                    value={item.email}
                    onChange={(e) => handleChange(index, e)}
                    className='bg-gray-100'
                  />
                </div>
                <div>
                  {fields[index].userDetails.map((elem, i) => {
                    return (
                      <div>
                        <input
                          type='text'
                          name='age'
                          id=''
                          onChange={(e) => handleNestChange(index,i, e)}
                          value={elem.age}
                        />
                        <input
                          type='text'
                          name='marks'
                          id=''
                          value={elem.marks}
                        />
                      </div>
                    );
                  })}
                </div>
                <button onClick={(e)=>addFields(index, e)}>Add</button>
              </form>
            );
          })
        } */}

        <button onClick={createForm}>Create nwe form</button>
      </div>
    </div>
  );
};

export default Test;
