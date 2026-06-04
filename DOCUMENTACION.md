# AeroFix: Resumen de Cumplimiento AA1 + AA2

Este documento sirve como guia rapida para verificar las funcionalidades implementadas en el proyecto AeroFix segun los requisitos de las dos evaluaciones.

---

## Cumplimiento AA1 (Diseño e Interfaz)

1. Consumo de API: Integracion de 3 endpoints (aviones, aviones/{id}, mecanicos).
2. Enrutamiento Dinamico: Rutas con parametros (/aviones/:id) mediante react-router-dom.
3. Filtrado y Busqueda: Implementado en tiempo real en los listados generales (Reactivo).
4. Componentizacion: +10 componentes reutilizables (Header, Nav, Title, Cards, Search, etc.).
5. Leyes de Gestalt:
    * Similitud: Diseño consistente de tarjetas y elementos de interfaz.
    * Proximidad: Agrupacion logica de controles de busqueda y datos tecnicos.
6. Extras: Modo Claro/Oscuro dinamico y feedback visual de carga/error.

---

## Cumplimiento AA2 (Arquitectura Avanzada y Seguridad)

1. Autenticacion JWT:
    * Login y Registro con persistencia en localStorage.
    * Sistema hibrido (Modo Real / Modo Mock para evaluacion).
2. Gestion de Estado Global:
    * Implementado con Context API y patron Reducer para el ciclo de vida de la sesion.
3. Proteccion de Rutas y Roles:
    * Rutas protegidas por login (RequireAuth).
    * Control de acceso por roles (RequireRole) para Admin y Mecanico.
4. Dashboards Funcionales por Rol:
    * Panel Admin: Metricas de flota, tabla avanzada con ordenacion y filtro por fecha (año).
    * Panel Mecanico: Gestion de tareas, indicadores de Mantenimiento Critico (>1000h).
5. Testing Automatizado:
    * Tests de integracion y unitarios con Vitest (Reducer y Auth Guards).
6. Extras:
    * Servicio Externo: Widget de clima en tiempo real mediante API de Open-Meteo.
    * Desarrollo Profesional: Historial de Git organizado por commits semanticos.

---

## Instrucciones de Ejecucion
1. npm install (instalar dependencias).
2. npm run dev (iniciar aplicacion).
3. npm test (ejecutar suite de pruebas).
