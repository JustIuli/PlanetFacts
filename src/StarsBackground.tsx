import { useRef, useEffect } from 'react'

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const n_stars = 150
    const colors = ['#176ab6', '#fb9b39']
    for (let i = 0; i < 98; i++) {
      colors.push('#fff')
    }

    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = []
      init()
    }

    window.addEventListener('resize', resizeCanvas)

    canvas.style.background = '#000'
    const c = canvas.getContext('2d')
    if (!c) return

    const randomInt = (max: number, min: number) =>
      Math.floor(Math.random() * (max - min) + min)

    const bg = c.createRadialGradient(
      canvas.width / 2,
      canvas.height * 3,
      canvas.height,
      canvas.width / 2,
      canvas.height,
      canvas.height * 4
    )
    bg.addColorStop(0, '#32465E')
    bg.addColorStop(0.4, '#000814')
    bg.addColorStop(0.8, '#000814')
    bg.addColorStop(1, '#000')


    class Star {
      x: number
      y: number
      radius: number
      color: string
      dy: number

      constructor(x?: number, y?: number, radius?: number, color?: string) {
        this.x = x ?? randomInt(0, canvas && canvas.width ? canvas.width : 0)
        this.y = y ?? randomInt(0, canvas && canvas.height ? canvas.height : 0)
        this.radius = radius ?? Math.random() * 1.1
        this.color = color ?? colors[randomInt(0, colors.length)]
        this.dy = -Math.random() * 0.3
      }

      draw() {
        if (!c || !canvas) return

        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.shadowBlur = randomInt(3, 15)
        c.shadowColor = this.color
        c.strokeStyle = this.color
        c.fillStyle = 'rgba( 255, 255, 255, .5)'
        c.fill()
        c.stroke()
        c.closePath()
      }

      update(arrayStars: Star[] = []) {
        if (this.y - this.radius < 0) this.createNewStar(arrayStars)

        this.y += this.dy
        this.draw()
      }

      createNewStar(arrayStars: Star[] = []) {
        const i = arrayStars.indexOf(this)
        arrayStars.splice(i, 1)
        arrayStars.push(
          new Star(undefined, canvas && canvas.height ? canvas.height + 5 : 0)
        )
      }
    }

    let stars: Star[] = []
    function init() {
      for (let i = 0; i < n_stars; i++) {
        stars.push(new Star())
      }
    }
    init()

    function animate() {
      if (!c || !canvas) return

      requestAnimationFrame(animate)
      c.clearRect(0, 0, canvas.width, canvas.height)
      c.fillStyle = bg
      c.fillRect(0, 0, canvas.width, canvas.height)
      stars.forEach((s) => s.update(stars))
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} style={{
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100vh'
  }}  />
}
