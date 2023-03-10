import { useStore } from "effector-react";
import Tile from "./Tile";
import { fieldStore, slidedUpEvent } from "./store";
import { useEffect } from 'preact/hooks';

export function App() {
  const field = useStore(fieldStore)
  useEffect(() => {
    const handleKeyUp = (e: any) => {
      if (e.code === "ArrowUp")
        slidedUpEvent()
    }

    window.addEventListener("keyup", handleKeyUp)
    return () => window.removeEventListener("keyup", handleKeyUp)
  })

  return (
    <div class="relative w-[calc(min(100vh,100vw)-3rem)] h-[calc(min(100vh,100vw)-3rem)]">
      {field.map((col, x) => col.map((t, y) =>
        t ? <Tile key={t.id} x={x} y={y}>{t.value}</Tile> : <div key={-(x * 4 + y + 1)} />
      ))}
    </div>
  )
}

