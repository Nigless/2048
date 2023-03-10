import { ComponentChildren } from "preact"

const posX = {
    0: "",
    1: "translate-x-[calc((100%+1rem))]",
    2: "translate-x-[calc((100%+1rem)*2)]",
    3: "translate-x-[calc((100%+1rem)*3)]"
}

const posY = {
    0: "",
    1: "translate-y-[calc((100%+1rem))]",
    2: "translate-y-[calc((100%+1rem)*2)]",
    3: "translate-y-[calc((100%+1rem)*3)]"
}

interface TileProps {
    children?: ComponentChildren,
    x: number,
    y: number
}

export default function Tile({ children, x, y }: TileProps) {
    return <div
        class={`
            animate-[wiggle_0.1s_ease-in-out]
            transition-all
            absolute
            w-[calc(100%/4-(3rem/4))]
            h-[calc(100%/4-(3rem/4))]
            bg-warning-main
            rounded-md
            flex
            items-center
            justify-center
            text-4xl
            font-bold ${posY[y as 0]} ${posX[x as 0]}
        `}
    >
        {children}
    </div>
}