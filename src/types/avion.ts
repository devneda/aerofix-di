export interface Avion {
  matricula: string;
  modelo: string;
  capacidadPasajeros: number;
  horasVuelo: number;
  enServicio: boolean;
  fechaFabricacion: string;
  latitud?: number;
  longitud?: number;
  imagenUrl?: string;
  totalMantenimientos?: number;
  totalVuelos?: number;
}
