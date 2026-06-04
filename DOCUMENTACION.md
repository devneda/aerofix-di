# Documentación de la Aplicación: AeroFix

## 1. Nombre de la aplicación y propósito
**Nombre:** AeroFix - Taller de Aviones  
**Propósito:** AeroFix es una aplicación web interactiva desarrollada en React diseñada para la gestión de mantenimiento de aviones en un taller aeronáutico. Su objetivo es proporcionar una interfaz intuitiva y rápida para que los operarios y administradores puedan consultar la flota de aviones, ver detalles técnicos y operativos de cada aeronave, y revisar el directorio de mecánicos disponibles en el taller.

## 2. Funcionalidades implementadas

### Funcionalidades Obligatorias
1. **Consumo de 3 Endpoints de la API:**
   - `GET /api/aviones`: Listado completo de la flota de aviones.
   - `GET /api/aviones/{matricula}`: Detalles específicos de un avión.
   - `GET /api/mecanicos`: Listado del personal mecánico.
   - *Nota:* Se han implementado estados visuales consistentes para la carga de datos (loading spinner) y para la gestión de errores (mensajes de error amigables) en cada llamada.

2. **Navegación Dinámica (Routing):**
   - Se ha utilizado `react-router-dom` para estructurar la aplicación.
   - Rutas principales: `/`, `/aviones`, `/mecanicos`.
   - Ruta dinámica de detalle: `/aviones/:matricula`, que utiliza el ID (matrícula) para cargar datos específicos de la API de detalle.
   - Se ha implementado un componente `<Header />` consistente en todas las vistas.

3. **Control de Búsqueda y Filtrado Dinámico:**
   - La lista de Aviones permite: 
     - Búsqueda por texto (Modelo o Matrícula).
     - Filtrado por propiedad (Estado: En Servicio / Mantenimiento).
     - Ordenación dinámica (Ascendente/Descendente por modelo).
   - La lista de Mecánicos permite búsquedas y ordenación de la misma manera dinámica. Ninguna acción requiere un botón de "enviar" o "submit".

4. **Componentización (7+ Componentes Reutilizables):**
   - Estructura de carpetas: `src/components`, `src/pages`, `src/types`, `src/hooks`.
   - Componentes creados: `Header.tsx`, `Navigation.tsx`, `Footer.tsx`, `ThemeToggle.tsx`, `Title.tsx`, `CardInfo.tsx`, `SearchControl.tsx`, `FeedbackState.tsx`. (8 componentes funcionales).

5. **Leyes de Gestalt en el Diseño:**
   - **Ley de Similitud (Similarity):** Todos los elementos que tienen el mismo nivel jerárquico comparten la misma apariencia. Por ejemplo, en los listados (`/aviones` y `/mecanicos`), cada elemento se muestra dentro de una "tarjeta" (`.card`) que comparte el mismo fondo, borde, sombra, e interacciones de `hover`. Esto le indica inmediatamente al usuario que todos esos elementos pertenecen a la misma categoría de datos.
   - **Ley de Proximidad (Proximity):** La información se ha agrupado espacialmente para crear relaciones semánticas lógicas. Dentro de cada tarjeta (o en el detalle del avión), el componente `<CardInfo />` mantiene estrechamente unida la etiqueta (ej. "Horas de Vuelo:") con su respectivo valor, diferenciándolos visualmente del resto de atributos. Asimismo, el bloque de filtros y búsquedas (`<SearchControl />`) está espacialmente aislado del bloque de listado.
   - *(Añadir captura de pantalla de la Ley de Similitud aquí)*
   - *(Añadir captura de pantalla de la Ley de Proximidad aquí)*

### Funcionalidades Extra
1. **Modo Claro / Oscuro (Toggle de Tema):**
   - Implementado mediante el componente `<ThemeToggle />` y el custom hook `useTheme`. 
   - La preferencia se guarda automáticamente en `localStorage` y se carga al inicio de la aplicación.
2. **Retroalimentación Visual Inmediata (Feedback):**
   - Se muestra un contador dinámico de resultados (ej. "4 resultados") que se actualiza en tiempo real al escribir o filtrar.
   - Estados de carga animados y mensajes customizados para listas vacías (ej. "No hay aviones que coincidan...").

## 3. Instrucciones de ejecución
1. Asegurarse de tener la API (AeroFix API en Spring Boot) corriendo en `http://localhost:8080`.
2. En la carpeta del proyecto React (`taller-aerofix`), instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar el entorno de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir la URL indicada por Vite (normalmente `http://localhost:5173/`).
