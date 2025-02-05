
import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf'
import { Chart } from 'chart.js/auto'; 
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { LegendOp } from './elements';


var tableRef = useRef<HTMLDivElement>(null);
function Menu({ isOpen, onClose, features, mapRef, IaFlag , IaYear}) {
  const canvasRef = useRef(null);
 
  // Variables para abrir y cerrar el menu principal
  const [localIsOpen, setLocalIsOpen] = useState(isOpen);
  const menuRef = useRef(null);

  useEffect(() => {
    setLocalIsOpen(isOpen);
  }, [isOpen]);
  // Detección de click fuera del menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  // Funcion de cerrado de menu (en caso de boton de cierre)
 /* const handleClose = () => {
    onClose();
  };*/

  //Diseño de botones del menu de descarga
  function DynamicToggle() {
    return (
      <>
      {toggles.map((item) => (
        <div key={item.id} className='w-full flex justify-center items-center gap-3'>
          <div className='w-[5rem] flex  gap-3'>
            <div className="relative inline-block w-10 h-6 bg-gray-200 rounded-full">
              <button
              disabled= {(!IaFlag && (item.name === "Tabla" || item.name === "Gráfica"))? true : false }
              onClick={() => handleToggles(item.id)}
              className={`relative inline-flex items-center w-10 h-6 rounded-full bg-backbtn ${
                item.isActive ? 'bg-primary' : 'bg-backbtn'
              }`}
              >
                <span
                  className={`absolute block w-5 h-5 rounded-full bg-foreground shadow-inner transition duration-200 ease-in-out ${
                    item.isActive ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p>{item.name}</p>
          </div>
        </div>
      ))}
    </>
      
    );
  }
  // Arreglo para generar botones dinamicamente
  const [toggles, setToggles] = useState([
    { id: 1, isActive: true, name: "Mapa" },
    { id: 2, isActive: false, name: "Tabla" },
    { id: 3, isActive: false, name: "Gráfica" }
  ]);
  // Funcion de cambio de estado de botones individualmente y alteracion del arreglo toggles segun el estado del boton
  const handleToggles = (id) => {
    setToggles((prevToggles) =>
      prevToggles.map((toggle) =>
        toggle.id === id ? { ...toggle, isActive: !toggle.isActive } : toggle
      )
    );
  };

  //Funcion de descarga de PDF 
  const DownloadComponent = ({ mapRef }) => {
    const [isPdfLoading, setIsPdfLoading] = useState(false);
  
    const handleDownload = async () => {
      setIsPdfLoading(true); 
      setTimeout(async () => {
        try{
          // Crear un documento con jsPDF
          var doc = new jsPDF();
          var docWidth = doc.internal.pageSize.getWidth();
          var docHeight = doc.internal.pageSize.getHeight();
          doc.text("Atidity Index - año: "+ IaYear + " - Document in PDF", 50 , 10)

          // Mapa activado ? 
          if (toggles[0].isActive) { 
            //Ajustes de diseño para colocarlo en pdf tamaño carta (Quitar boton de zoom, atribution, poner bordes y quitar sombras)
            const zoomControls = document.querySelectorAll('.leaflet-control-zoom');
            zoomControls.forEach(control => control.style.display = 'none');
            const popups = document.querySelectorAll('.leaflet-popup-content-wrapper');
            popups.forEach(control => control.style.boxShadow = 'none');
            const attributionElement = document.querySelector('.leaflet-control-attribution');
            attributionElement.style.display = 'none';
            const mapDOM = document.querySelector('.mapDOM')
            mapDOM.style.borderRadius = '30px';
            // Generar imagen con los estilos previos usando CORS para la carga de enlaces
            const mapCanvas = await html2canvas(mapRef.current, {
              useCORS: true, // Si es necesario para acceder a recursos de otros dominios
            });
            const imgData = mapCanvas.toDataURL('image/jpeg'); 

            const inicioY = ((toggles[1].isActive && !toggles[2].isActive) || (!toggles[1].isActive && toggles[2].isActive)) ? 45 : 25  // Esta el mapa o con la tabla o con la grafica
            
            if(!toggles[1].isActive && !toggles[2].isActive) // Solo esta el mapa
            {
              doc = new jsPDF('l', 'mm', [297, 210]); // Tamaño A4 horizontal en milímetros
              doc.text("Atidity Index - Document in PDF", 10 , 7)
              docWidth = doc.internal.pageSize.getWidth();
              docHeight = doc.internal.pageSize.getHeight();

              const mapWidth = docWidth - 20; 
              const mapHeight = docHeight - 20;
              doc.addImage(imgData, 'JPEG', 10, 10, mapWidth, mapHeight);
            }
            else
            {
              const mapWidth = docWidth - 20; 
              const mapHeight = docHeight - 20;
              doc.addImage(imgData, 'JPEG', 10, inicioY, mapWidth, mapHeight/3.3); 
            }
            // Regresar los estilos como estaban
            zoomControls.forEach(control => control.style.display = '');
            popups.forEach(control => control.style.boxShadow = '');
            attributionElement.style.display = '';
            mapDOM.style.borderRadius = '';
          }
      
          // Tabla activada ? 
          if (toggles[1].isActive) {
            const columns = ['Color', 'Categoria', 'Rango de aridez', 'Superficie','Porcentaje']
            console.log("features")
            console.log(features)
            // Llenado de datos dinamico con el fetch
            let tableForm = [
              {name: "Hiperárido", range: "< 0.05", cat: "Hiperarido"},
              {name: "Árido", range: "0.2 - 0.05", cat: "Arido"},
              {name: "Semiárido", range: "0.5 - 0.2", cat: "Semiarido"},
              {name: "Subhúmedo seco", range: "0.65 - 0.5", cat: "Subhumedo seco"},
              {name: "Húmedo", range: "> 0.65", cat: "Humedo"},
            ]
            var data = []
            var total = 0
            features.map(feature => {
              total += feature.properties.superficie;
            })
            data = tableForm.map((row) => {
              const foundFeature = features.find(feature => feature.properties.categoria === row.cat);
              let porcentaje = ((foundFeature) ? ((foundFeature.properties.superficie * 100) / total) : 0)
              console.log("porcentaje: ", porcentaje)
              return ([
                " ",
                `${row.name}`,
                `${row.range}`,
                `${(foundFeature ? foundFeature.properties.superficie.toFixed(2) : 0) + (" km²")}`,
                `${(porcentaje.toFixed(2)) + ("%")}`
              ])
            });

            data.push(["", "Total", "", total.toFixed(2) + (" km²"), '100%'])
            console.log("data")
            console.log(data)
            // Agregar columnas al principio de los datos
            data.unshift(columns);

            // Acomodo de tabla segun agregados
            const inicioY = (toggles[0].isActive && toggles[2].isActive)  // todos activados
            ? ((docHeight - 20) / 2.3)   
            : (toggles[0].isActive && !toggles[2].isActive) // Tabla y mapa
            ? (((docHeight - 20)/1.9))  
            : (!toggles[0].isActive && toggles[2].isActive)  // Tabla y grafica
            ? 40 : ""
            // Solo esta activada la tabla
            if(!toggles[0].isActive && !toggles[2].isActive){ 
              doc = new jsPDF('l', 'mm', [297, 210]); // Tamaño A4 horizontal en milímetros
              doc.text("Atidity Index - año: "+ IaYear + " - Document in PDF", 10 , 7)
              autoTable( doc,{
                startY: 20,
                body: data,
                style:{
                  halign: 'center',
                },
                didParseCell: (data) => {
                  if (data.row.index === 0) { 
                    data.cell.styles.textColor = 'rgb(252, 252, 252)'; 
                    data.cell.styles.fontWeight = '900';
                    data.cell.styles.fontSize = 12;
                    data.cell.styles.fillColor = '#5998C5';
                  }
                  if (data.row.index === 6 ) { 
                    data.cell.styles.fontWeight = '900';
                    data.cell.styles.fontSize = 12;
                  }
                  if (data.column.index === 0) {
                      data.cell.styles.halign = 'center';
                      const rowIndex = data.row.index;
                      if (rowIndex >= 1 && rowIndex <= LegendOp.length) {
                        const color = LegendOp[rowIndex-1].color;
                        data.cell.styles.fillColor = color;
                        data.cell.styles.halign = 'center';
                      }
                  } else {
                    // Centrar el texto en todas las demás celdas
                    data.cell.styles.halign = 'center';
                  }
                }
              })
            }
            else
            {
              autoTable(doc,{
                startY: inicioY,
                body: data,
                style: {
                  halign: 'center',
                },
                didParseCell: (data) => {
                  if (data.row.index === 0) { 
                    data.cell.styles.textColor = 'rgb(252, 252, 252)'; 
                    data.cell.styles.fontWeight = '900';
                    data.cell.styles.fontSize = 12;
                    data.cell.styles.fillColor = '#5998C5';
                  }
                  if (data.row.index === 6 ) { 
                    data.cell.styles.fontWeight = '900';
                    data.cell.styles.fontSize = 12;
                  }
                  if (data.column.index === 0) {
                      data.cell.styles.halign = 'center';
                      const rowIndex = data.row.index;
                      if (rowIndex >= 1 && rowIndex <= LegendOp.length) {
                        const color = LegendOp[rowIndex-1].color;
                        data.cell.styles.fillColor = color;
                        data.cell.styles.halign = 'center';
                      }
                  } else {
                    // Centrar el texto en todas las demás celdas
                    data.cell.styles.halign = 'center';
                  }
                }
              })
            }
          }

          // Grafica activada ? 
          if(toggles[2].isActive){
            // Acomodo de datos para su presentacion
            let tableForm = [
              {name: "Hiperarido"},
              {name: "Arido"},
              {name: "Semiarido"},
              {name: "Subhumedo seco"},
              {name: "Humedo"},
            ]
            var data = []
            var total = 0
            data = tableForm.map((row, index) => {
              const foundFeature = features.find(feature => feature.properties.categoria === row.name);
              total += foundFeature ? foundFeature.properties.superficie : 0;
              return {
                label: row.name,
                value: foundFeature ? foundFeature.properties.superficie : 0,
                id: index
              };
            });
            
            const canvas = canvasRef.current;
            const GraficSelect = document.querySelector("#GraficSelect").value
            const ctx = canvasRef.current.getContext('2d');
            
            let myChart;
            if (GraficSelect == "polarArea" ) // Grafica Polar
            {
              data.sort((a, b) => b.value - a.value);
              let colors = data.map(item => LegendOp[item.id].color)
              myChart = new Chart(ctx, {
                type: GraficSelect,
                data: {
                  labels: data.map((item, index) => ((1 + index) + "°:" +item.label)),
                  datasets:[{
                    label: "mis datos",
                    data: data.map(item => item.value),
                    backgroundColor: colors,
                  }]
                },
                options: {
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                            size: 25
                        }
                      },
                      position: "right"
                    }
                  },
                  elements: {
                    font: {
                      size: 25 // Adjust the default font size for all chart elements (in pixels)
                    }
                  }
                }
              });
            }
            if (GraficSelect == "pie") // Grafica circular
            {
              myChart = new Chart(ctx, {
                type: GraficSelect,
                data: {
                  labels: data.map(item => item.label),
                  datasets:[{
                    label: "mis datos",
                    data: data.map(item => item.value),
                    backgroundColor: LegendOp.map(item => item.color),
                  }]
                },
                options: {
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                            size: 25
                        }
                      },
                      position: "right"
                    }
                  },
                  elements: {
                    font: {
                      size: 25 // Adjust the default font size for all chart elements (in pixels)
                    }
                  }
                }
              });
            }
            if (GraficSelect == "area") // Grafica de area
            {
              data.sort((a, b) => a.value - b.value);
              let Labels = ["", ""]
              myChart = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: Labels,
                  datasets:data.map((item, index) => ({
                    label: ((5-index) + "°:" + item.label),
                    data: [item.value, item.value],
                    borderColor: LegendOp[item.id].color,
                    backgroundColor: LegendOp[item.id].color,
                    fill: 'start'
                  }))
                },
                options: {
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                            size: 25
                        }
                      },
                      position: "right"
                    }
                  },
                  scales: {
                    y: {
                      ticks: {
                        font: {
                          size: 20
                        }
                      }
                    }
                  }
                }
              });
            }
            if (GraficSelect == "bar") // Grafica de columnas
            {
              myChart = new Chart(ctx, {
                type: GraficSelect,
                data: {
                  labels: (GraficSelect == "bar") ? " ": data.map(item => item.label), // Correctamente asigna cada label a su posición
                  datasets: data.map((item, index) => ({
                    label: item.label,
                    data: [item.value],
                    borderColor: LegendOp[index].color,
                    backgroundColor: LegendOp[index].color,
                    borderWidth: 2,
                    borderRadius: Number.MAX_VALUE,
                    borderSkipped: false
                  }))
                },
                options: {
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                            size: 25
                        }
                      },
                      position: "right"
                    }
                  },
                  scales: {
                    y: {
                      ticks: {
                        font: {
                          size: 20
                        }
                      }
                    }
                  }
                }
              });
            }
            if (GraficSelect == "line") // Grafica de lineas
            {
              myChart = new Chart(ctx, {
                type: GraficSelect,
                data: {
                  labels: data.map(item => item.label),
                  datasets:[{
                    label: "Niveles de aridez",
                    data: data.map(item => item.value)
                  }]
                },
                options: {
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                            size: 25
                        }
                      },
                      position: "right"
                    }
                  },
                  scales: {
                    y: {
                      ticks: {
                        font: {
                          size: 20
                        }
                      }
                    }
                  }
                }
              });
            }
            const inicioY = ((toggles[0].isActive && !toggles[1].isActive)) // Esta activado el mapa
            ? (((docHeight - 20)/1.7)) : 
            (!toggles[0].isActive && toggles[1].isActive) // Esta activada la tabla
            ?  (((docHeight - 20)/2.4)) :
            (toggles[0].isActive && toggles[1].isActive) // Todo esta activado
            ?  (((docHeight - 20)/1.5)) : ""
            
            await html2canvas(canvasRef.current, {
              useCORS: true, // Si es necesario para acceder a recursos de otros dominios
            })
            const imgData = canvas.toDataURL('image/png', 1.0); 
            if(!toggles[0].isActive && !toggles[1].isActive)
            {
              doc = new jsPDF('l', 'mm', [297, 210]); // Tamaño A4 horizontal en milímetros
              doc.text("Atidity Index - año: "+ IaYear + " - Document in PDF", 10 , 7)
              docWidth = doc.internal.pageSize.getWidth();
              docHeight = doc.internal.pageSize.getHeight();

              const mapWidth = docWidth - 20; 
              const mapHeight = docHeight - 20;
              doc.addImage(imgData, 'PNG', 10, 10, mapWidth, mapHeight);
            }
            else
            {
              doc.addImage(imgData, 'PNG', 55, inicioY, 110, 70); 
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (myChart) {
              myChart.destroy();
            }
          }

          // Guardar archivo en pdf 
          doc.save('Ia_file.pdf');
          
        } catch (error) {
          console.error('Error al generar el PDF:', error);
        } finally {
          setIsPdfLoading(false);
          console.log("Se acabo")
        }
       }, ((toggles[0].isActive) ? 4000 : 2000)); // Tiempo de espera para generar el mapa
     };
    
     //return del boton de descarga
    return (
      <div className='flex items-center justify-center gap-4'>
        {(!isPdfLoading) ? 
        (
          <button
          className="flex bg-backbtn w-auto h-auto flex items-center my-auto hover:bg-amber-100/50 text-primary hover:text-background rounded-full p-3"
          id="BtnVista"
          type="button"
          onClick={handleDownload}
          >
            <p className="font-bold text-lg">
              Descargar PDF
            </p>
          </button> 
        ): 
        (<div  className='fixed top-0 z-[-999999] w-[100vw] h-[100vh] left-[200vh]'>
          <canvas ref={canvasRef} />
        </div>)}
      </div>
    );
  };

  // Main return
  return (
    <div>
      <div ref={menuRef} className={`menu ${localIsOpen ? 'flex z-[9999999] bg-backimage w-[75%] h-[75%] fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] opacity-100 shadow-xl rounded-[50px] flex-col gap-6' : 'hidden'}`}>
        <div className='bg-backbtn w-full p-6 rounded-t-[50px] shadow-lg flex justify-center items-center'>
          <p className='abhaya text-xl'>Opciones de descarga</p>
        </div>
        <div className="w-full h-full flex-col gap-8 flex justify-center items-center" >
          <DynamicToggle></DynamicToggle>
          <div className='flex items-center justify-center flex-col'>
            <p className='text-foreground font-bold '> {"Selección de tipo de gráfica"}</p>
            <select
              id="GraficSelect"
              disabled= {toggles[toggles.length-1].isActive ? false :  true}
              className="bg-foreground text-background p-3 rounded-full font-bold w-full text-center"
            >
              <option value={"pie"}>Circular </option>
              <option value={"area"}>De áreas </option>
              <option value={"bar"}>De columnas</option>
              <option value={"line"}>De líneas</option>
              <option value={"polarArea"}> Polar </option>
            </select>
          </div>
          <div className='hidden'></div>
          <DownloadComponent tableRef={tableRef} mapRef={mapRef} ></DownloadComponent>
          
        </div>
      </div>
      <div className={`menu ${localIsOpen ? ' z-[999999] bg-backimage w-[100%] h-[100%] fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] opacity-50 blur-xl' : 'hidden'}`}></div>
    </div>
  );
}

export default Menu;