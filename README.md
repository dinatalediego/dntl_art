# DNTL Art — Otra Vida / Film Oracle

Demo web experimental para descubrir películas a partir de una ruleta de vidas alternativas.

## Idea

1. **“Si en otra vida te tocaba ser…”** — gira una ruleta de perfiles (arquitecto, músico, estratega, científico, etc.).
2. La vida seleccionada activa una segunda recomendación aleatoria de películas asociadas a ese patrón.
3. El usuario responde si ya vio la película y registra interés o valoración.
4. La sesión queda guardada localmente en el navegador (`localStorage`).
5. Puede descargarse un **Excel `.xlsx`** con el historial y un resumen de la sesión.

## Principios del demo

- Sin login.
- Sin base de datos.
- Sin backend.
- Fácil de desplegar como sitio estático en Vercel, GitHub Pages o cualquier hosting estático.
- Los datos permanecen solamente en el navegador del usuario hasta iniciar una nueva sesión o limpiar el almacenamiento.

## Ejecutar localmente

Puedes abrir `index.html` directamente o servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8080
```

Luego abre `http://localhost:8080`.

## Exportación Excel

La página usa el bundle de navegador de **ExcelJS** desde CDN para generar un archivo `.xlsx` con:

- hoja `Session` con cada respuesta;
- hoja `Summary` con métricas por vida alternativa;
- encabezados estilizados, anchos de columna y panel congelado.

## Próximos pasos posibles

- Añadir posters mediante TMDB cuando exista una API key.
- Convertirlo en PWA instalable.
- Incorporar un recomendador que aprenda de sesiones previas.
- Guardar sesiones opcionalmente en Supabase/Vercel Postgres.
