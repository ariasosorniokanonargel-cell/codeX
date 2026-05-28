export interface Language {
  id: string
  name: string
  icon: string
  description: string
  difficulty: 'Fácil' | 'Intermedio' | 'Difícil' | 'Avanzado'
  advantages: string[]
  disadvantages: string[]
  areas: string[]
  estimatedTime: string
  popularity: number
  color: string
}

export interface Lesson {
  id: number
  title: string
  description: string
  xpReward: number
  duration: string
  type: 'theory' | 'practice' | 'challenge'
  content: LessonContent
}

export interface LessonContent {
  explanation: string
  codeExample?: string
  exercise?: Exercise
}

export interface Exercise {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export const languages: Record<string, Language> = {
  python: {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: 'Lenguaje versátil y fácil de aprender, perfecto para principiantes. Domina en IA, ciencia de datos y automatización.',
    difficulty: 'Fácil',
    advantages: [
      'Sintaxis clara y legible',
      'Gran comunidad y recursos',
      'Bibliotecas para todo',
      'Alta demanda laboral'
    ],
    disadvantages: [
      'Más lento que lenguajes compilados',
      'No ideal para móviles',
      'GIL limita concurrencia'
    ],
    areas: ['Inteligencia Artificial', 'Ciencia de Datos', 'Automatización', 'Backend', 'Scripting'],
    estimatedTime: '3-6 meses para nivel intermedio',
    popularity: 95,
    color: '#3776ab'
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    description: 'El lenguaje de la web. Esencial para desarrollo frontend y cada vez más usado en backend con Node.js.',
    difficulty: 'Intermedio',
    advantages: [
      'Único lenguaje del navegador',
      'Full-stack con Node.js',
      'Ecosistema masivo',
      'Muy demandado'
    ],
    disadvantages: [
      'Comportamiento impredecible a veces',
      'Muchos frameworks',
      'Tipado débil puede causar bugs'
    ],
    areas: ['Frontend Web', 'Backend', 'Apps Móviles', 'Aplicaciones Desktop'],
    estimatedTime: '4-8 meses para nivel intermedio',
    popularity: 98,
    color: '#f7df1e'
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    icon: '📘',
    description: 'JavaScript con superpoderes. Añade tipado estático para código más robusto y mantenible.',
    difficulty: 'Intermedio',
    advantages: [
      'Detección temprana de errores',
      'Mejor autocompletado',
      'Código más mantenible',
      'Creciente adopción'
    ],
    disadvantages: [
      'Curva de aprendizaje inicial',
      'Configuración adicional',
      'Compilación necesaria'
    ],
    areas: ['Aplicaciones Empresariales', 'Frontend Complejo', 'Backend Node.js', 'Full-stack'],
    estimatedTime: '2-4 meses si ya sabes JavaScript',
    popularity: 85,
    color: '#3178c6'
  },
  java: {
    id: 'java',
    name: 'Java',
    icon: '☕',
    description: 'Lenguaje robusto y empresarial. Usado en Android, backend y sistemas de gran escala.',
    difficulty: 'Intermedio',
    advantages: [
      'Muy estable y maduro',
      'Portabilidad (JVM)',
      'Empresas lo adoran',
      'Android nativo'
    ],
    disadvantages: [
      'Verbose (mucho código)',
      'Lento para prototipar',
      'Configuración compleja'
    ],
    areas: ['Android', 'Backend Empresarial', 'Sistemas Bancarios', 'Big Data'],
    estimatedTime: '6-12 meses para nivel intermedio',
    popularity: 88,
    color: '#ed8b00'
  },
  csharp: {
    id: 'csharp',
    name: 'C#',
    icon: '🎮',
    description: 'Lenguaje de Microsoft, dominante en desarrollo de videojuegos con Unity y aplicaciones Windows.',
    difficulty: 'Intermedio',
    advantages: [
      'Unity = industria de juegos',
      'Ecosistema .NET robusto',
      'Lenguaje moderno y elegante',
      'Buen soporte de Microsoft'
    ],
    disadvantages: [
      'Principalmente Windows',
      'Curva de aprendizaje media',
      'Menos portable'
    ],
    areas: ['Videojuegos', 'Aplicaciones Windows', 'Backend .NET', 'Realidad Virtual'],
    estimatedTime: '6-10 meses para nivel intermedio',
    popularity: 75,
    color: '#239120'
  },
  go: {
    id: 'go',
    name: 'Go',
    icon: '🔵',
    description: 'Creado por Google para sistemas modernos. Simple, rápido y excelente para concurrencia.',
    difficulty: 'Intermedio',
    advantages: [
      'Muy rápido de compilar',
      'Concurrencia fácil',
      'Sintaxis simple',
      'Ideal para microservicios'
    ],
    disadvantages: [
      'Sin genéricos tradicionales',
      'Ecosistema más pequeño',
      'Manejo de errores repetitivo'
    ],
    areas: ['Cloud Computing', 'DevOps', 'Microservicios', 'CLI Tools'],
    estimatedTime: '3-6 meses para nivel intermedio',
    popularity: 70,
    color: '#00add8'
  },
  rust: {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    description: 'El lenguaje más amado. Seguridad de memoria sin garbage collector, rendimiento extremo.',
    difficulty: 'Avanzado',
    advantages: [
      'Máxima seguridad de memoria',
      'Rendimiento de C/C++',
      'Sin data races',
      'Comunidad apasionada'
    ],
    disadvantages: [
      'Curva de aprendizaje empinada',
      'Compilación lenta',
      'Ownership puede frustrar'
    ],
    areas: ['Sistemas Operativos', 'WebAssembly', 'CLI Tools', 'Sistemas Embebidos'],
    estimatedTime: '8-12 meses para nivel intermedio',
    popularity: 65,
    color: '#ce422b'
  },
  kotlin: {
    id: 'kotlin',
    name: 'Kotlin',
    icon: '📱',
    description: 'El futuro de Android. Moderno, conciso y 100% interoperable con Java.',
    difficulty: 'Intermedio',
    advantages: [
      'Lenguaje oficial de Android',
      'Más conciso que Java',
      'Null safety integrado',
      'Corrutinas para async'
    ],
    disadvantages: [
      'Comunidad más pequeña',
      'Compilación algo lenta',
      'Recursos de aprendizaje limitados'
    ],
    areas: ['Android', 'Backend', 'Multiplataforma', 'Servidor'],
    estimatedTime: '4-7 meses para nivel intermedio',
    popularity: 60,
    color: '#7f52ff'
  },
  swift: {
    id: 'swift',
    name: 'Swift',
    icon: '🍎',
    description: 'El lenguaje de Apple. Moderno, seguro y potente para iOS, macOS y más.',
    difficulty: 'Intermedio',
    advantages: [
      'Único para iOS nativo',
      'Moderno y seguro',
      'Playground interactivo',
      'Excelente documentación'
    ],
    disadvantages: [
      'Solo ecosistema Apple',
      'Cambios frecuentes',
      'Necesitas Mac'
    ],
    areas: ['iOS', 'macOS', 'watchOS', 'tvOS', 'Servidor'],
    estimatedTime: '4-8 meses para nivel intermedio',
    popularity: 55,
    color: '#f05138'
  },
  php: {
    id: 'php',
    name: 'PHP',
    icon: '🐘',
    description: 'El lenguaje del web tradicional. Potencia WordPress y millones de sitios.',
    difficulty: 'Fácil',
    advantages: [
      'Fácil de empezar',
      'WordPress y Laravel',
      'Hosting barato',
      'Mucho trabajo freelance'
    ],
    disadvantages: [
      'Reputación cuestionable',
      'Inconsistencias del lenguaje',
      'Menos moderno'
    ],
    areas: ['WordPress', 'E-commerce', 'CMS', 'Backend Web'],
    estimatedTime: '3-6 meses para nivel intermedio',
    popularity: 50,
    color: '#777bb4'
  },
  dart: {
    id: 'dart',
    name: 'Dart',
    icon: '🎯',
    description: 'El lenguaje de Flutter. Una base de código, apps nativas para todo.',
    difficulty: 'Intermedio',
    advantages: [
      'Flutter = multiplataforma',
      'Hot reload increíble',
      'Sintaxis familiar',
      'Crecimiento explosivo'
    ],
    disadvantages: [
      'Atado a Flutter',
      'Comunidad aún creciendo',
      'Menos recursos que otros'
    ],
    areas: ['Apps Móviles', 'Apps Desktop', 'Apps Web', 'IoT'],
    estimatedTime: '3-6 meses para nivel intermedio',
    popularity: 45,
    color: '#0175c2'
  },
  lua: {
    id: 'lua',
    name: 'Lua',
    icon: '🌙',
    description: 'Pequeño pero poderoso. Popular en scripting de juegos y sistemas embebidos.',
    difficulty: 'Fácil',
    advantages: [
      'Muy fácil de aprender',
      'Ligero y rápido',
      'Ideal para scripting',
      'Usado en Roblox'
    ],
    disadvantages: [
      'Nicho específico',
      'Menos recursos',
      'Índices empiezan en 1'
    ],
    areas: ['Scripting de Juegos', 'Roblox', 'Sistemas Embebidos', 'Configuración'],
    estimatedTime: '2-4 meses para nivel intermedio',
    popularity: 35,
    color: '#2c2d72'
  },
  sql: {
    id: 'sql',
    name: 'SQL',
    icon: '🗄️',
    description: 'El lenguaje de las bases de datos. Fundamental para cualquier desarrollador.',
    difficulty: 'Fácil',
    advantages: [
      'Universal en bases de datos',
      'Fundamental para cualquier dev',
      'Sintaxis declarativa',
      'Muy demandado'
    ],
    disadvantages: [
      'No es un lenguaje completo',
      'Variaciones entre DBs',
      'Solo para datos'
    ],
    areas: ['Bases de Datos', 'Business Intelligence', 'Data Analysis', 'Backend'],
    estimatedTime: '1-3 meses para nivel intermedio',
    popularity: 90,
    color: '#4479a1'
  },
  bash: {
    id: 'bash',
    name: 'Bash',
    icon: '💻',
    description: 'El lenguaje de la terminal. Automatiza todo en Linux y macOS.',
    difficulty: 'Intermedio',
    advantages: [
      'Esencial para DevOps',
      'Automatización poderosa',
      'Disponible en todos lados',
      'Integración perfecta'
    ],
    disadvantages: [
      'Sintaxis confusa',
      'Difícil de mantener',
      'No para apps complejas'
    ],
    areas: ['DevOps', 'Administración de Sistemas', 'Automatización', 'CI/CD'],
    estimatedTime: '2-4 meses para nivel intermedio',
    popularity: 60,
    color: '#4eaa25'
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    icon: '⚙️',
    description: 'El lenguaje del rendimiento. Motores de juegos, sistemas operativos, software crítico.',
    difficulty: 'Avanzado',
    advantages: [
      'Máximo rendimiento',
      'Control total de memoria',
      'Motores de juegos AAA',
      'Sistemas críticos'
    ],
    disadvantages: [
      'Muy complejo',
      'Bugs de memoria',
      'Compilación larga'
    ],
    areas: ['Motores de Juegos', 'Sistemas Operativos', 'Software de Alto Rendimiento', 'Embebidos'],
    estimatedTime: '12-18 meses para nivel intermedio',
    popularity: 70,
    color: '#00599c'
  },
  react: {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    description: 'La biblioteca de Facebook para UIs. Componentes, estado y el ecosistema más grande.',
    difficulty: 'Intermedio',
    advantages: [
      'Domina el mercado frontend',
      'Componentes reutilizables',
      'React Native para móviles',
      'Gran ecosistema'
    ],
    disadvantages: [
      'Solo es una biblioteca',
      'Muchas decisiones que tomar',
      'JSX puede confundir'
    ],
    areas: ['Frontend Web', 'Apps Móviles', 'Apps Desktop', 'SSR con Next.js'],
    estimatedTime: '3-6 meses si sabes JavaScript',
    popularity: 92,
    color: '#61dafb'
  },
  nodejs: {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    description: 'JavaScript en el servidor. APIs, microservicios y herramientas de desarrollo.',
    difficulty: 'Intermedio',
    advantages: [
      'JavaScript full-stack',
      'NPM = millones de paquetes',
      'Excelente para APIs',
      'Muy demandado'
    ],
    disadvantages: [
      'Single-threaded',
      'Callback hell posible',
      'No ideal para CPU intensivo'
    ],
    areas: ['Backend APIs', 'Microservicios', 'Herramientas CLI', 'Real-time Apps'],
    estimatedTime: '3-5 meses si sabes JavaScript',
    popularity: 85,
    color: '#339933'
  }
}

export const lessonsData: Record<string, Lesson[]> = {
  python: [
    {
      id: 1,
      title: 'Introducción a Python',
      description: 'Tu primer programa en Python',
      xpReward: 20,
      duration: '10 min',
      type: 'theory',
      content: {
        explanation: 'Python es un lenguaje de programación de alto nivel, interpretado y de propósito general. Es conocido por su sintaxis clara y legible.',
        codeExample: 'print("¡Hola, Code X!")\n\n# Variables\nnombre = "Usuario"\nprint(f"Bienvenido, {nombre}")',
        exercise: {
          question: '¿Qué función se usa para mostrar texto en pantalla en Python?',
          options: ['console.log()', 'print()', 'echo()', 'display()'],
          correctAnswer: 1,
          explanation: 'print() es la función estándar de Python para mostrar output en la consola.'
        }
      }
    },
    {
      id: 2,
      title: 'Variables y Tipos de Datos',
      description: 'Aprende a almacenar información',
      xpReward: 25,
      duration: '15 min',
      type: 'theory',
      content: {
        explanation: 'Las variables son contenedores para almacenar datos. Python tiene tipado dinámico, lo que significa que no necesitas declarar el tipo.',
        codeExample: '# Strings\nnombre = "Ana"\n\n# Números\nedad = 25\naltura = 1.65\n\n# Booleanos\nes_programador = True',
        exercise: {
          question: '¿Cuál es el tipo de dato de la variable: x = 3.14?',
          options: ['int', 'str', 'float', 'bool'],
          correctAnswer: 2,
          explanation: 'Los números decimales en Python son de tipo float (punto flotante).'
        }
      }
    },
    {
      id: 3,
      title: 'Operadores Básicos',
      description: 'Matemáticas y comparaciones',
      xpReward: 25,
      duration: '12 min',
      type: 'practice',
      content: {
        explanation: 'Python soporta operadores aritméticos (+, -, *, /, //, %, **) y de comparación (==, !=, <, >, <=, >=).',
        codeExample: '# Aritméticos\nsuma = 5 + 3      # 8\npotencia = 2 ** 3 # 8\nresto = 10 % 3    # 1\n\n# Comparación\nprint(5 > 3)      # True\nprint(5 == 5)     # True',
        exercise: {
          question: '¿Qué resultado da 2 ** 4 en Python?',
          options: ['8', '6', '16', '24'],
          correctAnswer: 2,
          explanation: '** es el operador de potencia. 2 ** 4 = 2^4 = 16'
        }
      }
    },
    {
      id: 4,
      title: 'Condicionales',
      description: 'Toma decisiones en tu código',
      xpReward: 30,
      duration: '15 min',
      type: 'theory',
      content: {
        explanation: 'Los condicionales permiten ejecutar código basado en condiciones usando if, elif y else.',
        codeExample: 'edad = 18\n\nif edad >= 18:\n    print("Eres mayor de edad")\nelif edad >= 13:\n    print("Eres adolescente")\nelse:\n    print("Eres niño")',
        exercise: {
          question: '¿Qué palabra clave se usa para "si no, entonces" en Python?',
          options: ['else if', 'elseif', 'elif', 'elsif'],
          correctAnswer: 2,
          explanation: 'Python usa "elif" como abreviatura de "else if".'
        }
      }
    },
    {
      id: 5,
      title: 'Bucles - For',
      description: 'Repite acciones de forma eficiente',
      xpReward: 35,
      duration: '18 min',
      type: 'practice',
      content: {
        explanation: 'El bucle for en Python itera sobre secuencias como listas, strings o rangos de números.',
        codeExample: '# Iterar sobre una lista\nlenguajes = ["Python", "JS", "Rust"]\nfor lang in lenguajes:\n    print(lang)\n\n# Usando range\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4',
        exercise: {
          question: '¿Qué hace range(3)?',
          options: ['Genera [1, 2, 3]', 'Genera [0, 1, 2]', 'Genera [0, 1, 2, 3]', 'Genera [3]'],
          correctAnswer: 1,
          explanation: 'range(3) genera los números 0, 1, 2 (desde 0 hasta n-1).'
        }
      }
    },
    {
      id: 6,
      title: 'Reto: FizzBuzz',
      description: 'El clásico desafío de programación',
      xpReward: 50,
      duration: '20 min',
      type: 'challenge',
      content: {
        explanation: 'FizzBuzz: Imprime números del 1 al 100. Para múltiplos de 3 imprime "Fizz", para múltiplos de 5 imprime "Buzz", para múltiplos de ambos "FizzBuzz".',
        codeExample: 'for i in range(1, 101):\n    if i % 3 == 0 and i % 5 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
        exercise: {
          question: '¿Qué número es el primero que imprime "FizzBuzz"?',
          options: ['3', '5', '15', '30'],
          correctAnswer: 2,
          explanation: '15 es el primer número divisible por 3 y por 5.'
        }
      }
    }
  ],
  javascript: [
    {
      id: 1,
      title: 'Introducción a JavaScript',
      description: 'El lenguaje de la web',
      xpReward: 20,
      duration: '10 min',
      type: 'theory',
      content: {
        explanation: 'JavaScript es el lenguaje de programación de la web. Se ejecuta en el navegador y permite crear páginas interactivas.',
        codeExample: 'console.log("¡Hola, Code X!");\n\n// Variables\nlet nombre = "Usuario";\nconsole.log(`Bienvenido, ${nombre}`);',
        exercise: {
          question: '¿Qué método se usa para mostrar mensajes en la consola?',
          options: ['print()', 'echo()', 'console.log()', 'write()'],
          correctAnswer: 2,
          explanation: 'console.log() es el método estándar para mostrar output en JavaScript.'
        }
      }
    },
    {
      id: 2,
      title: 'Variables: let, const, var',
      description: 'Diferentes formas de declarar variables',
      xpReward: 25,
      duration: '15 min',
      type: 'theory',
      content: {
        explanation: 'JavaScript tiene tres formas de declarar variables: var (antigua), let (reasignable) y const (constante).',
        codeExample: '// const - no se puede reasignar\nconst PI = 3.14159;\n\n// let - se puede reasignar\nlet contador = 0;\ncontador = 1;\n\n// var - evitar (scope confuso)\nvar antiguo = "no usar";',
        exercise: {
          question: '¿Cuál declaración deberías usar para una variable que nunca cambia?',
          options: ['var', 'let', 'const', 'static'],
          correctAnswer: 2,
          explanation: 'const se usa para valores que no deben ser reasignados.'
        }
      }
    },
    {
      id: 3,
      title: 'Funciones',
      description: 'Bloques de código reutilizable',
      xpReward: 30,
      duration: '18 min',
      type: 'practice',
      content: {
        explanation: 'Las funciones encapsulan código reutilizable. JavaScript soporta funciones tradicionales y arrow functions.',
        codeExample: '// Función tradicional\nfunction saludar(nombre) {\n  return `Hola, ${nombre}!`;\n}\n\n// Arrow function\nconst sumar = (a, b) => a + b;\n\nconsole.log(saludar("Ana"));\nconsole.log(sumar(2, 3));',
        exercise: {
          question: '¿Qué sintaxis es una arrow function válida?',
          options: ['function => (x) { }', 'x => x * 2', 'arrow(x) => x', '=> function(x)'],
          correctAnswer: 1,
          explanation: 'La sintaxis de arrow function es (params) => expression o (params) => { statements }'
        }
      }
    },
    {
      id: 4,
      title: 'Arrays y Métodos',
      description: 'Trabaja con colecciones de datos',
      xpReward: 35,
      duration: '20 min',
      type: 'practice',
      content: {
        explanation: 'Los arrays son colecciones ordenadas. JavaScript tiene métodos poderosos como map, filter y reduce.',
        codeExample: 'const numeros = [1, 2, 3, 4, 5];\n\n// map - transforma cada elemento\nconst dobles = numeros.map(n => n * 2);\n\n// filter - filtra elementos\nconst pares = numeros.filter(n => n % 2 === 0);\n\n// reduce - acumula valores\nconst suma = numeros.reduce((acc, n) => acc + n, 0);',
        exercise: {
          question: '¿Qué método usarías para obtener solo los números mayores a 3?',
          options: ['map', 'filter', 'reduce', 'find'],
          correctAnswer: 1,
          explanation: 'filter() crea un nuevo array con elementos que pasan una condición.'
        }
      }
    },
    {
      id: 5,
      title: 'Objetos',
      description: 'Estructuras de datos clave-valor',
      xpReward: 30,
      duration: '15 min',
      type: 'theory',
      content: {
        explanation: 'Los objetos almacenan datos en pares clave-valor y son fundamentales en JavaScript.',
        codeExample: 'const usuario = {\n  nombre: "Ana",\n  edad: 25,\n  skills: ["JS", "React"],\n  saludar() {\n    return `Hola, soy ${this.nombre}`;\n  }\n};\n\nconsole.log(usuario.nombre);\nconsole.log(usuario.saludar());',
        exercise: {
          question: '¿Cómo accedes a la propiedad "edad" del objeto usuario?',
          options: ['usuario[edad]', 'usuario->edad', 'usuario.edad', 'usuario::edad'],
          correctAnswer: 2,
          explanation: 'Se usa notación de punto (obj.propiedad) o corchetes (obj["propiedad"]).'
        }
      }
    },
    {
      id: 6,
      title: 'Reto: Palindromo',
      description: 'Detecta palabras que se leen igual al revés',
      xpReward: 50,
      duration: '25 min',
      type: 'challenge',
      content: {
        explanation: 'Un palíndromo es una palabra que se lee igual de izquierda a derecha que de derecha a izquierda.',
        codeExample: 'function esPalindromo(texto) {\n  const limpio = texto.toLowerCase().replace(/[^a-z0-9]/g, "");\n  const reverso = limpio.split("").reverse().join("");\n  return limpio === reverso;\n}\n\nconsole.log(esPalindromo("Anita lava la tina")); // true',
        exercise: {
          question: '¿Cuál de estas palabras es un palíndromo?',
          options: ['javascript', 'radar', 'codigo', 'funcion'],
          correctAnswer: 1,
          explanation: '"radar" se lee igual al derecho y al revés.'
        }
      }
    }
  ]
}

// Generate basic lessons for other languages
const generateBasicLessons = (langName: string): Lesson[] => [
  {
    id: 1,
    title: `Introducción a ${langName}`,
    description: `Primeros pasos con ${langName}`,
    xpReward: 20,
    duration: '10 min',
    type: 'theory',
    content: {
      explanation: `Bienvenido al curso de ${langName}. Este módulo te introducirá a los conceptos básicos del lenguaje.`,
      exercise: {
        question: `¿Estás listo para aprender ${langName}?`,
        options: ['¡Sí, empecemos!', 'Necesito prepararme más', 'Tengo algunas dudas', 'Vamos a ello'],
        correctAnswer: 0,
        explanation: '¡Excelente actitud! Vamos a empezar este viaje juntos.'
      }
    }
  },
  {
    id: 2,
    title: 'Variables y Tipos',
    description: 'Fundamentos del lenguaje',
    xpReward: 25,
    duration: '15 min',
    type: 'theory',
    content: {
      explanation: `Las variables son contenedores para almacenar datos. En ${langName}, aprenderás a trabajar con diferentes tipos de datos.`,
      exercise: {
        question: '¿Qué es una variable?',
        options: ['Una constante', 'Un contenedor de datos', 'Una función', 'Un bucle'],
        correctAnswer: 1,
        explanation: 'Las variables son contenedores que almacenan valores que pueden cambiar.'
      }
    }
  },
  {
    id: 3,
    title: 'Estructuras de Control',
    description: 'Condicionales y bucles',
    xpReward: 30,
    duration: '20 min',
    type: 'practice',
    content: {
      explanation: 'Las estructuras de control permiten dirigir el flujo de ejecución de tu programa.',
      exercise: {
        question: '¿Para qué sirve un condicional if?',
        options: ['Repetir código', 'Tomar decisiones', 'Definir funciones', 'Crear variables'],
        correctAnswer: 1,
        explanation: 'Los condicionales if permiten ejecutar código basado en condiciones.'
      }
    }
  },
  {
    id: 4,
    title: 'Funciones',
    description: 'Código reutilizable',
    xpReward: 35,
    duration: '18 min',
    type: 'practice',
    content: {
      explanation: 'Las funciones son bloques de código reutilizable que realizan tareas específicas.',
      exercise: {
        question: '¿Cuál es el beneficio principal de usar funciones?',
        options: ['Hacer el código más largo', 'Reutilizar código', 'Crear errores', 'Ninguno'],
        correctAnswer: 1,
        explanation: 'Las funciones permiten reutilizar código y mantenerlo organizado.'
      }
    }
  },
  {
    id: 5,
    title: 'Reto Final',
    description: 'Pon a prueba tus conocimientos',
    xpReward: 50,
    duration: '25 min',
    type: 'challenge',
    content: {
      explanation: `¡Has llegado al reto final del módulo básico de ${langName}!`,
      exercise: {
        question: '¿Qué has aprendido en este módulo?',
        options: ['Solo variables', 'Variables, control y funciones', 'Nada', 'Solo funciones'],
        correctAnswer: 1,
        explanation: '¡Correcto! Has aprendido los fundamentos: variables, estructuras de control y funciones.'
      }
    }
  }
]

// Add lessons for all languages
Object.keys(languages).forEach(lang => {
  if (!lessonsData[lang]) {
    lessonsData[lang] = generateBasicLessons(languages[lang].name)
  }
})
