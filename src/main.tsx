import { render } from 'preact'
import { App } from './components/App'
import './index.css'
import { slidedUpEvent } from './components/store'

render(<App />, document.getElementById('app') as HTMLElement)