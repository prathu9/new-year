const container = document.querySelector('.fireworks')
const fireworks = new Fireworks.default(container, {
  delay: {
    min: 30,
    max: 60
  },
  traceSpeed: 0.1
});

setTimeout(() => {
  fireworks.start()
}, 2500)