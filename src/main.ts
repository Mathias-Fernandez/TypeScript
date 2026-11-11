// Simulamos la respuesta de una API
const json = '{"id":1,"name":"Hermione","scores":[5, 3, 4, 4, 5]}';

// Definimos cómo debe verse un estudiante
type Student = {
  id: number;
  name: string;
  scores: number[];
};

// Convierte el texto JSON en un objeto, sin romperse si el JSON está mal
function safeParse(texto: string): unknown {
  try {
    return JSON.parse(texto);
  } catch (error) {
    return null;
  }
}

// Type guard: revisa que el dato tenga la forma de un Student
function isStudent(x: unknown): x is Student {
  if (typeof x !== "object" || x === null) {
    return false;
  }

  const obj = x as Record<string, unknown>;

  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    Array.isArray(obj.scores) &&
    obj.scores.every((n) => typeof n === "number")
  );
}

// Calcula el promedio de una lista de números
function average(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  let suma = 0;
  for (const n of nums) {
    suma = suma + n;
  }
  return suma / nums.length;
}

// Mostrar el resultado en la página
const app = document.getElementById("app");
const data = safeParse(json);

if (app) {
  if (isStudent(data)) {
    // Dato válido: mostramos nombre y promedio
    const titulo = document.createElement("h1");
    titulo.textContent = data.name;

    const parrafo = document.createElement("p");
    parrafo.textContent = "Promedio: " + average(data.scores).toFixed(2);

    app.appendChild(titulo);
    app.appendChild(parrafo);
  } else {
    // Dato inválido: mostramos un error
    const error = document.createElement("p");
    error.textContent = "Error: los datos recibidos no son válidos.";
    error.style.color = "red";

    app.appendChild(error);
  }
}