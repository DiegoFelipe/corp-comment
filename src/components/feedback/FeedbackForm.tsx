import { useState } from "react"
import { MAX_CHARACTERS } from "../../lib/constants"

export default function FeedbackForm({ handleAddItems }) {

  const [text, setText] = useState("")
  const [showValid, setShowValid] = useState(false)
  const [showError, setShowError] = useState(false)
  const charactersLeft = MAX_CHARACTERS - text.length

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;
    setText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (text.includes("#") && text.length >= 5) {
      setShowValid(true)
      setTimeout(() => setShowValid(false), 2000)
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
      return
    }
    handleAddItems(text)
    setText("")
  }



  return (
    <form className={`form ${showValid ? 'form--valid' : null} ${showError ? 'form--invalid' : null}`} onSubmit={handleSubmit}>
      <textarea value={text} onChange={handleChange}
        name="" id="feedback-textarea" placeholder="bla" spellCheck={false}>

      </textarea>
      <label htmlFor="feedback-textarea">Enter your feedback here.</label>
      <div>
        <p className="u-italic">{charactersLeft}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  )
}
