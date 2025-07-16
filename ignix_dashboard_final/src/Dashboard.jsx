// filepath: c:\SPARKTRACK\IGNIX Comm Suite Frontend\ignix_dashboard_final\src\Dashboard.jsx
/*
IGNIX Comm Suite – Estado de Formularios

Este componente muestra un dashboard interactivo que permite monitorear el estado de los formularios de precomisionado y comisionado
asociados a TAGs técnicos en un proyecto industrial. La información se obtiene desde un archivo JSON generado automáticamente
a partir de un Excel maestro.

🔍 ¿Qué muestra esta vista?
- Indicadores de avance: total, recibidos, pendientes, porcentaje de completado
- Filtros interactivos: TAG, Subsistema, Actividad, Estado (Recibido/Pendiente)
- Tabla detallada de formularios con color según estado

📁 ¿Cómo está pensada?
- Frontend 100% estático, basado en React + Tailwind
- Lectura dinámica desde `sparktrack_formularios_estado.json`
- Ideal para montar en GitHub Pages o una intranet interna
*/

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./components/ui/select";
import { Badge } from "./components/ui/badge";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ tag: "", subsistema: "", actividad: "", estado: "", precomcom: "", disciplina: "", skid: "", lugar: "" });

  useEffect(() => {
    fetch("sparktrack_formularios_estado.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setFiltered(json);
      });
  }, []);

  useEffect(() => {
    const f = data.filter((item) => {
      return (
        (!filter.tag || item.TAG?.includes(filter.tag)) &&
        (!filter.subsistema || item.SUBSISTEMA === filter.subsistema) &&
        (!filter.actividad || item["ACTIVIDADES.ACTIVIDAD"] === filter.actividad) &&
        (!filter.estado || item.ESCANEADO?.includes(filter.estado)) &&
        (!filter.precomcom || item["ACTIVIDADES.PRECOM/COM"] === filter.precomcom) &&
        (!filter.disciplina || item.DISCIPLINA === filter.disciplina) &&
        (!filter.skid || item.SKID === filter.skid) &&
        (!filter.lugar || item["LUGAR EJECUCION"] === filter.lugar)
      );
    });
    setFiltered(f);
  }, [filter, data]);

  const getUnique = (key) => [...new Set(data.map((item) => item[key]).filter(Boolean))];
  // Indicadores basados en los datos filtrados
  const total = filtered.length;
  const recibidos = filtered.filter((d) => d.ESCANEADO?.toLowerCase() === "existe").length;
  const pendientes = filtered.filter((d) => d.ESCANEADO?.toLowerCase() === "no existe").length;
  const porcentaje = total > 0 ? ((recibidos / total) * 100).toFixed(1) : "0.0";

  return (
    <div style={{ padding: '2rem' }}>
      {/* Encabezado con título */}
      <h1>IGNIX Comm Suite – Form Status</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">Total formularios: <strong>{total}</strong></div>
        <div className="dashboard-card">Recibidos: <strong>{recibidos}</strong></div>
        <div className="dashboard-card">Pendientes: <strong>{pendientes}</strong></div>
        <div className="dashboard-card">% Completado: <strong>{porcentaje}%</strong></div>
      </div>

      <div className="filters" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Input placeholder="Filtrar TAG..." value={filter.tag} onChange={(e) => setFilter({ ...filter, tag: e.target.value })} />
        <button onClick={() => setFilter((prev) => ({ ...prev, tag: "" }))} style={{marginRight: '1rem'}}>Reset TAG</button>
        <Select value={filter.subsistema || undefined} onValueChange={(v) => setFilter((prev) => ({ ...prev, subsistema: v }))}>
          <SelectTrigger><SelectValue placeholder="Subsistema" /></SelectTrigger>
          <SelectContent>{getUnique("SUBSISTEMA").map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
        </Select>
        <button onClick={() => setFilter((prev) => ({ ...prev, subsistema: undefined }))} style={{marginRight: '1rem'}}>Reset Subsistema</button>
        <Select value={filter.actividad || undefined} onValueChange={(v) => setFilter((prev) => ({ ...prev, actividad: v }))}>
          <SelectTrigger><SelectValue placeholder="Actividad" /></SelectTrigger>
          <SelectContent>{getUnique("ACTIVIDADES.ACTIVIDAD").map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
        </Select>
        <button onClick={() => setFilter((prev) => ({ ...prev, actividad: undefined }))} style={{marginRight: '1rem'}}>Reset Actividad</button>
        <Select value={filter.estado === undefined ? '' : filter.estado} onValueChange={(v) => setFilter((prev) => ({ ...prev, estado: v }))}>
          <SelectTrigger><SelectValue placeholder="Estado" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Existe">Recibido</SelectItem>
            <SelectItem value="No existe">Pendiente</SelectItem>
          </SelectContent>
        </Select>
        <button onClick={() => setFilter((prev) => ({ ...prev, estado: '' }))} style={{marginRight: '1rem'}}>Reset Estado</button>
        <Select value={filter.precomcom || undefined} onValueChange={(v) => setFilter((prev) => ({ ...prev, precomcom: v }))}>
          <SelectTrigger><SelectValue placeholder="Precom/Com" /></SelectTrigger>
          <SelectContent>{getUnique("ACTIVIDADES.PRECOM/COM").map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
        </Select>
        <button onClick={() => setFilter((prev) => ({ ...prev, precomcom: undefined }))} style={{marginRight: '1rem'}}>Reset Precom/Com</button>
        <Select value={filter.disciplina || undefined} onValueChange={(v) => setFilter((prev) => ({ ...prev, disciplina: v }))}>
          <SelectTrigger><SelectValue placeholder="Disciplina" /></SelectTrigger>
          <SelectContent>{getUnique("DISCIPLINA").map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
        </Select>
        <button onClick={() => setFilter((prev) => ({ ...prev, disciplina: undefined }))} style={{marginRight: '1rem'}}>Reset Disciplina</button>
        <Select value={filter.skid || undefined} onValueChange={(v) => setFilter((prev) => ({ ...prev, skid: v }))}>
          <SelectTrigger><SelectValue placeholder="Skid" /></SelectTrigger>
          <SelectContent>{getUnique("SKID").map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
        </Select>
        <button onClick={() => setFilter((prev) => ({ ...prev, skid: undefined }))} style={{marginRight: '1rem'}}>Reset Skid</button>
        <Select value={filter.lugar || undefined} onValueChange={(v) => setFilter((prev) => ({ ...prev, lugar: v }))}>
          <SelectTrigger><SelectValue placeholder="Lugar Ejecución" /></SelectTrigger>
          <SelectContent>{getUnique("LUGAR EJECUCION").map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
        </Select>
        <button onClick={() => setFilter((prev) => ({ ...prev, lugar: undefined }))} style={{marginRight: '1rem'}}>Reset Lugar Ejecución</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <table>
          <thead>
            <tr>
              <th>TAG</th>
              <th>Sistema</th>
              <th>Subsistema</th>
              <th>Actividad</th>
              <th>Formulario</th>
              <th>Disciplina</th>
              <th>Precom/Com</th>
              <th>Impreso</th>
              <th>Escaneado</th>
              <th>Fecha Requerida</th>
              <th>Skid</th>
              <th>Lugar Ejecución</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx} style={{ cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
              >
                <td>{row.TAG}</td>
                <td>{row.SISTEMA}</td>
                <td>{row.SUBSISTEMA}</td>
                <td>{row["ACTIVIDADES.ACTIVIDAD"]}</td>
                <td>{row.FORMULARIO}</td>
                <td>{row.DISCIPLINA}</td>
                <td>{row["ACTIVIDADES.PRECOM/COM"]}</td>
                <td>{row.IMPRESO}</td>
                <td>{row.ESCANEADO}</td>
                <td>{row["FECHA REQUERIDA"]}</td>
                <td>{row.SKID}</td>
                <td>{row["LUGAR EJECUCION"]}</td>
                <td>
                  <span className={
                    row.ESCANEADO?.includes("Existe") ? "badge" : "badge destructive"
                  }>
                    {row.ESCANEADO?.includes("Existe") ? "Recibido" : "Pendiente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;