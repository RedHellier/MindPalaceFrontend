import React from "react";
import { useRef, useEffect } from "react";

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    image: string;
};

const Canvas: React.FC<CanvasProps> = (props: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { image } = props;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!context) return;
        context.fillStyle = image === "house1" ? "#000000" : "#447722";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, [image]);

    return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
