import React from "react";
import { useRef, useEffect } from "react";

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    design: string;
};

const Canvas: React.FC<CanvasProps> = (props: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { design, width, height } = props;

    // const drawRoof = (
    //     context: CanvasRenderingContext2D,
    //     roofDesign: string,
    // ) => {};
    // const drawDoors = (
    //     context: CanvasRenderingContext2D,
    //     doorsDesign: string,
    // ) => {};
    // const drawWindows = (
    //     context: CanvasRenderingContext2D,
    //     windowsDesign: string,
    // ) => {};

    useEffect(() => {
        console.log("Canvas Design:", design);
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!context) return;
        // Draw background
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        // Draw main house
        context.fillStyle = "#661166";
        context.fillRect(
            20,
            80,
            context.canvas.width - 40,
            context.canvas.height - 80,
        );
        //drawRoof(context, design[0]);
        //drawWindows(context, design[1]);
        //drawDoors(context, design[2]);
    }, [design]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
