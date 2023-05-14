import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const HAMSTERS = 'Hamsters'

const inputStyle = 'h-[40px] text-zinc-900 rounded-md'
const labelStyle = 'text-3xl'

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
)

function App () {
  const [hamsters, setHamsters] = useState([])
  const [result, setResult] = useState({})
  const [hamster, setHamster] = useState({})
  const [hamsterID, setHamsterID] = useState(undefined)

  const getHamsters = async () => {
    const result = await supabase.from(HAMSTERS).select()
    setHamsters(result.data)
  }

  const createHamsters = async hamster => {
    const result = await supabase.from(HAMSTERS).insert(hamster)
    setResult(result)
    getHamsters()
  }

  const editHamters = async hamster => {
    const { id, ...toUpdate } = hamster
    const result = await supabase.from(HAMSTERS).update(toUpdate).eq('id', id)
    setResult(result)
    getHamsters()
  }

  const killHamsters = async id => {
    const result = await supabase.from(HAMSTERS).delete().eq('id', id)
    setResult(result)
    getHamsters()
  }

  // Closure function
  const createDeleter = id => {
    return () => {
      killHamsters(id)
    }
  }

  const inputHandler = event => {
    setHamster(state => {
      // if (event.target.value.length >= 20) {
      //   return state
      // }
      return {
        ...state,
        [event.target.name]: event.target.value
      }
    })
  }

  const updateHandler = event => {
    event.preventDefault()
    if (hamsterID) {
      editHamters({ id: hamsterID, ...hamster })
      setHamsterID(undefined)
      setHamster({})
    } else {
      alert('No has cambiado el ID, bobo')
    }
  }

  useEffect(() => {
    getHamsters()
  }, [])

  useEffect(() => {
    console.log(hamsters)
  }, [hamsters])

  return (
    <div className='pb-8 mx-auto max-w-7xl'>
      <h1 className='flex justify-center w-full py-16 text-5xl'>SupaHam!</h1>
      <button
        onClick={() => {
          createHamsters({
            name: 'Pantunflas',
            description: 'Esto es un test de pantunflas',
            breed: 'comilon',
            image: '/hamster_20.jpeg',
            cuteness: 10
          })
        }}
        className='flex justify-center w-full'
      >
        Crea un hamster
      </button>
      <section className='grid w-full grid-cols-3 gap-x-8 gap-y-4'>
        {hamsters.map((hamster, index) => (
          <article
            key={index}
            className='flex flex-col items-center text-2xl gap-y-2'
          >
            <button
              className='px-8 py-4 text-5xl bg-red-500 rounded-md'
              onClick={createDeleter(hamster.id)}
            >
              X
            </button>
            <p>{hamster.name}</p>
            <img
              src={hamster.image}
              className='w-[500px] h-[500px] object-cover rounded-xl'
            ></img>
          </article>
        ))}
      </section>
      <form
        className='flex flex-col gap-y-2'
        onSubmit={event => {
          event.preventDefault()
          if (
            hamster.name &&
            hamster.breed &&
            hamster.image &&
            hamster.cuteness
          ) {
            createHamsters(hamster)
            setHamster({})
          } else {
            alert('Te faltan campos, espabila')
          }
        }}
      >
        <label className={labelStyle}>Name</label>
        <input
          type='text'
          name='name'
          onChange={inputHandler}
          value={hamster.name ? hamster.name : ''}
          className={inputStyle}
        ></input>
        <label className={labelStyle}>Description</label>
        <input
          type='text'
          name='description'
          onChange={inputHandler}
          value={hamster.description ? hamster.description : ''}
          className={inputStyle}
        ></input>
        <label className={labelStyle}>Breed</label>
        <input
          type='text'
          name='breed'
          onChange={inputHandler}
          value={hamster.breed ? hamster.breed : ''}
          className={inputStyle}
        ></input>
        <label className={labelStyle}>Cuteness</label>
        <input
          type='number'
          name='cuteness'
          onChange={inputHandler}
          value={hamster.cuteness ? hamster.cuteness : ''}
          className={inputStyle}
        ></input>
        <label className={labelStyle}>Image</label>
        <input
          type='text'
          name='image'
          onChange={inputHandler}
          value={hamster.image ? hamster.image : ''}
          className={inputStyle}
        ></input>
        <button
          type='submit'
          className='flex justify-center px-4 py-2 hover:bg-slate-400 bg-slate-300 text-zinc-900 w-fit rounded-xl'
        >
          Create
        </button>
      </form>
      <form onSubmit={updateHandler} className='flex flex-col gap-y-2'>
        <label className={labelStyle}>id</label>
        <input
          type='number'
          onChange={event => {
            setHamsterID(parseInt(event.target.value))
          }}
          value={hamsterID}
          className={inputStyle}
        ></input>
        <button
          type='submit'
          className='flex justify-center px-4 py-2 hover:bg-slate-400 bg-slate-300 text-zinc-900 w-fit rounded-xl'
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default App
