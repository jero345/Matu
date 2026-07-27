import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// scripted enhancements only apply once JS is running, so the page still
// renders fully without it
document.documentElement.classList.add('js')

// The desktop canvas is sized off `100vw`, which counts the classic scrollbar
// the content box does not get. Publish the difference so the artboard can
// subtract it (see the `--sbw` note in index.css); it is 0 wherever scrollbars
// overlay the page, which is every touch device and macOS by default.
const measureScrollbar = () => {
  const w = window.innerWidth - document.documentElement.clientWidth
  document.documentElement.style.setProperty('--sbw', `${w > 0 ? w : 0}px`)
}
measureScrollbar()
window.addEventListener('resize', measureScrollbar)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
