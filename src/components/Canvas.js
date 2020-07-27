import React, { useEffect, useRef } from 'react';

const Canvas = () => {
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        canvas.style.width = window.innerWidth + 'px'
        canvas.style.height = window.innerHeight + 'px'
        const ctx = canvas.getContext('2d')
        
        ctxRef.current = ctx;
    }, [])

    let waves = []

    const setup = () => {
        let canvasHeight = ctxRef.current.canvas.height
        let canvasWidth = ctxRef.current.canvas.width

        let rectWidth = 11
        let rectHeight = 50
        let rectSpaceCount = 1
        let rectStartX = 0
        let rectStartY = canvasHeight
        let rectCount = Math.floor( canvasWidth / ( rectWidth + rectSpaceCount ) )
        let waveHeight = 0 // Add a number to see what it looks like without animation (let waveHeight = 70)
        let blue = 69  // Not used.. comment out red for a bluish wave
        let red = 0
        let waveLength = 0

        for(let i = 0; i <= rectCount; i++) {
            // blue++
            red += 3
            waveLength -= .07
            let sin = waveHeight + Math.sin(waveLength) * waveHeight
            rectHeight = -sin
            
            let wave = new Wave(rectStartX, rectStartY , rectWidth, rectHeight)
            wave.delay = (i+1) * 70
            // wave.color = 'RGB(11,37,'+ blue +')'  // Dark blue to lighter blue
            wave.color = 'RGB('+ red +',71, 119)'  // Indigo blue dye to a neat red
            rectStartX += rectWidth + rectSpaceCount
            waves.push(wave)
        }

        requestAnimationFrame(animate)
        
    }

    const draw = (wave) => {
        let wave_crest_height = 200
        wave.rectHeight = (wave.startHeight - wave_crest_height) + Math.sin(wave.progress) * wave_crest_height
        wave.draw()
    }

    const canvasBackground = () => {
        // Clear canvas before each draw
        ctxRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight)

        // Colored background gradient
        var lingrad = ctxRef.current.createLinearGradient(0, 0, 0, window.innerHeight);
        lingrad.addColorStop(0, '#E54C4B');
        lingrad.addColorStop(0.8, '#fff');
        ctxRef.current.fillStyle = lingrad;
        ctxRef.current.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    const animate = (timestamp) => {
        let length = waves.length

        canvasBackground()

        for(let i = 0; i < length; i++) {
            let wave = waves[i]
            let delay = Math.min( (performance.now() - wave.delayStart) / wave.delay, 1)
            
            if(delay === 1) {
                if(!wave.start) wave.start = timestamp
                wave.progress = (timestamp - wave.start) / 700
                draw(wave)
            }
        }
        
        requestAnimationFrame(animate)
    }

    class Wave {
        constructor(x, y, width, height) {
            this.x = x
            this.y = y
            this.rectWidth = width
            this.rectHeight = height
            this.startHeight = height
            this.color = ''
            this.start = 0
            this.duration = 2000
            this.dist = 200
            this.delayStart = performance.now()
        }

        draw() {
            // Draws the waves
            ctxRef.current.beginPath()
            ctxRef.current.rect(this.x, this.y, this.rectWidth, this.rectHeight)
            ctxRef.current.fillStyle = this.color
            ctxRef.current.fill()

            // Draws the sun
            ctxRef.current.beginPath()
            const radgrad = ctxRef.current.createRadialGradient(70, 80, 100, 90, 90, 230);
            radgrad.addColorStop(0.9, 'rgba(252,225,60,.2');
            radgrad.addColorStop(.7, 'rgba(254,177,37,1');
            radgrad.addColorStop(1, 'rgba(252, 142, 31,0)');
            ctxRef.current.fillStyle = radgrad;
            ctxRef.current.fillRect(0, 0, 400, 400);
        }
    }

    const buttonStyle = {
        position: 'absolute',
        left: '50%',
        top: '25px',
        background: 'none',
        border: '2px solid #000d4a',
        borderRadius: '4px',
        padding: '7px 13px',
        display: 'inline-block',
        fontWeight: '500',
        color: '#212529',
        textAlign: 'center',
        verticalAlign: 'middle',
        cursor: 'pointer',
        fontSize: '1rem',
    }

    return (
        <>
            <button style={buttonStyle} onClick={() => setup()}>START WAVE</button>
            <canvas ref={canvasRef} />
        </>
    )
}

export default Canvas