import React, {useEffect, useRef, useState} from 'react';

function App() {
  const iframe = useRef<HTMLIFrameElement>(null)
  const [events, setEvents] = useState<React.KeyboardEvent[]>([])

  useEffect(() => {
    const current = iframe.current
    const document = current?.contentDocument || current?.contentWindow?.document
    if (current && document) {
      const handle = (event: KeyboardEvent) => {
        const evt = new KeyboardEvent('keydown', {
          key: event.key,
          shiftKey: event.shiftKey,
          ctrlKey: event.ctrlKey,
          altKey: event.altKey,
          metaKey: event.metaKey
        });
        current?.dispatchEvent(evt)
      }
      document.addEventListener('keydown', handle)
      return () => {
        document.removeEventListener('keydown', handle)
      }
    }
  })

  return (<div style={{display: 'flex'}}>
      <section style={{flex: 1}}>
        <header>Events</header>
        <ul>{events.map((evt, i) => (<li
            key={`${events.length - i}`}>{`${evt.metaKey ? 'Meta+' : ''}${evt.altKey ? 'Alt+' : ''}${evt.ctrlKey ? 'Ctrl+' : ''}${evt.shiftKey ? 'Shift+' : ''}${evt.key.toUpperCase()}`}</li>))}</ul>
      </section>
      <section style={{flex: 1}}>
        <header>Frame</header>
        <iframe title="target" ref={iframe} onKeyDownCapture={(evt) => {
          switch (evt.key.toUpperCase()) {
            case 'META':
            case 'SHIFT':
            case 'CONTROL':
            case 'ALT':
              return;
          }
          setEvents([evt, ...events])
        }}/>
      </section>
    </div>);
}

export default App;
