import { useState } from 'react'
import { useForm } from "react-hook-form"
import './App.css'
import { MdFamilyRestroom } from "react-icons/md";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("your form is submitted")
      }, d * 1000)
    })
  }

  let onSubmit = async (data) => {
    try {
      setSuccessMsg("");
      setErrorMsg("");

      const response = await fetch("http://localhost:5000/api/userss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });


      if (response.ok) {
        setSuccessMsg("🎉 Your form was submitted successfully!");
      } else {
        setErrorMsg("❌ Failed to save data.");
      }
    } catch (err) {
      setErrorMsg("⚠️ Error: " + err.message);
    }
  };

  return (

    <>
      <div className="container">
        <div className="child_container">

          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className='label' >FirstName*</label>
              <input {...register("firstname",
                {
                  required: "Name must be required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" }
                })}
                className='input' />
              {errors.firstname && <p className='error_handling' >{errors.firstname.message}</p>}
            </div>
            <br />
            <div>
              <label className='label' >LastName*</label>
              <input {...register("lastname", {
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Last Name should contain only letters (A–Z)'
                }
              })} className='input' />
              {errors.lastname && <p className='error_handling' >{errors.lastname.message}</p>}
            </div>
            <br />
            <div>
              <label className='label' >City</label>
              <input {...register("city")} className='input' />
            </div>
            <br />
            <div>
              <label className='label' >Village</label>
              <input {...register("city")} className='input' />
            </div>
            <br />
            <div>
              <label className='label'>Gender:</label>
              <select id="gender" className='input' {...register("gender")} >
                <option className='option' >Male</option>
                <option className='option' >Female</option>
                <option className='option' >Other</option>
              </select>
            </div>
            <br />

            <br />
            <input disabled={isSubmitting} className='submit' type="submit" />
            {isSubmitting && <div className='loding' >loding...</div>}

            {successMsg && <p className="loding">{successMsg}</p>}
            {errorMsg && <p className="errormassage">{errorMsg}</p>}

          </form>
          <div className="logo">
            <MdFamilyRestroom className='img' />
            <h2>User Registration Form</h2>

          </div>


        </div>
      </div>
    </>
  )
}

export default App
