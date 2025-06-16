import React from "react";
import { useRef, useEffect } from "react";

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    design: string;
};

const Canvas: React.FC<CanvasProps> = (props: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { design, width, height } = props;

    const drawRoof = (
        context: CanvasRenderingContext2D,
        roofDesign: string,
    ) => {
        context.fillStyle = "#224433";
        // Draw a simple triangle roof
        if (roofDesign === "0") {
            context.beginPath();
            context.moveTo(10, 120);
            context.lineTo(context.canvas.width / 2, 20);
            context.lineTo(context.canvas.width - 10, 120);
            context.fill();
            context.closePath();
        } else if (roofDesign === "1") {
            context.fillRect(10, 50, context.canvas.width - 20, 70);
        } else {
            context.beginPath();
            context.moveTo(context.canvas.width / 2 - 30, 120);
            context.lineTo(context.canvas.width / 2, 20);
            context.lineTo(context.canvas.width / 2 + 30, 120);
            context.fill();
            context.closePath();
        }
    };
    const drawWindows = (
        context: CanvasRenderingContext2D,
        windowsDesign: string,
    ) => {
        context.strokeStyle = "#dddddd";
        context.beginPath();
        context.arc(
            context.canvas.width / 2 + 50 * (Number(windowsDesign) - 1),
            180,
            20,
            0,
            Math.PI * 2,
        );
        context.stroke();
    };

    const drawDoors = (
        context: CanvasRenderingContext2D,
        doorsDesign: string,
    ) => {
        context.fillStyle = "#dddddd";
        context.fillRect(
            context.canvas.width / 2 + (30 * (Number(doorsDesign) - 1) - 15),
            240,
            40,
            60,
        );
    };

    useEffect(() => {
        console.log("Canvas Design:", design);
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!context) return;
        // Draw background
        context.lineWidth = 4;
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        // Draw main house
        context.fillStyle = "#445544";
        context.fillRect(
            20,
            120,
            context.canvas.width - 40,
            context.canvas.height - 120,
        );
        drawRoof(context, design[0]);
        drawWindows(context, design[1]);
        drawDoors(context, design[2]);
    }, [design]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
