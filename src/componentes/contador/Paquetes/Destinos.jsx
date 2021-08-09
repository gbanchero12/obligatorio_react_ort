import Image from 'react-image-resizer';

const Destinos = (props) => {
    const { paquetes, mensaje } = props;
    return (
        <>
            <h3>Destinos disponibles:</h3>

            {
                paquetes ? Object.keys(paquetes).map((key, indice) => (
                    <>
                        <div key={indice}>
                            <div>{`Nombre: USD ${paquetes[key].nombre} - `}
                           {`Precio mayor: USD ${paquetes[key].precio_mayor} - `}
                            {`Precio menor: USD ${paquetes[key].precio_menor} - `}</div>

                        <div class="image">
                            <Image
                                img
                                src={`https://destinos.develotion.com/imgs/${paquetes[key].foto}`}
                                alt="Destino"
                                height={150}
                                width={150}
                                class="center-image"
                            />
                            </div>
                        </div>
                    </>
                )) : <div style={{color:"red"}}>{mensaje}</div>
            }
        </>);
}

export default Destinos;