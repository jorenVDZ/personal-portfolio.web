import { ISourceOptions } from '../../../../node_modules/@tsparticles/engine/types/Types/ISourceOptions';

export const particlesOptions: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "bubble",
        },
        resize: {
          enable: true,
          delay: 0.5,
        },
      },
      modes: {
        push: {
          quantity: 3,
        },
        bubble: {
          distance: 200,
          size: 4,
          duration: 0.3,
          opacity: 0.8,
          speed: 3,
        },
        attract: {
          distance: 120,
          duration: 0.4,
          easing: "ease-out-quad",
          factor: 1,
          maxSpeed: 20,
          speed: 1,
        },
        repulse: {
          distance: 80,
          duration: 0.4,
          factor: 50,
          speed: 1,
          maxSpeed: 20,
          easing: "ease-out-quad",
        },
      },
    },
    particles: {
      color: {
        value: ["#ffffff", "#fffacd", "#f0f8ff", "#e6e6fa"],
      },
      links: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        random: true,
        speed: 0.2,
        straight: false,
        outModes: {
          default: "bounce",
        },
        attract: {
          enable: false,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
      },
      number: {
        density: {
          enable: true,
        },
        value: 300,
      },
      opacity: {
        value: { min: 0.3, max: 1 },
        animation: {
          enable: true,
          speed: 0.5,
          startValue: "min",
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.5, max: 2.5 },
        animation: {
          enable: true,
          speed: 1,
          startValue: "min",
          sync: false,
        },
      },
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: 80
            }
          }
        }
      }
    ]
  };
